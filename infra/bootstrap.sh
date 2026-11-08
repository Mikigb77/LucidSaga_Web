#!/usr/bin/env bash
# One-time setup of Google Cloud for the Lucid Saga website, safe to run again. See docs/DEPLOY.md.
#
# Run once by an owner of the playable-anime project, the same project as the backend. It needs
# only a login: on a computer without gcloud it installs it first (apt in WSL, Debian or Ubuntu;
# Homebrew on macOS), and when gcloud isn't signed in to an account that can see the project, it
# opens the browser to sign in. It sets up, or brings back in line:
#
#   1. the APIs the deploy needs
#   2. the site's own runtime service account, which can only write logs
#   3. an Artifact Registry repository for the site's image, with a cleanup policy
#   4. the Cloud Run service, running Google's sample container until the first deploy, open to
#      everyone (it is a public website)
#   5. a deployer service account for GitHub Actions whose rights reach only this site
#   6. Workload Identity Federation that admits only this repository's deploy workflow on main
#
# It touches nothing of the backend's. Run it with --dry-run first to see every command without
# changing anything.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=infra/lib.sh
. "$HERE/lib.sh"
# shellcheck source=infra/config.sh
. "$HERE/config.sh"
# shellcheck source=infra/tools.sh
. "$HERE/tools.sh"

usage() {
  cat <<'EOF'
Usage: infra/bootstrap.sh [--dry-run] [--yes]

  --dry-run   Print every command that would change something, and run none. Needs no credentials.
  --yes       Don't ask for confirmation before making changes.

Installs the gcloud CLI when it is missing, and signs in through the browser when gcloud isn't
signed in to an account that can see the project.
EOF
}

ASSUME_YES=""
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=1 ;;
    --yes | -y) ASSUME_YES=1 ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      usage >&2
      die "unknown argument: $1"
      ;;
  esac
  shift
done

APIS="run.googleapis.com artifactregistry.googleapis.com iam.googleapis.com
iamcredentials.googleapis.com sts.googleapis.com cloudresourcemanager.googleapis.com
logging.googleapis.com"

# Only the deploy workflow on main of this repository gets in: run by a push to main (a merge of
# dev, docs/DEPLOY.md) or started by hand there.
WIF_ISSUER="https://token.actions.githubusercontent.com"
WIF_ATTRIBUTE_MAPPING="google.subject=assertion.sub,attribute.repository_id=assertion.repository_id,attribute.repository_owner_id=assertion.repository_owner_id,attribute.ref=assertion.ref,attribute.event_name=assertion.event_name,attribute.workflow_ref=assertion.workflow_ref"
WIF_CONDITION="assertion.repository_id == '${GITHUB_REPOSITORY_ID}' && assertion.repository_owner_id == '${GITHUB_OWNER_ID}' && assertion.ref == 'refs/heads/main' && (assertion.event_name == 'push' || assertion.event_name == 'workflow_dispatch') && assertion.workflow_ref == '${GITHUB_REPOSITORY_NAME}/${DEPLOY_WORKFLOW}@refs/heads/main'"
WIF_MEMBER="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WIF_POOL}/attribute.repository_id/${GITHUB_REPOSITORY_ID}"

# --- helpers -----------------------------------------------------------------------------------

grant_project_role() {
  run_retry gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="$1" --role="$2" --condition=None --format=none
}

grant_service_account_role() {
  run_retry gcloud iam service-accounts add-iam-policy-binding "$1" \
    --project="$PROJECT_ID" --member="$2" --role="$3" --format=none
}

grant_service_role() {
  run_retry gcloud run services add-iam-policy-binding "$SERVICE" \
    --project="$PROJECT_ID" --region="$REGION" --member="$1" --role="$2" --format=none
}

ensure_service_account() {
  local name="$1" display="$2" email="$1@${PROJECT_ID}.iam.gserviceaccount.com"
  if probe gcloud iam service-accounts describe "$email" --project="$PROJECT_ID"; then
    say "Service account $email exists."
  else
    run gcloud iam service-accounts create "$name" --project="$PROJECT_ID" --display-name="$display"
  fi
}

