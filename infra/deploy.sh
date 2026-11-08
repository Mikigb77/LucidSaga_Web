#!/usr/bin/env bash
# Deploys the website to Cloud Run. The deploy workflow (.github/workflows/deploy.yml) calls each
# step; `laptop` runs them all from a computer with Docker. See docs/DEPLOY.md.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
# shellcheck source=infra/lib.sh
. "$HERE/lib.sh"
# shellcheck source=infra/config.sh
. "$HERE/config.sh"

usage() {
  cat <<'EOF'
Usage: infra/deploy.sh COMMAND [ARG]

  github-outputs   Write the names the workflow needs (project, provider, account, image) as
                   step outputs.
  preflight        Check that the bootstrap's service and image repository are visible.
  service IMAGE    Deploy IMAGE to the website's service and send all traffic to it.
  smoke URL        Check that URL serves the site: / sends a visitor to a language, and /en loads.
  rollback REV     Send all traffic back to revision REV.
  laptop           Build the image with Docker on this computer, push it, deploy it and check it.

DRY_RUN=1 prints every command that would change something and runs none.
EOF
}

TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/lucid-web-deploy.XXXXXX")"
trap 'rm -rf "$TMP_DIR"' EXIT

need_arg() {
  [ -n "$1" ] || die "$2 is required (infra/deploy.sh --help)"
}

# Saves the service's description as JSON to the file $1: {} if it can't be read, or in a dry run.
describe_service() {
  read_value gcloud run services describe "$SERVICE" --project="$PROJECT_ID" --region="$REGION" \
    --format=json >"$1"
  if [ ! -s "$1" ]; then
    printf '{}' >"$1"
  fi
}

# Reads one field from a saved description:
#   serving  the revision with the largest share of traffic, so a rollback returns to it
#   url      the service's URL
service_field() {
  python3 -I - "$1" "$2" <<'EOF'
import json
import sys

path, field = sys.argv[1:3]
try:
    with open(path) as file:
        service = json.load(file)
except ValueError:
    service = {}
status = service.get("status") or {}
if field == "serving":
    routes = [r for r in status.get("traffic") or [] if r.get("revisionName") and r.get("percent")]
    print(max(routes, key=lambda r: r["percent"])["revisionName"] if routes else "")
elif field == "url":
    print(status.get("url") or "")
else:
    sys.exit(f"unknown field {field}")
EOF
}

# The labels on each revision: which commit it runs, when the workflow knows it.
deploy_labels() {
  local labels="app=lucid-saga-web"
  if [ -n "${GITHUB_SHA:-}" ]; then
    labels="$labels,commit=${GITHUB_SHA:0:12}"
  fi
  printf '%s' "$labels"
}

cmd_github_outputs() {
  set_output project_id "$PROJECT_ID"
  set_output region "$REGION"
  set_output service "$SERVICE"
  set_output wif_provider "$WIF_PROVIDER_RESOURCE"
  set_output deployer_sa "$DEPLOYER_SA"
  set_output registry_host "$REGISTRY_HOST"
  set_output image "$IMAGE"
  set_output site_url "$SITE_URL"
}

cmd_preflight() {
  step "Checking the bootstrap"
  if is_dry_run; then
    say "[dry-run] gcloud run services describe $SERVICE --project=$PROJECT_ID --region=$REGION"
    say "[dry-run] gcloud artifacts repositories describe $AR_REPO --project=$PROJECT_ID --location=$REGION"
    return 0
  fi
  gcloud run services describe "$SERVICE" --project="$PROJECT_ID" --region="$REGION" \
    --format='value(metadata.name)' >/dev/null ||
    die "can't see the service $SERVICE in $REGION; run infra/bootstrap.sh (docs/DEPLOY.md)"
  gcloud artifacts repositories describe "$AR_REPO" --project="$PROJECT_ID" \
    --location="$REGION" --format='value(name)' >/dev/null ||
    die "can't see the image repository $AR_REPO in $REGION; run infra/bootstrap.sh"
  say "The service $SERVICE and the repository $AR_REPO are there."
}

cmd_service() {
  local image="$1" before="$TMP_DIR/before.json" after="$TMP_DIR/after.json" previous url
  need_arg "$image" IMAGE
  describe_service "$before"
  previous="$(service_field "$before" serving)"
  # Written first, so the workflow can roll back if anything fails once traffic may have moved.
  set_output previous_revision "$previous"
  step "Service $SERVICE in $REGION"
  # No IAM flags: the bootstrap opened the site to everyone once, and the deployer can't change
  # that. Startup CPU boost keeps a cold start short.
  run gcloud run deploy "$SERVICE" --project="$PROJECT_ID" --region="$REGION" \
    --image="$image" --service-account="$RUNTIME_SA" --port=8080 \
    --cpu="$SERVICE_CPU" --memory="$SERVICE_MEMORY" --min-instances="$SERVICE_MIN_INSTANCES" \
    --max-instances="$SERVICE_MAX_INSTANCES" --concurrency="$SERVICE_CONCURRENCY" \
    --timeout="$SERVICE_TIMEOUT" --cpu-boost --ingress=all \
    --update-labels="$(deploy_labels)"
  # A rollback pins traffic to an old revision; a deploy always moves it to the new one.
  run gcloud run services update-traffic "$SERVICE" --project="$PROJECT_ID" --region="$REGION" \
    --to-latest
  describe_service "$after"
  url="$(service_field "$after" url)"
  set_output url "${url:-$SITE_URL}"
  if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
    # shellcheck disable=SC2016 # The backticks are Markdown.
    {
      printf '| | |\n| --- | --- |\n'
      printf '| Image | `%s` |\n' "$image"
      printf '| Previous revision | `%s` |\n' "${previous:-none}"
      printf '| URL | %s |\n' "${url:-dry run}"
    } >>"$GITHUB_STEP_SUMMARY"
  fi
}

