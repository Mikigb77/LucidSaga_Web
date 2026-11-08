# CLAUDE.md

The Lucid Saga website: a Next.js app (App Router, TypeScript) in English, Spanish and Catalan,
served from the Cloud Run service `lucid-saga-web` in the `playable-anime` Google Cloud project.
The game itself, and its requirements, are in [Mikigb77/PlayableAnime](https://github.com/Mikigb77/PlayableAnime).

@AGENTS.md

## Rules

1. **Every PR targets `dev`, never `main`.** Merging `dev` into `main` is the deploy
   ([docs/DEPLOY.md](docs/DEPLOY.md)), and CI fails any PR into `main` that doesn't come from `dev`.
   Squash-merge into `dev`; merge `dev` into `main` with a merge commit, never squashed.
2. CI must be green before merging: `npm run check` (Prettier, ESLint, types, Vitest) and
   `npm run build`, the Docker image check, and `shellcheck -x` plus actionlint for `infra/` and the
   workflows. Add tests with each change.
3. Every phrase is in all three dictionaries (`src/i18n/dictionaries`), in Spanish from Spain and
   Catalan with tú/tu, as the app speaks. A test fails when a language misses a phrase or leaves
   one in English. Use the app's own wording for things the app shows.
4. No service-account keys anywhere: GitHub Actions signs in through Workload Identity Federation.
   Never print secrets, tokens or players' data to logs.
5. Say what the game does today. The site promises nothing the app doesn't do, and it stays
   "coming soon" until the Play listing is live. Google's Play badge is only for a live listing.
6. The legal pages say only what the app and the backend actually do. When either changes what data
   it keeps, where it goes or who can see it, update `src/content/legal` in all three languages
   and `company.version` ([docs/LEGAL.md](docs/LEGAL.md)). The app shows the same privacy policy:
   copy a change to its words to PlayableAnime's `docs/PRIVACY.md` and `app/assets/legal`.
7. Respect reduced motion: every animation must stop or settle under
   `prefers-reduced-motion: reduce`.
