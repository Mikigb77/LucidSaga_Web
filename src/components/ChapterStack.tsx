"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { coverOf } from "./scrollProgress";

/** Where the chapters stack: the same wide, tall windows where How it plays' phone stays put. */
const STACK = "(min-width: 901px) and (min-height: 600px)";

/**
 * Features' chapters, which stay under the header in turn as the page scrolls, each sliding over
 * the one before it (Features.module.css). As a chapter is covered it settles back and dims:
 * this sets its --cover, from 0 to 1. Phones and short windows get the chapters one after
 * another; under reduced motion they still stack, but nothing settles back or dims.
 */
export function ChapterStack({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = window.matchMedia(STACK);
    const chapters = Array.from(root.children) as HTMLElement[];

    let frame = 0;
    const draw = () => {
      frame = 0;
      chapters.forEach((chapter, i) => {
        const next = chapters[i + 1];
        if (!next || !media.matches) {
          chapter.style.removeProperty("--cover");
          return;
        }
        // A chapter settles back from its top edge, so its top stays where it is.
        const cover = coverOf(
          chapter.getBoundingClientRect().top,
          chapter.offsetHeight,
          next.getBoundingClientRect().top,
        );
        chapter.style.setProperty("--cover", cover.toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
