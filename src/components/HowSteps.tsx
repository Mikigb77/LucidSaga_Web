"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import type { Dictionary } from "@/i18n";

import styles from "./HowItPlays.module.css";
import { PlayDemo, type DemoWorld } from "./PlayDemo";
import { reached } from "./playScript";

/** Where the phone stays beside the steps and follows them: wide windows tall enough to hold it. */
const FOLLOW = "(min-width: 901px) and (min-height: 600px)";

function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * How it plays' four steps beside the phone. The gold thread joining the steps' numbers draws
 * itself as the page scrolls, and each number lights up once the thread reaches it: a step is
 * reached when the middle of its number passes 60% of the way down the window. On wide windows
 * the phone stays in view beside the steps and shows the one reached; elsewhere it sits under
 * them and plays all four by itself. Without script, or with reduced motion, the thread is drawn
 * and every number lit from the start.
 */
export function HowSteps({
  steps,
  demo,
  memory,
  world,
  picture,
  accent,
  children,
}: {
  steps: Dictionary["how"]["steps"];
  demo: Dictionary["demo"];
  memory: Dictionary["features"]["memory"];
  world: DemoWorld;
  picture: StaticImageData;
  accent: string;
  /** The section's heading, above the steps. */
  children: ReactNode;
}) {
  const list = useRef<HTMLOListElement>(null);
  const [step, setStep] = useState(0);
  const follow = useMedia(FOLLOW);

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) element.setAttribute("data-drawing", "");

    let frame = 0;
    const draw = () => {
      frame = 0;
      const items = Array.from(element.children) as HTMLElement[];
      const numbers = items.map((item) => {
        const box = (item.querySelector("[data-n]") ?? item).getBoundingClientRect();
        return { top: box.top, bottom: box.bottom };
      });
      const at = reached(numbers, window.innerHeight * 0.6);
      items.forEach((item, i) => {
        item.toggleAttribute("data-reached", at.reached[i]);
        item.style.setProperty("--fill", at.fill[i].toFixed(3));
      });
      setStep(at.step);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      element.removeAttribute("data-drawing");
    };
  }, []);

  return (
    <div className={styles.grid}>
      <div className={styles.demo}>
        <div data-reveal>
          <PlayDemo
            t={demo}
            memory={memory}
            world={world}
            steps={steps.map((s) => s.title)}
            picture={picture}
            accent={accent}
            follow={follow}
            step={step}
          />
        </div>
      </div>
      <div>
        {children}
        <ol className={styles.steps} ref={list}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.number} data-n aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div data-reveal>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
