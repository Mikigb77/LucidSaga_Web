import { localeNames, locales, type Locale } from "@/i18n/locales";

import styles from "./LanguageSwitcher.module.css";

/** Links to the site in each language, each named in itself, as the app's language list is. */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <nav className={styles.switcher} aria-label={label}>
      {locales.map((locale) => (
        <a
          key={locale}
          href={`/${locale}`}
          hrefLang={locale}
          lang={locale}
          title={localeNames[locale]}
          aria-current={locale === current ? "page" : undefined}
          className={styles.option}
        >
          <span aria-hidden="true">{locale.toUpperCase()}</span>
          <span className="sr-only">{localeNames[locale]}</span>
        </a>
      ))}
    </nav>
  );
}
