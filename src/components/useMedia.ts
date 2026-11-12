import { useSyncExternalStore } from "react";

/**
 * Wide windows tall enough to hold How it plays' phone beside its steps: there the phone stays
 * put and follows the steps (HowSteps), and Features' chapters stack (ChapterStack). The same
 * query is in HowItPlays.module.css, PlayDemo.module.css and Features.module.css, which a test
 * holds to this one.
 */
export const WIDE_AND_TALL = "(min-width: 901px) and (min-height: 600px)";

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Whether a media query matches, kept up to date as the window or the visitor's settings change.
 * It is false on the server and while the page hydrates.
 */
export function useMedia(query: string): boolean {
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
