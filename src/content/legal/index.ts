import type { Locale } from "@/i18n/locales";

import { ca } from "./ca";
import { company } from "./company";
import { en } from "./en";
import { es } from "./es";
import { documents, type ContactPurpose, type DocumentId, type LegalCopy } from "./types";

export { company, documents };
export type { ContactPurpose, DocumentId, LegalCopy };
export type { LegalDocument, Section } from "./types";

export const legalCopy: Record<Locale, LegalCopy> = { en, es, ca };

export function legalPath(document: DocumentId, locale: Locale) {
  return `/${locale}/${document}`;
}

/** A link in a document: a site path (/privacy#rights) gets the page's language; a URL stays. */
export function localizeHref(href: string, locale: Locale) {
  return href.startsWith("/") ? `/${locale}${href}` : href;
}

/** An email to support with the subject, and for a deletion the body, written out. */
export function contactHref(subject: string, body?: string) {
  const query = [`subject=${encodeURIComponent(subject)}`];
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${company.supportEmail}?${query.join("&")}`;
}

const dateLocales: Record<Locale, string> = { en: "en-GB", es: "es-ES", ca: "ca-ES" };

/** The day this version took effect, written out in the page's language. */
export function versionDate(locale: Locale) {
  return new Intl.DateTimeFormat(dateLocales[locale], { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${company.version}T00:00:00Z`),
  );
}
