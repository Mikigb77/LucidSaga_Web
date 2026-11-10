# Lucid Saga website

**Live site: <https://lucid-saga-web-528988811295.europe-west1.run.app>**

The website of [Lucid Saga](https://github.com/Mikigb77/PlayableAnime), the endless AI story game,
coming soon to Google Play. It is a Next.js app in English, Spanish and Catalan, served from its own
Cloud Run service in the same Google Cloud project as the game's backend (`playable-anime`).

## Run it

Node 22.12 or later.

```sh
npm ci
npm run dev        # http://localhost:3000
npm run check      # formatting, lint, types and unit tests, as CI runs them
npm run build      # the production build
```

`/` sends a visitor to `/en`, `/es` or `/ca`: the language they picked before, else their browser's,
else English (`src/proxy.ts`). The words are in `src/i18n/dictionaries`, the starter worlds in
`src/content/worlds.ts`.

## How changes ship

- Every PR goes into `dev`. CI (`.github/workflows/ci.yml`) checks formatting, lint, types, unit
  tests and the build, builds the Docker image and serves it as Cloud Run would, and checks the
  deploy scripts.
- Merging `dev` into `main` deploys: `.github/workflows/deploy.yml` waits for CI on that commit,
  builds the image, deploys it to Cloud Run and checks the live site, rolling back if the check
  fails. CI fails any PR into `main` that doesn't come from `dev`.

The one-time Google Cloud setup, the deploy itself and how to roll back are in
[docs/DEPLOY.md](docs/DEPLOY.md).

## Legal pages

Privacy Policy, Terms and Conditions, Legal notice and account deletion, for GARBAR, IN-TEC, S.L.,
at `/{lang}/privacy`, `/terms`, `/legal` and `/delete-account`. Where their facts come from, and
what to check before the Play listing, is in [docs/LEGAL.md](docs/LEGAL.md).

## Pictures and fonts

- The gate art, the world covers and the scene pictures are the game's own, cropped and converted
  by `scripts/prepare_images.py`. The gate is the app icon's painting, upscaled 4x with
  Real-ESRGAN (`scripts/upscale.py`) and repainted at 4K by Gemini on Vertex AI with a better
  drawn traveller (`scripts/repaint.py`), so it stays sharp on retina screens.
- Link previews (`public/og/*.jpg`) are drawn from the hero's words by `scripts/og-images.mjs`.
- Fonts are Inter and Literata (SIL Open Font License, in `src/fonts`), subset by
  `scripts/subset-fonts.sh`.
