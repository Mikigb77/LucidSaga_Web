import { lang } from "next/root-params";

import { getDictionary } from "@/i18n";
import { defaultLocale, hasLocale } from "@/i18n/locales";

import styles from "./not-found.module.css";

export default async function NotFound() {
  const current = await lang();
  const locale = hasLocale(current) ? current : defaultLocale;
  const t = getDictionary(locale);
  return (
    <main id="main" className={styles.main}>
      <div className={styles.glow} aria-hidden="true" />
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t.notFound.title}</h1>
      <p className={styles.body}>{t.notFound.body}</p>
      <a className={styles.back} href={`/${locale}`}>
        {t.notFound.back}
      </a>
    </main>
  );
}
