import Image from "next/image";
import type { CSSProperties } from "react";

import popupWorld from "@/assets/popup-world.webp";
import { accentFor } from "@/content/accent";
import { worlds, type World } from "@/content/worlds";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/locales";

import { Eyebrow } from "./Eyebrow";
import styles from "./Worlds.module.css";

function Cover({
  world,
  lang,
  badge,
  size,
}: {
  world: World;
  lang: Locale;
  badge?: string;
  size: "lg" | "sm";
}) {
  const text = world.text[lang];
  return (
    <article
      className={`${styles.cover} ${size === "lg" ? styles.lg : styles.sm}`}
      style={{ "--accent": accentFor(world.text.en.genre) } as CSSProperties}
    >
      <Image
        src={world.cover}
        alt=""
        sizes={size === "lg" ? "(max-width: 700px) 85vw, (max-width: 1100px) 45vw, 380px" : "260px"}
        className={styles.image}
      />
      <div className={styles.shade} />
      {badge && <span className={styles.badge}>{badge}</span>}
      <div className={styles.text}>
        <span className={styles.genre}>{text.genre}</span>
        <h3 className={styles.title}>{text.title}</h3>
        {size === "lg" && <p className={styles.tagline}>{text.tagline}</p>}
      </div>
    </article>
  );
}

export function Worlds({ t, lang }: { t: Dictionary; lang: Locale }) {
  const signature = worlds.filter((world) => world.signature);
  const more = worlds.filter((world) => !world.signature);
  return (
    <section id="worlds" className={styles.section} aria-labelledby="worlds-title">
      <div className="container">
        <div className={styles.head} data-reveal>
          <Eyebrow n="03">{t.worlds.eyebrow}</Eyebrow>
          <h2 id="worlds-title" className="section-title">
            {t.worlds.title}
          </h2>
          <p className="section-lead">{t.worlds.body}</p>
        </div>

        <h3 className={styles.subhead} data-reveal>
          {t.worlds.signature}
        </h3>
        <div className={styles.signature}>
          {signature.map((world, i) => (
            <div
              key={world.id}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as CSSProperties}
            >
              <Cover world={world} lang={lang} badge={t.worlds.signatureBadge} size="lg" />
            </div>
          ))}
        </div>

        <h3 className={styles.subhead} data-reveal>
          {t.worlds.more}
        </h3>
      </div>

      {/* The other worlds drift past; the list is there twice so the loop never shows a seam, and
          the copy is hidden from screen readers. */}
      <div className={styles.marquee} data-reveal>
        <ul className={styles.track}>
          {more.map((world) => (
            <li key={world.id}>
              <Cover world={world} lang={lang} size="sm" />
            </li>
          ))}
          {more.map((world) => (
            <li key={`${world.id}-again`} aria-hidden="true">
              <Cover world={world} lang={lang} size="sm" />
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        <div className={styles.own} data-reveal>
          <div className={styles.ownArt}>
            <Image src={popupWorld} alt={t.worlds.ownAlt} sizes="(max-width: 800px) 100vw, 480px" />
          </div>
          <div className={styles.ownText}>
            <h3 className={styles.ownTitle}>{t.worlds.ownTitle}</h3>
            <p className={styles.ownBody}>{t.worlds.ownBody}</p>
            <div className={styles.premise} aria-hidden="true">
              <span className={styles.premiseText}>{t.worlds.ownExample}</span>
              <span className={styles.draft}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 3.5 13.8 9l5.7 1.9-5.7 1.9L12 18.5l-1.8-5.7-5.7-1.9L10.2 9zM19 3l.7 2 2 .7-2 .7L19 8.5l-.7-2-2-.7 2-.7z" />
                </svg>
                {t.worlds.ownAction}
              </span>
            </div>
            <p className="sr-only">“{t.worlds.ownExample}”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
