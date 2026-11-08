import type { Dictionary } from "@/i18n";

import styles from "./PlayBadge.module.css";

/**
 * "Coming soon to Google Play", in the shape of a store badge. It links nowhere until the app has
 * a listing. Google's own badge and logo are only for linking to a live listing, so the glyph is
 * a plain play arrow in the site's gold.
 */
export function PlayBadge({ t, size = "md" }: { t: Dictionary; size?: "md" | "lg" }) {
  return (
    <div
      className={`${styles.badge} ${size === "lg" ? styles.lg : ""}`}
      role="img"
      aria-label={t.badge.label}
    >
      <svg className={styles.glyph} viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M9.5 5.6c0-1.6 1.8-2.6 3.1-1.7l14 9.4c1.2.8 1.2 2.6 0 3.4l-14 9.4c-1.3.9-3.1-.1-3.1-1.7z"
          fill="currentColor"
        />
      </svg>
      <span className={styles.text}>
        <span className={styles.small}>{t.badge.soon}</span>
        <span className={styles.big}>{t.badge.store}</span>
      </span>
    </div>
  );
}
