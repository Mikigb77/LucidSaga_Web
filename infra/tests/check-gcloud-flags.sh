#!/usr/bin/env bash
# Runs every gcloud command the scripts can issue against the real gcloud, offline and signed out,
# to prove that the installed gcloud accepts every command and flag. The commands come from the
# dry runs, plus the ones a dry run can't show (a re-run's update-oidc and undelete, the rollback).
# Each must fail on the network or the missing sign-in, never on its arguments.
# Nothing reaches Google Cloud: gcloud gets an empty configuration and a proxy that refuses every
# connection.
#
# Usage: infra/tests/check-gcloud-flags.sh   (skips when gcloud isn't installed)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
INFRA="$ROOT/infra"

if ! command -v gcloud >/dev/null 2>&1; then
  echo "gcloud is not installed; skipping."
  exit 0
fi

WORK="$(mktemp -d "${TMPDIR:-/tmp}/gcloud-flags.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
export CLOUDSDK_CONFIG="$WORK/config"
export CLOUDSDK_CORE_DISABLE_PROMPTS=1
export CLOUDSDK_CORE_DISABLE_USAGE_REPORTING=1
export CLOUDSDK_COMPONENT_MANAGER_DISABLE_UPDATE_CHECK=1
export CLOUDSDK_PROXY_TYPE=http
export CLOUDSDK_PROXY_ADDRESS=127.0.0.1
export CLOUDSDK_PROXY_PORT=9
unset HTTPS_PROXY HTTP_PROXY https_proxy http_proxy
mkdir -p "$CLOUDSDK_CONFIG"

image="europe-west1-docker.pkg.dev/playable-anime/lucid-saga-web/web@sha256:0000"
{
  DRY_RUN=1 "$INFRA/bootstrap.sh" --dry-run
  DRY_RUN=1 "$INFRA/deploy.sh" preflight
  DRY_RUN=1 "$INFRA/deploy.sh" service "$image"
  DRY_RUN=1 "$INFRA/deploy.sh" rollback lucid-saga-web-00001-abc
} 2>&1 | sed -n 's/^\[dry-run\] \(gcloud .*\)$/\1/p' >"$WORK/commands"

# The commands only a re-run or a real run issues.
# shellcheck disable=SC1091 # config.sh is checked on its own.
. "$INFRA/config.sh"
cat >>"$WORK/commands" <<EOF2
gcloud iam workload-identity-pools undelete $WIF_POOL --project=$PROJECT_ID --location=global
gcloud iam workload-identity-pools providers undelete $WIF_PROVIDER --project=$PROJECT_ID --location=global --workload-identity-pool=$WIF_POOL
gcloud iam workload-identity-pools providers update-oidc $WIF_PROVIDER --project=$PROJECT_ID --location=global --workload-identity-pool=$WIF_POOL --issuer-uri=https://token.actions.githubusercontent.com --attribute-mapping=google.subject=assertion.sub --attribute-condition=true
gcloud iam workload-identity-pools describe $WIF_POOL --project=$PROJECT_ID --location=global --format=value(state)
gcloud run services describe $SERVICE --project=$PROJECT_ID --region=$REGION --format=json
gcloud auth configure-docker $REGISTRY_HOST --quiet
EOF2

count="$(wc -l <"$WORK/commands")"
[ "$count" -ge 15 ] || {
  echo "only $count gcloud commands came out of the dry runs; the extraction is broken" >&2
  exit 1
}

failed=0
while IFS= read -r line; do
  # The dry runs print each command quoted for a shell, so the shell splits it back.
  eval "set -- $line"
  shift # gcloud
  out="$(timeout 60 gcloud "$@" 2>&1 >/dev/null || true)"
  if printf '%s' "$out" | grep -qE 'unrecognized arguments|Invalid choice|argument .*: (expected|invalid)|is not a valid|must be specified|ERROR: \(gcloud\) Invalid value'; then
    echo "REJECTED: $line" >&2
    printf '%s\n' "$out" | head -n 5 >&2
    failed=1
  fi
done <"$WORK/commands"

if [ "$failed" = 1 ]; then
  exit 1
fi
echo "gcloud accepts all $count commands."
