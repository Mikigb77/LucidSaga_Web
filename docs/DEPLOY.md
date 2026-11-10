# Deploying the website

The site runs as the Cloud Run service `lucid-saga-web` in `europe-west1`, in the `playable-anime`
project that also runs the game's backend. It shares nothing with the backend but the project:
its own runtime service account (which can only write logs), its own Artifact Registry repository,
its own deployer account and its own Workload Identity pool. Every name is in `infra/config.sh`.

Address: <https://lucid-saga-web-528988811295.europe-west1.run.app>

## Once: set up Google Cloud

An owner of the project runs, from WSL, macOS or Linux:

```sh
infra/bootstrap.sh --dry-run   # every command it would run, changing nothing
infra/bootstrap.sh             # asks before changing anything; --yes to skip the question
```

It needs only a login. It installs gcloud if it is missing, opens the browser to sign in, and then
sets up, or brings back in line (it is safe to run again):

1. the APIs the deploy needs;
2. the runtime service account `lucid-saga-web`, with only `roles/logging.logWriter`;
3. the Artifact Registry repository `lucid-saga-web`, keeping the 10 newest images;
4. the Cloud Run service, with Google's sample container until the first deploy, open to everyone;
5. the deployer `github-web-deployer`, with `roles/run.developer` on this service only, use of the
   runtime account, and write access to this repository only;
6. the Workload Identity pool `github-web`, whose provider admits only this repository's
   `.github/workflows/deploy.yml` running on `main`. There are no service-account keys anywhere.

Nothing else is needed: no GitHub secrets or variables.

New permissions take a few minutes to reach every part of Google Cloud. A deploy that starts
right after the bootstrap can fail at the sign-in with `iam.serviceAccounts.getAccessToken`
denied; re-run it a few minutes later. The first deploy did exactly that (2026-11-08).

## Every change

1. Open a PR into `dev`. CI must pass: formatting, lint, types, unit tests and the build (`web`),
   the Docker image served and checked as Cloud Run would serve it (`image`), and the deploy
   scripts and workflows (`infra`).
2. Squash-merge it into `dev`.
3. To deploy, open a PR from `dev` into `main` and merge it with a merge commit (never squashed, so
   `dev` and `main` keep the same history). CI fails a PR into `main` from any other branch.
4. The push to `main` starts the Deploy workflow. It waits for CI to pass on that commit, signs in
   to Google Cloud through Workload Identity Federation, builds the image with the site's address
   baked in (for canonical links, the sitemap and link previews), pushes it, deploys it by digest,
   moves all traffic to it, and checks that `/` sends a visitor to a language and `/en` loads. If
   the check or any step after the deploy fails, traffic goes back to the previous revision.

The Deploy workflow can also be started by hand on `main` (Actions, Deploy, Run workflow): with
"Dry run" ticked it signs in, checks the setup and builds the image, and only prints the rest.

## Dependabot

Dependabot watches the site's npm packages, the image's Node (both stages of the `Dockerfile`) and
the workflows' actions. It is free, and stays free if the repository goes private.

- **Alerts** list each known vulnerability under the repository's Security tab.
- **Security updates** open a PR into `dev`, the default branch, as soon as an advisory affects a
  package and a fixed version exists.
- **Version updates** ([`.github/dependabot.yml`](../.github/dependabot.yml)) open PRs into `dev`
  once a week. Next.js and `eslint-config-next` move together, as do React and its types; the
  other minor and patch updates share one PR per ecosystem, and each major update gets its own. A
  release waits 7 days before it is offered, so a broken or hijacked release is usually pulled
  first. Security updates never wait. A new major Node (and its `@types/node`) is a PR of its own.

Alerts and security updates are switched on in the repository's settings, not in the file (since
2026-11-10; `gh api repos/Mikigb77/LucidSaga_Web/automated-security-fixes` shows whether they still
are). CI's `web` job reads its Node image from the `Dockerfile`, so an update of the image's Node is
checked on the new Node. A Dependabot PR is merged like any other: CI must be green, a major update
needs a look at its changelog, and it is squash-merged into `dev`, then reaches the site with the
next deploy. If CI fails, the fix goes on the Dependabot branch or the update is closed with the
reason.

## From a laptop

With Docker and gcloud signed in to the project, `infra/deploy.sh laptop` builds, pushes, deploys
and checks the committed code, and rolls back if the check fails. Use it only when Actions can't
run; the normal path is the merge into `main`.

## Rolling back

Every deploy prints the revision it replaced. To send all traffic back to an older revision:

```sh
infra/deploy.sh rollback lucid-saga-web-00007-abc
```

or, in the console, Cloud Run, `lucid-saga-web`, Revisions, Manage traffic. The next deploy moves
traffic to the new revision again.

## Costs

The service scales to zero (`min-instances 0`, at most 3 instances), so an idle site costs nothing
but the stored images, which the cleanup policy keeps to the newest 10. The first visit after a
quiet spell waits for a cold start.

## Later

- A custom domain: map it in Cloud Run (or through a load balancer), then change `SITE_URL` in
  `infra/config.sh` so canonical links and link previews use it.
