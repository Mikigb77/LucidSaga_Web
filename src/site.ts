import type { Locale } from "@/i18n/locales";

/**
 * Where the site lives, for absolute links in its metadata (Open Graph, the sitemap). The deploy
 * builds the image with SITE_URL from infra/config.sh; a local build falls back to localhost.
 */
export const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

/** GarBar, the company that makes Lucid Saga, and its site's page in a language. */
export function garbarUrl(lang: Locale) {
  return `https://garbar.tech/${lang}/`;
}
