import Image from "next/image";
import Link from "next/link";

import icon from "@/assets/icon-96.png";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/locales";

import styles from "./Header.module.css";
import { HeaderScroll } from "./HeaderScroll";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ t, lang }: { t: Dictionary; lang: Locale }) {
  const home = `/${lang}`;
  return (
    <header className={styles.header} data-header>
      <div className={styles.inner}>
        <Link href={home} className={styles.brand} aria-label={t.nav.home}>
          <Image src={icon} alt="" width={34} height={34} className={styles.icon} priority />
          <span className={styles.wordmark}>Lucid Saga</span>
        </Link>
        <nav className={styles.nav} aria-label="Lucid Saga">
          <a href={`${home}#how`}>{t.nav.how}</a>
          <a href={`${home}#features`}>{t.nav.features}</a>
          <a href={`${home}#worlds`}>{t.nav.worlds}</a>
        </nav>
        <div className={styles.end}>
          <LanguageSwitcher current={lang} label={t.nav.language} />
          <span className={styles.soon}>
            <span className={styles.dot} aria-hidden="true" />
            {t.badge.label}
          </span>
        </div>
      </div>
      <HeaderScroll />
    </header>
  );
}
