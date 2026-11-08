import Image from "next/image";

import gate from "@/assets/gate.webp";
import type { Dictionary } from "@/i18n";

import styles from "./FinalCta.module.css";
import { PlayBadge } from "./PlayBadge";

export function FinalCta({ t }: { t: Dictionary }) {
  return (
    <section className={styles.section} aria-labelledby="final-title">
      <div className={styles.art} aria-hidden="true">
        <Image src={gate} alt="" sizes="(max-width: 700px) 160vw, 900px" />
      </div>
      <div className={`container ${styles.content}`} data-reveal>
        <h2 id="final-title" className={styles.title}>
          <span className="gold-text">{t.final.title}</span>
        </h2>
        <p className={styles.body}>{t.final.body}</p>
        <div className={styles.badge}>
          <PlayBadge t={t} size="lg" />
        </div>
        <p className={styles.rating}>{t.final.rating}</p>
      </div>
    </section>
  );
}
