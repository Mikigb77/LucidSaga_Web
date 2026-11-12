"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { coverOf } from "./scrollProgress";
import { REDUCED_MOTION, useMedia, WIDE_AND_TALL } from "./useMedia";

/**
 * Features' chapters, which stay under the header in turn as the page scrolls, each sliding over
 * the one before it (Features.module.css). As a chapter is covered it settles back and dims:
 * this sets its --cover, from 0 to 1. Phones and short windows get the chapters one after
 * another; under reduced motion they still stack, but nothing settles back or dims.
 */
export function ChapterStack({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const stacked = useMedia(WIDE_AND_TALL);
  const reduced = useMedia(REDUCED_MOTION);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const chapters = Array.from(root.children) as HTMLElement[];
    const clear = () => chapters.forEach((chapter) => chapter.style.removeProperty("--cover"));
    if (!stacked || reduced) {
      clear();
      return;
    }

    let frame = 0;
    const draw = () => {
      frame = 0;
      // Every place is read before any chapter moves, so the page is laid out once a frame. A
      // chapter settles back from its top edge, so its top stays where it is.
      const places = chapters.map((chapter) => ({
        top: chapter.getBoundingClientRect().top,
        height: chapter.offsetHeight,
      }));
      chapters.forEach((chapter, i) => {
        const next = places[i + 1];
        const cover = next ? coverOf(places[i].top, places[i].height, next.top) : 0;
        chapter.style.setProperty("--cover", cover.toFixed(3));
      });
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
      clear();
    };
  }, [stacked, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
