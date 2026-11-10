import Image from "next/image";
import type { CSSProperties } from "react";

import backBooth from "@/assets/scenes/back-booth.webp";
import type { Dictionary } from "@/i18n";

import { Eyebrow } from "./Eyebrow";
import styles from "./Features.module.css";

const VOICES = ["Sulafat", "Gacrux", "Charon", "Algieba"];
const HINTS = [
  { lang: "en", code: "EN", text: "What do you do?" },
  { lang: "es", code: "ES", text: "¿Qué haces?" },
  { lang: "ca", code: "CA", text: "Què fas?" },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" className={styles.lineIcon} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function Die() {
  return (
    <svg viewBox="0 0 24 24" className={styles.lineIcon} aria-hidden="true">
      <path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4z" />
      <path d="M12 2.8v8.6m0 0 8-4M12 11.4l-8-4M12 11.4v9.8" />
    </svg>
  );
}

export function Features({ t }: { t: Dictionary }) {
  const f = t.features;
  const delay = (i: number) => ({ "--reveal-delay": `${(i % 3) * 80}ms` }) as CSSProperties;
  return (
    <section id="features" className={styles.section} aria-labelledby="features-title">
      <div className="container">
        <div className={styles.head} data-reveal>
          <Eyebrow n="02">{f.eyebrow}</Eyebrow>
          <h2 id="features-title" className="section-title">
            {f.title}
          </h2>
        </div>

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.pictures}`} data-reveal style={delay(0)}>
            <Image
              src={backBooth}
              alt={f.pictures.alt}
              sizes="(max-width: 760px) 100vw, (max-width: 1100px) 100vw, 66vw"
              className={styles.picture}
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{f.pictures.title}</h3>
              <p className={styles.body}>{f.pictures.body}</p>
            </div>
          </article>

          <article className={`${styles.card} ${styles.voice}`} data-reveal style={delay(1)}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.player}>
                <span className={styles.playButton}>
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                </span>
                <span className={styles.wave}>
                  {Array.from({ length: 28 }, (_, i) => (
                    <i key={i} style={{ "--i": i } as CSSProperties} />
                  ))}
                </span>
              </div>
              <div className={styles.voices}>
                {VOICES.map((voice, i) => (
                  <span key={voice} className={i === 0 ? styles.voiceOn : styles.voiceName}>
                    {voice}
                  </span>
                ))}
              </div>
            </div>
            <h3 className={styles.title}>{f.voice.title}</h3>
            <p className={styles.body}>{f.voice.body}</p>
          </article>

          <article className={`${styles.card} ${styles.languages}`} data-reveal style={delay(2)}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.hints}>
                {HINTS.map((hint, i) => (
                  <span
                    key={hint.code}
                    lang={hint.lang}
                    className={styles.hint}
                    style={{ "--i": i } as CSSProperties}
                  >
                    <b>{hint.code}</b>
                    {hint.text}
                  </span>
                ))}
              </div>
            </div>
            <h3 className={styles.title}>{f.languages.title}</h3>
            <p className={styles.body}>{f.languages.body}</p>
          </article>

          <article className={`${styles.card} ${styles.logic}`} data-reveal style={delay(3)}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.sheet}>
                <span className={styles.sheetTitle}>{f.logic.card}</span>
                <ul>
                  {f.logic.lines.map((line, i) => (
                    <li key={line}>
                      {i < f.logic.lines.length - 1 ? <Check /> : <Die />}
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className={styles.title}>{f.logic.title}</h3>
            <p className={styles.body}>{f.logic.body}</p>
          </article>

          <article className={`${styles.card} ${styles.world}`} data-reveal style={delay(4)}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.sky}>
                <span className={styles.sun} />
              </div>
              <div className={styles.worldChips}>
                <span className={styles.timeChip}>
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 2" />
                  </svg>
                  {f.world.time}
                </span>
                <span className={styles.eventChip}>
                  <b>{f.world.event}</b> · {f.world.eventText}
                </span>
              </div>
            </div>
            <h3 className={styles.title}>{f.world.title}</h3>
            <p className={styles.body}>{f.world.body}</p>
          </article>

          <article className={`${styles.card} ${styles.memory}`} data-reveal style={delay(5)}>
            <div className={styles.memoryText}>
              <h3 className={styles.title}>{f.memory.title}</h3>
              <p className={styles.body}>{f.memory.body}</p>
            </div>
            <div className={styles.memoryPanel} aria-hidden="true">
              <span className={styles.panelTitle}>{f.memory.label}</span>
              <span className={styles.panelSub}>{f.memory.sublabel}</span>
              <ul>
                {f.memory.items.map((item, i) => (
                  <li key={item.name} className={i === 0 ? styles.gone : undefined}>
                    <span className={styles.avatar}>
                      {item.name
                        .replace(/^(El |L'|The )/, "")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                    <span>
                      <b>{item.name}</b>
                      <small>{item.note}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className={`${styles.card} ${styles.dictation}`} data-reveal style={delay(6)}>
            <div className={styles.visual} aria-hidden="true">
              <span className={styles.micRing}>
                <svg viewBox="0 0 24 24">
                  <rect x="9" y="3.5" width="6" height="11" rx="3" />
                  <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5v3" />
                </svg>
              </span>
              <span className={styles.transcript}>“{f.dictation.sample}”</span>
            </div>
            <h3 className={styles.title}>{f.dictation.title}</h3>
            <p className={styles.body}>{f.dictation.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
