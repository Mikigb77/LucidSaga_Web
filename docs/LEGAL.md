# Legal pages

The site publishes Lucid Saga's Privacy Policy, Terms and Conditions, Legal notice and account
deletion page at `/{lang}/privacy`, `/{lang}/terms`, `/{lang}/legal` and `/{lang}/delete-account`,
in English, Spanish and Catalan. The deletion page is the one Google Play's Data safety form asks
for. They follow the company's TaskFlow pages (Mikigb77/TaskFlowWeb, `src/content/legal`), adapted
to what Lucid Saga does.

They are not legal advice. Have them checked by someone who knows EU consumer and data protection
law before the Play listing goes live.

## Where things are

- Company facts, contacts, the minimum age and the effective date: `src/content/legal/company.ts`.
  The documents read them from there.
- The words: `src/content/legal/en.ts`, `es.ts`, `ca.ts`. A test fails when a translation's
  sections, lists or site links stop matching the English, or a link points at a page or section
  that doesn't exist (`src/content/legal/legal.test.ts`).
- The page: `src/components/LegalPage.tsx`; the routes: `src/app/[lang]/{privacy,terms,legal,delete-account}`.

## What the documents rest on

- **Operator:** GARBAR, IN-TEC, S.L., NIF B56760374, as on TaskFlow's pages, with the same
  registered address and registry entry. Miki confirmed it is the same company (2026-11-08).
- **Contacts:** `lucidsaga@garbar.tech` for general enquiries and `lucidsaga.support@garbar.tech`
  for support, privacy and deletion, following TaskFlow's `taskflow@` and `taskflow.support@`.
  They must exist as aliases of the company mailbox before the pages go live.
- **Data and processors:** PlayableAnime `docs/PRIVACY.md` (the app's own policy), `docs/API.md`
  (`/v1/me/export`, `DELETE /v1/me`) and the requirements it cites: accounts and sign-in (T8),
  age (F8), reports (F6), content settings (F7), credits (K1 to K8), dictation (V5, V6), reading
  aloud (V9), privacy (T12). Vertex AI runs on the `global` endpoint (`VERTEX_LOCATION`), so the
  policy says Google may process outside the EU. The game server and its storage are in
  Frankfurt, Neon in Frankfurt, and this site in `europe-west1` (Belgium).
- **App paths and labels:** the app's strings (`app/lib/l10n/app_*.arb`): Account, Privacy and
  data, Export my data, Delete account, Delete my account, Dictation, This device.
- **Logs:** 30 days, Cloud Logging's default. **Backups:** Neon's restore window, not stated as a
  number.
- **Purchases:** none yet (K3 to K5 are P1). The purchase and withdrawal clauses apply only once
  something is sold, through Google Play.
- **Website:** no analytics or tracking. The only cookie, `lang`, is set when a visitor picks a
  language in the switcher (`src/components/LanguageLink.tsx`), never on its own.

## Before the Play listing

- The minimum age: the pages say what `company.minimumAge` says, and the app's `MIN_SIGNUP_AGE`
  must match it.
- The app shows its own copy of the privacy policy (PlayableAnime `app/assets/legal`), still with
  placeholders. Make it match these pages, or link to them.
- When purchases arrive, check the purchase, renewal and withdrawal sections against the real
  offer, and add a business telephone if consumer law requires it for distance contracts.
- Change `company.version` whenever the words change, and tell players in the app about a change
  that matters.
