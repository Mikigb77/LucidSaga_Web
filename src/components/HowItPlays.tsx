import type { CSSProperties } from "react";

import wellAtDusk from "@/assets/scenes/well-at-dusk.webp";
import { accentFor } from "@/content/accent";
import type { Dictionary } from "@/i18n";

import styles from "./HowItPlays.module.css";
import { PlayDemo } from "./PlayDemo";

export function HowItPlays({ t }: { t: Dictionary }) {
  return (
    <section id="how" className={styles.section} aria-labelledby="how-title">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.demo} data-reveal>
            <PlayDemo t={t.demo} picture={wellAtDusk} accent={accentFor("Cultivation")} />
          </div>
          <div>
            <div data-reveal>
              <p className="eyebrow">{t.how.eyebrow}</p>
              <h2 id="how-title" className="section-title">
                {t.how.title}
              </h2>
            </div>
            <ol className={styles.steps}>
              {t.how.steps.map((step, i) => (
                <li
                  key={step.title}
                  className={styles.step}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                >
                  <span className={styles.number} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepBody}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
