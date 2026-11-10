import Image from "next/image";

import icon from "@/assets/icon-96.png";
import { company, documents, legalPath } from "@/content/legal";
import type { Dictionary } from "@/i18n";
import { localeNames, locales, type Locale } from "@/i18n/locales";
import { garbarUrl, taskflowUrl } from "@/site";

import styles from "./Footer.module.css";
import { LanguageLink } from "./LanguageLink";

/**
 * The footer the other GarBar product sites share (TaskFlow's above all): the brand and who makes
 * it, then three columns, the page's sections, GarBar and its other products, and the legal
 * links; then languages and a way back up, over the name in outline.
 */
export function Footer({ t, lang }: { t: Dictionary; lang: Locale }) {
  const home = `/${lang}`;
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.about}>
          <a href={home} className={styles.brand} aria-label={t.nav.home}>
            <Image src={icon} alt="" width={40} height={40} className={styles.icon} />
            <span className={styles.name}>Lucid Saga</span>
          </a>
          <p className={styles.tagline}>{t.footer.tagline}</p>
          <p className={styles.maker}>
            {t.footer.maker}{" "}
            <a href={garbarUrl(lang)} hrefLang={lang} className={styles.garbar}>
              <GarBarMark />
              GarBar
            </a>
          </p>
        </div>
        <div className={styles.columns}>
          {/* Named "On this site", not by its heading, as the header's nav is "Lucid Saga". */}
          <nav aria-label={t.footer.sections}>
            <p className={styles.heading}>Lucid Saga</p>
            <a href={`${home}#how`}>{t.nav.how}</a>
            <a href={`${home}#features`}>{t.nav.features}</a>
            <a href={`${home}#worlds`}>{t.nav.worlds}</a>
          </nav>
          {/* GarBar and its other products, as TaskFlow's footer lists GarBar and Lucid Saga. */}
          <nav aria-labelledby="footer-garbar">
            <p id="footer-garbar" className={styles.heading}>
              GarBar
            </p>
            <a href={garbarUrl(lang)} hrefLang={lang}>
              <GarBarMark />
              garbar.tech
              <Away />
            </a>
            <a href={taskflowUrl(lang)} hrefLang={lang}>
              <TaskFlowMark />
              TaskFlow
              <Away />
            </a>
          </nav>
          <nav aria-labelledby="footer-legal">
            <p id="footer-legal" className={styles.heading}>
              {t.footer.legal}
            </p>
            {documents.map((document) => (
              <a key={document} href={legalPath(document, lang)}>
                {t.legal.titles[document]}
              </a>
            ))}
            <a href={`mailto:${company.supportEmail}`}>{t.footer.support}</a>
          </nav>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <div className={styles.fine}>
          <p>{t.footer.rights}</p>
          <p>{t.footer.trademark}</p>
        </div>
        <nav className={styles.languages} aria-label={t.footer.languages}>
          {locales.map((locale) => (
            <LanguageLink key={locale} locale={locale} current={lang}>
              {localeNames[locale]}
            </LanguageLink>
          ))}
        </nav>
        <a href="#main" className={styles.back}>
          {t.footer.backToTop}
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 13V3m0 0L4 7m4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </a>
      </div>
      <p className={styles.wordmark} aria-hidden="true">
        Lucid Saga
      </p>
    </footer>
  );
}

/** GarBar's GB monogram (garbar.tech's brand.json): a G and a coral B sharing one stem. */
function GarBarMark() {
  return (
    <svg
      className={styles.mark}
      viewBox="0 0 48 48"
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 11H16C9.373 11 4 16.373 4 23S9.373 35 16 35H26V23H17" stroke="currentColor" />
      <path d="M26 11H34A6 6 0 0 1 34 23H26M26 23H35A6 6 0 0 1 35 35H26V11" stroke="#ff5b35" />
    </svg>
  );
}

/** TaskFlow's mark, as garbar.tech draws it: a double tick on a tile of its Lagoon greens. */
function TaskFlowMark() {
  return (
    <span className={styles.taskflow} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 12 5 5L19 6" />
        <path d="m13 14 3 3 7-8" />
      </svg>
    </span>
  );
}

/** A small arrow up and out, for a link to another GarBar site. */
function Away() {
  return (
    <svg className={styles.away} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
