"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import type { Dictionary } from "@/i18n";

import styles from "./PlayDemo.module.css";
import { finishedAt, initial, PLAY, startOf, stepScreen, type Progress } from "./playScript";

type Demo = Dictionary["demo"];
type Memory = Dictionary["features"]["memory"];

/** The starter world the phone opens on Discover, in the page's language. */
export type DemoWorld = {
  cover: StaticImageData;
  accent: string;
  badge: string;
  signature: string;
  genre: string;
  title: string;
  tagline: string;
  /** "More worlds", and two of them, under the signature world. */
  more: string;
  others: { cover: StaticImageData; accent: string; genre: string; title: string }[];
};

const WORD_MS = 52;
const CHAR_MS = 42;
/** How long the phone rests on each step once it has played, when it plays them by itself. */
const HOLD_MS = [1700, 1600, 3800, 3600];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const pause = (word: string) => WORD_MS + (word.endsWith(".") || word.endsWith(",") ? 160 : 0);

/**
 * A phone in the app's dark theme, showing what each of How it plays' four steps looks like in
 * the app: Discover, where a world is picked (01); a scene, where the player types what they do
 * (02); the next scene streaming in as the storyteller writes it (03); and Memory, where that deed
 * has been kept (04).
 *
 * Beside the steps (`follow`), it shows the step the page has scrolled to, and plays that step's
 * moment the first time it gets there going down. Elsewhere it plays the four steps by itself in
 * a loop, naming each one under the phone. Either way it rests while off screen, and visitors who
 * ask for reduced motion see each step already played. Screen readers get the scene as plain
 * text instead.
 */
