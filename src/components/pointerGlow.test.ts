import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { follow, glowMedia, settled } from "./pointerGlow";

describe("the gold glow's media query", () => {
  it("asks for a pointer that hovers and aims finely, and for motion", () => {
    expect(glowMedia).toContain("(hover: hover)");
    expect(glowMedia).toContain("(pointer: fine)");
    expect(glowMedia).toContain("(prefers-reduced-motion: no-preference)");
    // Every condition must hold: a comma would let any one of them bring the glow out.
    expect(glowMedia).not.toContain(",");
  });

  it("is backed by the stylesheet, which hides the glow on touch and under reduced motion", () => {
    const css = readFileSync(new URL("./CursorGlow.module.css", import.meta.url), "utf8");
    const hidden =
      /@media \(hover: none\), \(pointer: coarse\), \(prefers-reduced-motion: reduce\) \{\s*\.glow \{\s*display: none;/;
    expect(css).toMatch(hidden);
    expect(css).toMatch(/pointer-events: none;/);
  });

  it("stays a soft light: no part of it brighter than 15% gold", () => {
    const css = readFileSync(new URL("./CursorGlow.module.css", import.meta.url), "utf8");
    const glow = css.slice(css.indexOf(".glow {"), css.indexOf("}", css.indexOf(".glow {")));
    const alphas = [...glow.matchAll(/rgba\([^)]*,\s*([\d.]+)\)/g)].map((match) => Number(match[1]));
    expect(alphas.length).toBeGreaterThan(0);
    expect(Math.max(...alphas)).toBeLessThanOrEqual(0.15);
  });
});

describe("follow", () => {
  it("moves the glow part of the way to the pointer, never past it", () => {
    const next = follow(0, 100, 16);
    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(100);
    expect(follow(100, 0, 16)).toBeLessThan(100);
    expect(follow(100, 0, 16)).toBeGreaterThan(0);
  });

  it("trails alike whatever the frame rate", () => {
    // Six frames at 60 Hz and twelve at 120 Hz are the same tenth of a second.
    let at60 = 0;
    for (let i = 0; i < 6; i++) at60 = follow(at60, 100, 1000 / 60);
    let at120 = 0;
    for (let i = 0; i < 12; i++) at120 = follow(at120, 100, 1000 / 120);
    expect(at60).toBeCloseTo(at120, 6);
  });

  it("catches up with a jump across the screen within a second", () => {
    let x = 0;
    for (let i = 0; i < 60; i++) x = follow(x, 1600, 1000 / 60);
    expect(settled(x, 0, 1600, 0)).toBe(true);
  });

  it("stays put for a frame with no time, or time running backwards", () => {
    expect(follow(10, 100, 0)).toBe(10);
    expect(follow(10, 100, -5)).toBe(10);
  });

  it("doesn't jump after a stalled tab", () => {
    expect(follow(0, 100, 5000)).toBe(follow(0, 100, 100));
    expect(follow(0, 100, 5000)).toBeLessThan(100);
  });
});

describe("settled", () => {
  it("stops the glow within half a pixel of the pointer", () => {
    expect(settled(10.3, 20.2, 10, 20)).toBe(true);
    expect(settled(10, 21, 10, 20)).toBe(false);
    expect(settled(9, 20, 10, 20)).toBe(false);
  });
});
