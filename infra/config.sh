# shellcheck shell=bash disable=SC2034 # Sourced: the scripts that source it use these.
# Names and ids shared by bootstrap.sh, deploy.sh and the deploy workflow. See docs/DEPLOY.md.
#
# These are identifiers, not secrets. They are fixed here on purpose: nothing reads them from the
# environment, so a stray PROJECT_ID or REGION in someone's shell can never point a script at the
# wrong project. Change a value here, in a PR, and run bootstrap.sh again.

# The same Google Cloud project as the Lucid Saga backend (PlayableAnime's infra/config.sh). The
# website gets its own service, image repository, accounts and keyless sign-in, and shares nothing
# else with the backend.
PROJECT_ID="playable-anime"
PROJECT_NUMBER="528988811295"
# Belgium: Tier 1 pricing, and one of the regions where Cloud Run maps a custom domain by itself,
# without a load balancer. The site talks to no database, so it needn't sit next to the backend.
REGION="europe-west1"
# The gcloud configuration Miki uses for this project. Used when it exists on the machine.
GCLOUD_CONFIGURATION="playable-anime"

# The GitHub repository allowed to deploy, by its numeric ids, which survive a rename.
GITHUB_REPOSITORY_NAME="Mikigb77/LucidSaga_Web"
GITHUB_REPOSITORY_ID="1450519153"
GITHUB_OWNER_ID="112938189"
DEPLOY_WORKFLOW=".github/workflows/deploy.yml"

# Cloud Run: the website, public, scaling to zero between visits.
SERVICE="lucid-saga-web"
# The site's own runtime account. It calls nothing in Google Cloud, so it has no role but writing
# logs: never the backend's account, which can call Vertex AI and read the database secrets.
RUNTIME_SA_NAME="lucid-saga-web"
RUNTIME_SA="${RUNTIME_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
# What the service runs until the first deploy: Google's sample container.
PLACEHOLDER_IMAGE="us-docker.pkg.dev/cloudrun/container/hello"

# Artifact Registry: one Docker repository, one image.
AR_REPO="lucid-saga-web"
REGISTRY_HOST="${REGION}-docker.pkg.dev"
IMAGE="${REGISTRY_HOST}/${PROJECT_ID}/${AR_REPO}/web"

# GitHub Actions signs in through Workload Identity Federation as this account, with no key. Its
# rights reach only this site: deploying this one service, running it as the site's runtime
# account and pushing to this one repository. It can never touch the backend.
DEPLOYER_SA_NAME="github-web-deployer"
DEPLOYER_SA="${DEPLOYER_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
# A pool of its own, so the backend's workflows can never sign in as this account, nor this
# repository's as theirs.
WIF_POOL="github-web"
WIF_PROVIDER="lucid-saga-web-deploy"
WIF_PROVIDER_RESOURCE="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WIF_POOL}/providers/${WIF_PROVIDER}"

# The service's deterministic URL, which exists before the first deploy.
SERVICE_DETERMINISTIC_HOST="${SERVICE}-${PROJECT_NUMBER}.${REGION}.run.app"
SITE_URL="https://${SERVICE_DETERMINISTIC_HOST}"

# The container's size and scaling. A static page needs little: one small instance serves
# hundreds of visitors, and none runs (or costs anything) while nobody visits.
SERVICE_CPU="1"
SERVICE_MEMORY="512Mi"
SERVICE_MIN_INSTANCES="0"
SERVICE_MAX_INSTANCES="3"
SERVICE_CONCURRENCY="80"
SERVICE_TIMEOUT="30"
