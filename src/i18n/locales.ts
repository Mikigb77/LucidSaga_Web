/** The site's languages: the app's own (S10 in PlayableAnime's requirements). */
export const locales = ["en", "es", "ca"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** The cookie that remembers a visitor's language once they have picked one. */
export const localeCookie = "lang";

/** Each language's name in itself, for the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ca: "Català",
};

/** Open Graph locales (language_TERRITORY): Spanish from Spain, as the app's voices are. */
export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  ca: "ca_ES",
};

export function hasLocale(value: string | undefined | null): value is Locale {
  return value != null && (locales as readonly string[]).includes(value);
}

/**
 * The best of the site's languages for an Accept-Language header, or null when none fits.
 * Weights (q) are honoured, a region never matters (es-419 and es-ES are both Spanish, ca-ES-valencia
 * is Catalan), and an entry with q=0 is refused.
 */
export function negotiateLocale(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranges = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      let q = 1;
      for (const param of params) {
        const [key, value] = param.trim().split("=");
        if (key === "q") {
          const parsed = Number(value);
          q = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0;
        }
      }
      return { language: tag.trim().toLowerCase().split("-")[0], q, index };
    })
    .filter((range) => range.language && range.language !== "*" && range.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  for (const range of ranges) {
    if (hasLocale(range.language)) return range.language;
  }
  return null;
}

/** The path of a page in another language: /es/x becomes /ca/x. */
export function localizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  if (hasLocale(segments[1])) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}
