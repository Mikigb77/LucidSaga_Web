import { localeNames, locales, type Locale } from "@/i18n/locales";

import { LanguageLink } from "./LanguageLink";
import styles from "./LanguageSwitcher.module.css";

/** This page in each language, each named in itself, as the app's language list is. */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <nav className={styles.switcher} aria-label={label}>
      {locales.map((locale) => (
        <LanguageLink key={locale} locale={locale} current={current} className={styles.option}>
          <span aria-hidden="true">{locale.toUpperCase()}</span>
          <span className="sr-only">{localeNames[locale]}</span>
        </LanguageLink>
      ))}
    </nav>
  );
}