# GETs $1 and prints the status code, saving the body to $2. Prints 000 when there is no answer.
http_get() {
  # curl prints 000 itself when it can't connect.
  curl -sS -o "$2" -w '%{http_code}' --max-time 10 "$1" 2>/dev/null || true
}

cmd_smoke() {
  local url="${1%/}" attempt=1 root_code page_code body="$TMP_DIR/body"
  need_arg "$url" URL
  step "Smoke test: GET $url/ and $url/en"
  if is_dry_run; then
    say "[dry-run] curl $url/ and $url/en"
    return 0
  fi
  # A new revision can take a few seconds to answer on its first, cold request.
  while :; do
    root_code="$(http_get "$url/" "$body")"
    page_code="$(http_get "$url/en" "$body")"
    if [ "$page_code" = 200 ] && grep -q 'Lucid Saga' "$body" &&
      case "$root_code" in 30[78]) true ;; *) false ;; esac; then
      say "The site answers: / sends visitors to a language ($root_code), /en loads (200)."
      return 0
    fi
    if [ "$attempt" -ge 6 ]; then
      die "the site didn't answer as expected: / gave $root_code, /en gave $page_code"
    fi
    say "Not yet (/ gave $root_code, /en gave $page_code); trying again in 5 s."
    attempt=$((attempt + 1))
    sleep "${SMOKE_SLEEP_SECONDS:-5}"
  done
}

cmd_rollback() {
  local revision="$1"
  need_arg "$revision" REVISION
  step "Rollback: all traffic to $revision"
  run gcloud run services update-traffic "$SERVICE" --project="$PROJECT_ID" --region="$REGION" \
    --to-revisions="$revision=100"
}

# Builds, pushes and deploys from this computer, signed in as Miki. For when GitHub Actions can't
# run; the workflow is the usual way.
cmd_laptop() {
  local tag ref digest previous
  command -v docker >/dev/null 2>&1 || die "Docker isn't installed here; deploy through GitHub Actions instead"
  if [ -n "$(git -C "$ROOT" status --porcelain)" ]; then
    die "the working tree has changes; deploy only committed code"
  fi
  # The same rule as the workflow: only what is on main, which CI checked before the merge.
  run git -C "$ROOT" fetch --quiet origin main
  if [ "$(git -C "$ROOT" rev-parse HEAD)" != "$(git -C "$ROOT" rev-parse origin/main)" ]; then
    die "HEAD isn't origin/main; check out main and pull it, then deploy"
  fi
  tag="$(git -C "$ROOT" rev-parse --short=12 HEAD)"
  ref="$IMAGE:$tag"
  step "Building $ref"
  run docker build --platform=linux/amd64 --build-arg "SITE_URL=$SITE_URL" -t "$ref" "$ROOT"
  run gcloud auth configure-docker "$REGISTRY_HOST" --quiet
  run docker push "$ref"
  if is_dry_run; then
    digest=""
  else
    digest="$(docker inspect --format='{{index .RepoDigests 0}}' "$ref")"
  fi
  # Each step runs as its own process, so it stops at its first error (set -e) and a failure
  # comes back here to roll back. A subshell in an if wouldn't stop: bash ignores set -e there.
  if ! GITHUB_OUTPUT="$TMP_DIR/outputs" "$HERE/deploy.sh" service "${digest:-$ref}" ||
    ! "$HERE/deploy.sh" smoke "$SITE_URL"; then
    previous="$(sed -n 's/^previous_revision=//p' "$TMP_DIR/outputs" 2>/dev/null || true)"
    if [ -n "$previous" ]; then
      cmd_rollback "$previous"
    fi
    die "the new revision failed to deploy or failed its smoke test"
  fi
}

main() {
  local command="${1:-}"
  if [ $# -gt 0 ]; then
    shift
  fi
  # From a laptop, use Miki's configuration for this project; Actions signs in on its own.
  if [ "${GITHUB_ACTIONS:-}" != true ]; then
    use_gcloud_configuration
  fi
  case "$command" in
    github-outputs) cmd_github_outputs ;;
    preflight) cmd_preflight ;;
    service) cmd_service "${1:-}" ;;
    smoke) cmd_smoke "${1:-}" ;;
    rollback) cmd_rollback "${1:-}" ;;
    laptop) cmd_laptop ;;
    -h | --help | help) usage ;;
    *)
      usage >&2
      die "unknown command: ${command:-none}"
      ;;
  esac
}

main "$@"