confirm() {
  local answer=""
  if is_dry_run || [ -n "$ASSUME_YES" ]; then
    return 0
  fi
  if ! { : </dev/tty; } 2>/dev/null; then
    die "no terminal to confirm on; pass --yes to run without asking"
  fi
  read -r -p "Set up the website in $PROJECT_ID as described above? [y/N] " answer </dev/tty
  case "$answer" in
    y | Y | yes | YES) ;;
    *) die "stopped, nothing changed" ;;
  esac
}

# --- steps -------------------------------------------------------------------------------------

gcloud_account() { gcloud config get-value account 2>/dev/null || true; }
project_number() { gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)'; }

check_access() {
  local account number
  step "Checking access"
  if is_dry_run; then
    say "Dry run: nothing is changed and nothing is read from Google Cloud."
    return 0
  fi
  ensure_gcloud
  use_gcloud_configuration
  account="$(gcloud_account)"
  # Signed out, or signed in as an account that can't see the project: sign in in the browser.
  if [ -z "$account" ] || ! number="$(project_number 2>/dev/null)"; then
    if [ -n "$account" ]; then
      say "$account can't read project $PROJECT_ID."
    fi
    sign_in_gcloud
    account="$(gcloud_account)"
    [ -n "$account" ] || die "gcloud is not signed in; run: gcloud auth login"
    number="$(project_number)" || die "$account can't read project $PROJECT_ID"
  fi
  [ "$number" = "$PROJECT_NUMBER" ] ||
    die "project $PROJECT_ID has number $number, but infra/config.sh expects $PROJECT_NUMBER"
  say "Signed in as $account, project $PROJECT_ID ($PROJECT_NUMBER)."
}

enable_apis() {
  step "1. APIs"
  # shellcheck disable=SC2086 # APIS is a list of words.
  run gcloud services enable $APIS --project="$PROJECT_ID"
}

setup_runtime_account() {
  step "2. Runtime service account $RUNTIME_SA"
  ensure_service_account "$RUNTIME_SA_NAME" "Lucid Saga website"
  # Its only role. The site reads no data, secret or model.
  grant_project_role "serviceAccount:$RUNTIME_SA" roles/logging.logWriter
}

setup_artifact_registry() {
  step "3. Artifact Registry repository $AR_REPO in $REGION"
  if probe gcloud artifacts repositories describe "$AR_REPO" --project="$PROJECT_ID" \
    --location="$REGION"; then
    say "Repository $AR_REPO exists."
  else
    run gcloud artifacts repositories create "$AR_REPO" --project="$PROJECT_ID" \
      --location="$REGION" --repository-format=docker \
      --description="Lucid Saga website images, built by the deploy workflow"
  fi
  # Keeps the 10 newest images, so the last 10 deploys can be rolled back to, and deletes the rest
  # once they are 30 days old.
  run gcloud artifacts repositories set-cleanup-policies "$AR_REPO" --project="$PROJECT_ID" \
    --location="$REGION" --policy="$HERE/artifact-cleanup.json" --no-dry-run
}

setup_service() {
  step "4. Cloud Run service $SERVICE in $REGION"
  if probe gcloud run services describe "$SERVICE" --project="$PROJECT_ID" --region="$REGION"; then
    say "Service $SERVICE exists; the deploy keeps its image up to date."
  else
    # The deployer's rights are granted on the service itself, so it must exist before the first
    # deploy. Until then it runs Google's sample container. Retried: the runtime account may have
    # been created seconds ago.
    run_retry gcloud run deploy "$SERVICE" --project="$PROJECT_ID" --region="$REGION" \
      --image="$PLACEHOLDER_IMAGE" --service-account="$RUNTIME_SA" --port=8080 \
      --cpu="$SERVICE_CPU" --memory="$SERVICE_MEMORY" --min-instances="$SERVICE_MIN_INSTANCES" \
      --max-instances="$SERVICE_MAX_INSTANCES" --concurrency="$SERVICE_CONCURRENCY" \
      --timeout="$SERVICE_TIMEOUT" --ingress=all --no-allow-unauthenticated \
      --labels=app=lucid-saga-web --format=none
  fi
  # A public website: anyone may load it. Only this service is opened, never the backend.
  grant_service_role allUsers roles/run.invoker
}