export function PlayDemo({
  t,
  memory,
  world,
  steps,
  picture,
  accent,
  follow,
  step,
}: {
  t: Demo;
  memory: Memory;
  world: DemoWorld;
  steps: string[];
  picture: StaticImageData;
  accent: string;
  /** Show the step the page has scrolled to, instead of playing the steps in a loop. */
  follow: boolean;
  /** The step the page has scrolled to, from 0. */
  step: number;
}) {
  const words1 = t.scene1.split(" ");
  const words2 = t.scene2.split(" ");
  const sizes = { words1: words1.length, words2: words2.length, action: t.action.length };

  const [shown, setShown] = useState(0);
  const [progress, setProgress] = useState<Progress>(startOf(0, sizes));
  const [fading, setFading] = useState(false);
  const frameRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const wakeRef = useRef<(() => void) | null>(null);
  const lastStep = useRef(-1);

  // Whether the phone is on screen: its moments wait for it.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (visible.current && wakeRef.current) {
          wakeRef.current();
          wakeRef.current = null;
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;

    // Waits ms, and then for as long as the phone is off screen.
    const wait = async (ms: number) => {
      await sleep(ms);
      while (!cancelled && !visible.current) {
        await new Promise<void>((resolve) => (wakeRef.current = resolve));
      }
      if (cancelled) throw new Error("cancelled");
    };
    const update = (patch: Partial<Progress>) => setProgress((p) => ({ ...p, ...patch }));

    // One step's moment, from where the step before it ended.
    const play = async (n: number) => {
      if (n === 0) {
        await wait(1100);
        update({ picked: true });
      } else if (n === 1) {
        await wait(450);
        update({ picture: true });
        await wait(800);
        for (let i = 1; i <= words1.length; i++) {
          update({ words1: i });
          await wait(pause(words1[i - 1]));
        }
        await wait(350);
        update({ choices: true });
        await wait(1400);
        for (let i = 1; i <= t.action.length; i++) {
          update({ typed: i });
          await wait(CHAR_MS);
        }
      } else if (n === 2) {
        await wait(600);
        update({ typed: 0, choices: false, sent: true });
        await wait(700);
        for (let i = 1; i <= words2.length; i++) {
          update({ words2: i });
          await wait(pause(words2[i - 1]));
        }
        await wait(450);
        update({ done: true });
      } else {
        await wait(800);
        update({ deed: true });
      }
    };

    // Steps the page doesn't follow: all four in turn, over and over.
    const loop = async () => {
      for (;;) {
        for (let n = 0; n < PLAY.length; n++) {
          setShown(n);
          setProgress(startOf(n, sizes));
          setFading(false);
          await play(n);
          await wait(HOLD_MS[n]);
        }
        setFading(true);
        await wait(700);
      }
    };

    // A frame later, so the phone never changes during the render that set it up.
    const later = (apply: () => void) => {
      const id = requestAnimationFrame(apply);
      return () => cancelAnimationFrame(id);
    };

    if (!follow) {
      lastStep.current = -1;
      if (reduced) {
        // Reduced motion: the scene as it ends, as the page showed it before the steps.
        return later(() => {
          setShown(2);
          setProgress(finishedAt(2, sizes));
          setFading(false);
        });
      }
      loop().catch(() => undefined);
      return () => {
        cancelled = true;
        wakeRef.current?.();
      };
    }

    // Following the page: going down plays the step's moment; going back up shows it played.
    const from = lastStep.current;
    lastStep.current = step;
    if (reduced || step < from) {
      return later(() => {
        setShown(step);
        setProgress(finishedAt(step, sizes));
        setFading(false);
      });
    }
    const undo = later(() => {
      setShown(step);
      setProgress(startOf(step, sizes));
      setFading(false);
      play(step).catch(() => undefined);
    });
    return () => {
      undo();
      cancelled = true;
      wakeRef.current?.();
    };
    // The words come from the page's language, which never changes while it is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [follow, step]);

  // Keep the newest words in view, as the app does while a scene streams.
  useEffect(() => {
    const scroll = scrollRef.current;
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  }, [progress]);

  const screen = stepScreen(shown);
  const place = (n: number) => (n === screen ? styles.on : n < screen ? styles.before : styles.after);
  const streaming1 = progress.words1 > 0 && progress.words1 < words1.length;
  const streaming2 = progress.words2 > 0 && progress.words2 < words2.length;
  const [elder, mage] = memory.items;

  return (
    <figure className={`${styles.figure} ${follow ? styles.following : ""}`} ref={frameRef}>
      <div className={styles.phone} aria-hidden="true" style={{ "--accent": accent } as CSSProperties}>
        <div className={`${styles.screen} ${fading ? styles.fading : ""}`}>
          <div className={styles.status}>
            <span>9:41</span>
            <span className={styles.island} />
            <span className={styles.signal}>
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className={styles.views}>
            {/* 01: Discover, where a signature world is picked. */}
            <div className={`${styles.view} ${place(0)}`}>
              <div className={styles.discover}>
                <span className={styles.bigTitle}>{t.discover}</span>
                <span className={styles.sub}>{t.discoverHeadline}</span>
                <span className={styles.group}>{world.signature}</span>
                <div
                  className={`${styles.world} ${progress.picked ? styles.picked : ""}`}
                  style={{ "--world": world.accent } as CSSProperties}
                >
                  <Image src={world.cover} alt="" sizes="320px" className={styles.worldImage} />
                  <span className={styles.worldBadge}>{world.badge}</span>
                  <span className={styles.worldText}>
                    <span className={styles.worldGenre}>{world.genre}</span>
                    <span className={styles.worldTitle}>{world.title}</span>
                    <span className={styles.worldTagline}>{world.tagline}</span>
                  </span>
                  <span className={styles.tap} />
                </div>
                <div className={styles.create}>
                  <svg viewBox="0 0 24 24" className={styles.spark}>
                    <path d="M12 3.5 13.8 9l5.7 1.9-5.7 1.9L12 18.5l-1.8-5.7-5.7-1.9L10.2 9zM19 3l.7 2 2 .7-2 .7L19 8.5l-.7-2-2-.7 2-.7z" />
                  </svg>
                  <span>
                    <b>{t.createTitle}</b>
                    <small>{t.createBody}</small>
                  </span>
                  <svg viewBox="0 0 24 24" className={styles.go}>
                    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
                  </svg>
                </div>
                <span className={styles.group}>{world.more}</span>
                <div className={styles.more}>
                  {world.others.map((other) => (
                    <span
                      key={other.title}
                      className={styles.small}
                      style={{ "--world": other.accent } as CSSProperties}
                    >
                      <Image src={other.cover} alt="" sizes="160px" className={styles.worldImage} />
                      <span className={styles.worldText}>
                        <span className={styles.worldGenre}>{other.genre}</span>
                        <span className={styles.smallTitle}>{other.title}</span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.nav}>
                <span className={styles.navOn}>
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="m14.8 9.2-1.6 4-4 1.6 1.6-4z" />
                  </svg>
                  {t.discover}
                </span>
                <span>
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6.5C6.5 5 9.5 5 12 6.5v12C9.5 17 6.5 17 4 18.5zm16 0C17.5 5 14.5 5 12 6.5v12c2.5-1.5 5.5-1.5 8 0z" />
                  </svg>
                  {t.library}
                </span>
                <span>
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8.5" r="3.5" />
                    <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
                  </svg>
                  {t.account}
                </span>
              </div>
            </div>

            {/* 02 and 03: the scene, the player's move, and the scene that answers it. */}
            <div className={`${styles.view} ${place(1)}`}>
              <div className={styles.appbar}>
                <svg viewBox="0 0 24 24" className={styles.icon}>
                  <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
                </svg>
                <span className={styles.storyTitle}>{t.story}</span>
                <svg viewBox="0 0 24 24" className={styles.icon}>
                  <path d="M4 6.5C6.5 5 9.5 5 12 6.5v12C9.5 17 6.5 17 4 18.5zm16 0C17.5 5 14.5 5 12 6.5v12c2.5-1.5 5.5-1.5 8 0z" />
                </svg>
              </div>

              <div className={styles.scroll} ref={scrollRef}>
                <div className={styles.chips}>
                  <span className={styles.time}>
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 7.5V12l3 2" />
                    </svg>
                    {t.time}
                  </span>
                  <span className={styles.event}>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
                      <circle cx="12" cy="10" r="2.2" />
                    </svg>
                    <span>
                      <b>{t.event}</b> · {t.eventText}
                    </span>
                  </span>
                </div>
                <div className={`${styles.picture} ${progress.picture ? styles.shown : ""}`}>
                  <Image src={picture} alt="" sizes="340px" />
                </div>
                <p className={styles.narration}>
                  {words1.slice(0, progress.words1).join(" ")}
                  {streaming1 && <span className={styles.caret} />}
                </p>
                {progress.choices && (
                  <div className={styles.choices}>
                    {t.choices.map((choice, i) => (
                      <span key={choice} className={styles.choice} style={{ "--i": i } as CSSProperties}>
                        {choice}
                      </span>
                    ))}
                  </div>
                )}
                {progress.sent && <p className={styles.action}>{t.action}</p>}
                {progress.words2 > 0 && (
                  <p className={styles.narration}>
                    {words2.slice(0, progress.words2).join(" ")}
                    {streaming2 && <span className={styles.caret} />}
                  </p>
                )}
                {progress.done && (
                  <div className={styles.listen}>
                    <span className={styles.play}>
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5.5v13l11-6.5z" />
                      </svg>
                    </span>
                    <span>{t.readAloud}</span>
                    <span className={styles.bars}>
                      {Array.from({ length: 14 }, (_, i) => (
                        <i key={i} style={{ "--i": i } as CSSProperties} />
                      ))}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.composer}>
                <span className={progress.typed ? styles.typed : styles.placeholder}>
                  {progress.typed ? t.action.slice(0, progress.typed) : t.composer}
                  {progress.typed > 0 && <span className={styles.cursor} />}
                </span>
                <svg viewBox="0 0 24 24" className={styles.mic}>
                  <rect x="9" y="3.5" width="6" height="11" rx="3" />
                  <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5v3" />
                </svg>
                <span className={`${styles.send} ${progress.typed ? styles.ready : ""}`}>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 19V5m0 0-6 6m6-6 6 6" />
                  </svg>
                </span>
              </div>
            </div>

            {/* 04: Memory, where the deed is kept beside everything else the character knows. */}
            <div className={`${styles.view} ${place(2)}`}>
              <div className={styles.appbar}>
                <svg viewBox="0 0 24 24" className={styles.icon}>
                  <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
                </svg>
                <span className={styles.storyTitle}>{memory.label}</span>
              </div>
              <div className={styles.memory}>
                <span className={styles.sub}>{memory.sublabel}</span>
                <div className={styles.filters}>
                  <span className={styles.filterOn}>{t.memoryAll}</span>
                  <span>{t.memoryPeople}</span>
                  <span>{t.memoryDeeds}</span>
                </div>
                <span className={styles.group}>{t.memoryDeeds}</span>
                <div className={`${styles.fresh} ${progress.deed ? styles.kept : ""}`}>
                  <div>
                    <div className={styles.entry}>
                      <span className={styles.entryIcon}>
                        <svg viewBox="0 0 24 24">
                          <path d="M12 3.5 13.8 9l5.7 1.9-5.7 1.9L12 18.5l-1.8-5.7-5.7-1.9L10.2 9z" />
                        </svg>
                      </span>
                      <span>
                        <b>{t.deeds[0].text}</b>
                        <small>{t.deeds[0].when}</small>
                        <small className={styles.seen}>
                          <svg viewBox="0 0 24 24">
                            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
                            <circle cx="12" cy="12" r="2.8" />
                          </svg>
                          {t.deeds[0].known}
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.entry}>
                  <span className={styles.entryIcon}>
                    <svg viewBox="0 0 24 24">
                      <path d="M7 4.5h10v15l-5-3.5-5 3.5z" />
                    </svg>
                  </span>
                  <span>
                    <b>{t.deeds[1].text}</b>
                    <small>{t.deeds[1].when}</small>
                    <small>
                      <svg viewBox="0 0 24 24">
                        <path d="M4 4l16 16M9.9 5.8A9 9 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.6 3.4M6.4 7.5C3.9 9.3 2.5 12 2.5 12S6 18.5 12 18.5a9 9 0 0 0 3.6-.8" />
                      </svg>
                      {t.deeds[1].known}
                    </small>
                  </span>
                </div>
                <span className={styles.group}>{t.memoryPeople}</span>
                <div className={styles.entry}>
                  <span className={styles.avatar}>{initial(mage.name)}</span>
                  <span>
                    <b>
                      {mage.name} <em className={styles.hostile}>{t.hostile}</em>
                    </b>
                    <small>{mage.note}</small>
                  </span>
                </div>
                <div className={`${styles.entry} ${styles.gone}`}>
                  <span className={styles.avatar}>{initial(elder.name)}</span>
                  <span>
                    <b>{elder.name}</b>
                    <small>{elder.note}</small>
                  </span>
                </div>
                <span className={styles.group}>{t.memoryPlaces}</span>
                <div className={styles.entry}>
                  <span className={styles.entryIcon}>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
                      <circle cx="12" cy="10" r="2.2" />
                    </svg>
                  </span>
                  <span>
                    <b>{t.place.name}</b>
                    <small>{t.place.note}</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playing by itself, the phone names the step it shows. */}
      <p className={styles.caption} aria-hidden="true">
        <span className={styles.captionN}>{String(shown + 1).padStart(2, "0")}</span>
        <span className={styles.captionText} key={shown}>
          {steps[shown]}
        </span>
      </p>

      <figcaption className="sr-only">
        {t.label}. {t.pictureAlt} {t.scene1} “{t.action}.” {t.scene2}
      </figcaption>
    </figure>
  );
}
