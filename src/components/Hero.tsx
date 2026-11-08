import Image from "next/image";

import gate from "@/assets/gate.webp";
import type { Dictionary } from "@/i18n";

import { Fireflies } from "./Fireflies";
import styles from "./Hero.module.css";
import { PlayBadge } from "./PlayBadge";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop}>
        <div className={styles.art}>
          <Image
            src={gate}
            alt={t.hero.artAlt}
            priority
            sizes="(max-width: 900px) 150vw, 64vw"
            className={styles.image}
          />
          <div className={styles.glow} aria-hidden="true" />
        </div>
        <Fireflies className={styles.fireflies} />
        <div className={styles.fade} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          {t.hero.eyebrow}
        </p>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.lineA}>{t.hero.titleA}</span>{" "}
          <span className={`${styles.lineB} gold-text`}>{t.hero.titleB}</span>
        </h1>
        <p className={styles.lead}>{t.hero.lead}</p>
        <p className={styles.body}>{t.hero.body}</p>
        <div className={styles.actions}>
          <PlayBadge t={t} />
          <a href="#how" className={styles.secondary}>
            {t.hero.secondary}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 3v10m0 0 4-4m-4 4L4 9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>
        <p className={styles.languages}>
          <span lang="en">English</span>
          <span aria-hidden="true">·</span>
          <span lang="es">Español</span>
          <span aria-hidden="true">·</span>
          <span lang="ca">Català</span>
        </p>
      </div>
    </section>
  );
}