setup_deployer() {
  step "5. Deployer service account $DEPLOYER_SA"
  ensure_service_account "$DEPLOYER_SA_NAME" "GitHub Actions deployer for the Lucid Saga website"
  # Deploys new revisions of this one service and moves its traffic, and nothing else: the role is
  # granted on the service, not on the project. It can't change who may load the site.
  grant_service_role "serviceAccount:$DEPLOYER_SA" roles/run.developer
  # Runs the service as the site's runtime account, and as no other account.
  grant_service_account_role "$RUNTIME_SA" "serviceAccount:$DEPLOYER_SA" \
    roles/iam.serviceAccountUser
  # Pushes the image to the site's repository only.
  run_retry gcloud artifacts repositories add-iam-policy-binding "$AR_REPO" \
    --project="$PROJECT_ID" --location="$REGION" --member="serviceAccount:$DEPLOYER_SA" \
    --role=roles/artifactregistry.writer --format=none
}

# Creates the pool $1 (display name $2, description $3), or brings back a deleted one.
ensure_wif_pool() {
  local pool="$1" display="$2" description="$3" state
  state="$(read_value gcloud iam workload-identity-pools describe "$pool" \
    --project="$PROJECT_ID" --location=global --format='value(state)')"
  case "$state" in
    '')
      run gcloud iam workload-identity-pools create "$pool" --project="$PROJECT_ID" \
        --location=global --display-name="$display" --description="$description"
      ;;
    DELETED)
      run gcloud iam workload-identity-pools undelete "$pool" --project="$PROJECT_ID" \
        --location=global
      ;;
    *) say "Pool $pool exists." ;;
  esac
}

# Creates GitHub's OIDC provider $2 in pool $1 (display name $3) that admits only tokens passing
# the condition $4, or brings an existing one back to exactly that mapping and condition.
ensure_wif_provider() {
  local pool="$1" provider="$2" display="$3" condition="$4" state
  state="$(read_value gcloud iam workload-identity-pools providers describe "$provider" \
    --project="$PROJECT_ID" --location=global --workload-identity-pool="$pool" \
    --format='value(state)')"
  if [ -z "$state" ]; then
    run_retry gcloud iam workload-identity-pools providers create-oidc "$provider" \
      --project="$PROJECT_ID" --location=global --workload-identity-pool="$pool" \
      --display-name="$display" --issuer-uri="$WIF_ISSUER" \
      --attribute-mapping="$WIF_ATTRIBUTE_MAPPING" --attribute-condition="$condition"
  else
    if [ "$state" = DELETED ]; then
      run gcloud iam workload-identity-pools providers undelete "$provider" \
        --project="$PROJECT_ID" --location=global --workload-identity-pool="$pool"
    fi
    run gcloud iam workload-identity-pools providers update-oidc "$provider" \
      --project="$PROJECT_ID" --location=global --workload-identity-pool="$pool" \
      --issuer-uri="$WIF_ISSUER" --attribute-mapping="$WIF_ATTRIBUTE_MAPPING" \
      --attribute-condition="$condition"
  fi
}

setup_workload_identity() {
  step "6. Workload Identity Federation for $GITHUB_REPOSITORY_NAME"
  ensure_wif_pool "$WIF_POOL" "GitHub Actions (website)" \
    "Keyless sign-in for the Lucid Saga website's GitHub Actions"
  ensure_wif_provider "$WIF_POOL" "$WIF_PROVIDER" "LucidSaga_Web deploy workflow" "$WIF_CONDITION"
  grant_service_account_role "$DEPLOYER_SA" "$WIF_MEMBER" roles/iam.workloadIdentityUser
}

summary() {
  step "Done"
  say "The website's service: $SITE_URL"
  say "GitHub Actions signs in with:"
  say "  workload_identity_provider: $WIF_PROVIDER_RESOURCE"
  say "  service_account:            $DEPLOYER_SA"
  say "Both are in infra/config.sh already. The next push to main deploys the site."
}

main() {
  step "Lucid Saga website setup for project $PROJECT_ID in $REGION"
  say "Service $SERVICE, runtime account $RUNTIME_SA, deployer $DEPLOYER_SA,"
  say "image repository $AR_REPO, Workload Identity pool $WIF_POOL."
  check_access
  confirm
  enable_apis
  setup_runtime_account
  setup_artifact_registry
  setup_service
  setup_deployer
  setup_workload_identity
  summary
}

main "$@"
