import Image from "next/image";

import icon from "@/assets/icon-96.png";
import { company, documents, legalPath } from "@/content/legal";
import type { Dictionary } from "@/i18n";
import { localeNames, locales, type Locale } from "@/i18n/locales";

import styles from "./Footer.module.css";
import { LanguageLink } from "./LanguageLink";

export function Footer({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Image src={icon} alt="" width={40} height={40} className={styles.icon} />
          <div>
            <p className={styles.name}>Lucid Saga</p>
            <p className={styles.tagline}>{t.footer.tagline}</p>
          </div>
        </div>
        <nav className={styles.languages} aria-label={t.footer.languages}>
          {locales.map((locale) => (
            <LanguageLink key={locale} locale={locale} current={lang}>
              {localeNames[locale]}
            </LanguageLink>
          ))}
        </nav>
      </div>
      <nav className={`container ${styles.legal}`} aria-label={t.footer.legal}>
        {documents.map((document) => (
          <a key={document} href={legalPath(document, lang)}>
            {t.legal.titles[document]}
          </a>
        ))}
        <a href={`mailto:${company.supportEmail}`}>{t.footer.support}</a>
      </nav>
      <div className={`container ${styles.fine}`}>
        <p>{t.footer.rights}</p>
        <p>{t.footer.trademark}</p>
      </div>
    </footer>
  );
}
