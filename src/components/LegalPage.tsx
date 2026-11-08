import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  company,
  contactHref,
  documents,
  legalCopy,
  legalPath,
  localizeHref,
  versionDate,
  type ContactPurpose,
  type DocumentId,
} from "@/content/legal";
import { getDictionary, type Dictionary } from "@/i18n";
import { defaultLocale, locales, ogLocales, type Locale } from "@/i18n/locales";

import styles from "./LegalPage.module.css";

/** A legal document's title, description, language links and link preview. */
export function legalMetadata(document: DocumentId, lang: Locale): Metadata {
  const t = getDictionary(lang);
  const doc = legalCopy[lang][document];
  const title = `${t.legal.titles[document]} · Lucid Saga`;
  const image = { url: `/og/${lang}.jpg`, width: 1200, height: 630, alt: t.meta.ogAlt };
  return {
    title,
    description: doc.description,
    alternates: {
      canonical: legalPath(document, lang),
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, legalPath(document, l)])),
        "x-default": legalPath(document, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Lucid Saga",
      title,
      description: doc.description,
      url: legalPath(document, lang),
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: doc.description, images: [image] },
  };
}

function Operator({ t }: { t: Dictionary["legal"] }) {
  const rows: [string, ReactNode][] = [
    [t.operator, company.name],
    [t.taxId, company.taxId],
    [t.address, company.registeredAddress],
    [t.register, t.registration],
    [
      t.generalContact,
      <a key="general" href={`mailto:${company.generalEmail}`}>
        {company.generalEmail}
      </a>,
    ],
    [
      t.supportContact,
      <a key="support" href={`mailto:${company.supportEmail}`}>
        {company.supportEmail}
      </a>,
    ],
  ];
  return (
    <dl className={styles.operator}>
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Contact({ t, purpose }: { t: Dictionary["legal"]; purpose: ContactPurpose }) {
  const subject = t.subjects[purpose];
  const label = { privacy: t.write, deletion: t.deletion, withdrawal: t.withdrawal }[purpose];
  const href = contactHref(subject, purpose === "deletion" ? t.deletionBody : undefined);
  const [user, domain] = company.supportEmail.split("@");
  return (
    <div className={styles.contact}>
      <a className={styles.button} href={href}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="m4.5 7 7.5 6 7.5-6" />
        </svg>
        {label}
      </a>
      <p className={styles.help}>{t.emailHelp}</p>
      <dl className={styles.mail}>
        <div>
          <dt>{t.recipient}</dt>
          <dd>
            {user}
            <wbr />@{domain}
          </dd>
        </div>
        <div>
          <dt>{t.subject}</dt>
          <dd>{subject}</dd>
        </div>
      </dl>
    </div>
  );
}

/** One legal document, in the page's language: the summary, a table of contents and the sections. */
export function LegalPage({ document, lang }: { document: DocumentId; lang: Locale }) {
  const t = getDictionary(lang);
  const doc = legalCopy[lang][document];
  return (
    <main id="main" className={styles.page}>
      <div className="container">
        <a href={`/${lang}`} className={styles.back}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13 8H3m0 0 4-4M3 8l4 4" />
          </svg>
          {t.legal.back}
        </a>
        <header className={styles.head}>
          <p className="eyebrow">{t.legal.documents}</p>
          <h1 className={styles.title}>{doc.title}</h1>
          <p className={styles.version}>
            {t.legal.inForce} <time dateTime={company.version}>{versionDate(lang)}</time>
          </p>
        </header>

        <section className={styles.summary} aria-labelledby="summary-title">
          <h2 id="summary-title" className="sr-only">
            {t.legal.summary}
          </h2>
          <ol>
            {doc.summary.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </section>

        <div className={styles.layout}>
          <aside className={styles.side}>
            <nav aria-label={t.legal.contents}>
              <p className={styles.sideTitle}>{t.legal.contents}</p>
              <ul>
                {doc.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label={t.legal.documents}>
              <p className={styles.sideTitle}>{t.legal.documents}</p>
              <ul>
                {documents.map((id) => (
                  <li key={id}>
                    <a href={legalPath(id, lang)} aria-current={id === document ? "page" : undefined}>
                      {t.legal.titles[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className={styles.body}>
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.company && <Operator t={t.legal} />}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className={styles.bullets}>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.notes?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.contact && <Contact t={t.legal} purpose={section.contact} />}
                {section.links && (
                  <ul className={styles.links}>
                    {section.links.map((link) => {
                      const external = link.href.startsWith("http");
                      return (
                        <li key={link.href}>
                          <a
                            href={localizeHref(link.href, lang)}
                            {...(external ? { rel: "noopener", target: "_blank" } : {})}
                          >
                            {link.label}
                            <svg viewBox="0 0 16 16" aria-hidden="true">
                              <path d={external ? "M5 11 11 5m0 0H6m5 0v5" : "M3 8h10m0 0-4-4m4 4-4 4"} />
                            </svg>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
