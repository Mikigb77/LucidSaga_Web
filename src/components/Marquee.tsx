import type { Dictionary } from "@/i18n";

import styles from "./Marquee.module.css";

/**
 * A gold band of what the game does, sliding past under the hero, as the band on the other GarBar
 * sites does (garbar.tech, TaskFlow). Its phrases are the headings of the sections below, so
 * screen readers skip it. It stands still under reduced motion.
 */
export function Marquee({ t }: { t: Dictionary }) {
  const items = [
    t.how.steps[0].title,
    t.how.steps[1].title,
    t.features.pictures.title,
    t.features.voice.title,
    t.features.logic.title,
    t.how.steps[3].title,
  ];
  const row = (copy: boolean) => (
    <ul className={styles.row} data-copy={copy || undefined}>
      {items.map((item) => (
        <li key={item}>
          {item}
          <Star />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** A four-pointed glint. The fonts are cut down to Latin letters, so it is drawn, not typed. */
function Star() {
  return (
    <svg className={styles.star} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.9 6.3 5.7 11.1 12 12-6.3.9-11.1 5.7-12 12-.9-6.3-5.7-11.1-12-12C6.3 11.1 11.1 6.3 12 0Z" />
    </svg>
  );
}
