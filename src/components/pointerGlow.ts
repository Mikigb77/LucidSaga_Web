/**
 * Who gets the gold glow that trails the mouse (CursorGlow.tsx): a pointer that hovers and aims
 * finely, so a mouse or a trackpad, never a finger, and only for visitors who haven't asked for
 * reduced motion.
 */
export const glowMedia = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** How long, in milliseconds, the glow takes to close about two thirds of its gap to the pointer. */
const LAG_MS = 90;

/** The longest step the glow takes in one frame, so a stalled tab doesn't make it jump. */
const MAX_STEP_MS = 100;

/**
 * Where the glow is after `elapsed` milliseconds of trailing the pointer, on one axis. The share
 * of the gap it closes depends on the time, not on the frame, so it trails alike at 60 and 144 Hz.
 */
export function follow(from: number, to: number, elapsed: number) {
  const step = Math.min(Math.max(elapsed, 0), MAX_STEP_MS);
  return from + (to - from) * (1 - Math.exp(-step / LAG_MS));
}

/** Whether the glow is close enough to the pointer to stop drawing. */
export function settled(x: number, y: number, pointerX: number, pointerY: number) {
  return Math.abs(pointerX - x) < 0.5 && Math.abs(pointerY - y) < 0.5;
}
