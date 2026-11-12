import wellAtDusk from "@/assets/scenes/well-at-dusk.webp";
import { accentFor } from "@/content/accent";
import { worlds } from "@/content/worlds";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/locales";

import { Eyebrow } from "./Eyebrow";
import styles from "./HowItPlays.module.css";
import { HowSteps } from "./HowSteps";
import { MaskLine } from "./MaskLine";
import type { DemoWorld } from "./PlayDemo";

/** The world the phone's scene comes from, which it picks on Discover in the first step. */
const DEMO_WORLD = "outer-disciple";
/** Two of the other worlds, under it on Discover. */
const MORE_WORLDS = ["naples-vendetta", "kestrel-debt"];

export function HowItPlays({ t, lang }: { t: Dictionary; lang: Locale }) {
  const disciple = worlds.find((w) => w.id === DEMO_WORLD) ?? worlds[0];
  const text = disciple.text[lang];
  const world: DemoWorld = {
    cover: disciple.cover,
    accent: accentFor(disciple.text.en.genre),
    badge: t.worlds.signatureBadge,
    signature: t.worlds.signature,
    genre: text.genre,
    title: text.title,
    tagline: text.tagline,
    more: t.worlds.more,
    others: worlds
      .filter((w) => MORE_WORLDS.includes(w.id))
      .map((w) => ({
        cover: w.cover,
        accent: accentFor(w.text.en.genre),
        genre: w.text[lang].genre,
        title: w.text[lang].title,
      })),
  };
  return (
    <section id="how" className={styles.section} aria-labelledby="how-title">
      <div className="container">
        <HowSteps
          steps={t.how.steps}
          demo={t.demo}
          memory={t.features.memory}
          world={world}
          picture={wellAtDusk}
          accent={accentFor(disciple.text.en.genre)}
        >
          <div data-reveal="head">
            <Eyebrow n="01">{t.how.eyebrow}</Eyebrow>
            <h2 id="how-title" className="section-title">
              <MaskLine>{t.how.title}</MaskLine>
            </h2>
          </div>
        </HowSteps>
      </div>
    </section>
  );
}
