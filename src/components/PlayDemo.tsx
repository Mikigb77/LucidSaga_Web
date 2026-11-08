"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import type { Dictionary } from "@/i18n";

import styles from "./PlayDemo.module.css";

type Demo = Dictionary["demo"];

/** How far the scene has played: what the phone shows at each moment of the loop. */
type Progress = {
  picture: boolean;
  words1: number;
  typed: number;
  sent: boolean;
  words2: number;
  done: boolean;
  fading: boolean;
};

const START: Progress = {
  picture: false,
  words1: 0,
  typed: 0,
  sent: false,
  words2: 0,
  done: false,
  fading: false,
};

const WORD_MS = 52;
const CHAR_MS = 42;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The play screen in a phone, playing a scene the way the app does: narration streams in word by
 * word, the player types an action, the next scene answers it, and the choices and the voice
 * appear. It loops while on screen, rests while off it, and shows the finished scene at once for
 * visitors who ask for reduced motion. Screen readers get the scene as plain text instead.
 */
export function PlayDemo({ t, picture, accent }: { t: Demo; picture: StaticImageData; accent: string }) {
  const words1 = t.scene1.split(" ");
  const words2 = t.scene2.split(" ");
  const finished: Progress = {
    picture: true,
    words1: words1.length,
    typed: 0,
    sent: true,
    words2: words2.length,
    done: true,
    fading: false,
  };
  const [progress, setProgress] = useState<Progress>(START);
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setProgress({ ...finished }));
      return () => cancelAnimationFrame(id);
    }

    let cancelled = false;
    let visible = false;
    let wake: (() => void) | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && wake) {
          wake();
          wake = null;
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(frame);

    // Waits ms, and then for as long as the phone is off screen.
    const step = async (ms: number) => {
      await sleep(ms);
      while (!cancelled && !visible) {
        await new Promise<void>((resolve) => (wake = resolve));
      }
      if (cancelled) throw new Error("cancelled");
    };
    const update = (patch: Partial<Progress>) => setProgress((p) => ({ ...p, ...patch }));

    const play = async () => {
      for (;;) {
        setProgress(START);
        await step(500);
        update({ picture: true });
        await step(900);
        for (let i = 1; i <= words1.length; i++) {
          update({ words1: i });
          await step(WORD_MS + (words1[i - 1].endsWith(".") || words1[i - 1].endsWith(",") ? 160 : 0));
        }
        await step(1100);
        for (let i = 1; i <= t.action.length; i++) {
          update({ typed: i });
          await step(CHAR_MS);
        }
        await step(500);
        update({ typed: 0, sent: true });
        await step(700);
        for (let i = 1; i <= words2.length; i++) {
          update({ words2: i });
          await step(WORD_MS + (words2[i - 1].endsWith(".") || words2[i - 1].endsWith(",") ? 160 : 0));
        }
        await step(500);
        update({ done: true });
        await step(6500);
        update({ fading: true });
        await step(700);
      }
    };
    play().catch(() => undefined);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (wake) wake();
    };
    // The words come from the page's language, which never changes while it is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest words in view, as the app does while a scene streams.
  useEffect(() => {
    const scroll = scrollRef.current;
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  }, [progress]);

  const streaming1 = progress.words1 > 0 && progress.words1 < words1.length;
  const streaming2 = progress.words2 > 0 && progress.words2 < words2.length;

  return (
    <figure className={styles.figure} ref={frameRef}>
      <div className={styles.phone} aria-hidden="true" style={{ "--accent": accent } as CSSProperties}>
        <div className={`${styles.screen} ${progress.fading ? styles.fading : ""}`}>
          <div className={styles.status}>
            <span>9:41</span>
            <span className={styles.island} />
            <span className={styles.signal}>
              <i />
              <i />
              <i />
            </span>
          </div>
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
            {progress.sent && <p className={styles.action}>{t.action}</p>}
            {progress.words2 > 0 && (
              <p className={styles.narration}>
                {words2.slice(0, progress.words2).join(" ")}
                {streaming2 && <span className={styles.caret} />}
              </p>
            )}
            {progress.done && (
              <div className={styles.after}>
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
                <div className={styles.choices}>
                  {t.choices.map((choice, i) => (
                    <span key={choice} className={styles.choice} style={{ "--i": i } as CSSProperties}>
                      {choice}
                    </span>
                  ))}
                </div>
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
      </div>
      <figcaption className="sr-only">
        {t.label}. {t.pictureAlt} {t.scene1} “{t.action}.” {t.scene2}
      </figcaption>
    </figure>
  );
}
