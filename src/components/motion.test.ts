import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { finishedAt, initial, PLAY, reached, startOf, stepScreen } from "./playScript";
import { activeSection, coverOf, readProgress } from "./scrollProgress";

const sizes = { words1: 26, words2: 40, action: 47 };
const css = (name: string) => readFileSync(new URL(name, import.meta.url), "utf8");

describe("the phone beside How it plays", () => {
  it("shows Discover, the scene twice, then Memory", () => {
    expect(PLAY).toEqual([0, 1, 1, 2]);
    expect([0, 1, 2, 3].map(stepScreen)).toEqual([0, 1, 1, 2]);
    // Out of range, it shows the nearest step's screen.
    expect(stepScreen(-1)).toBe(0);
    expect(stepScreen(9)).toBe(2);
  });

  it("starts with nothing played", () => {
    expect(startOf(0, sizes)).toEqual({
      picked: false,
      picture: false,
      words1: 0,
      choices: false,
      typed: 0,
      sent: false,
      words2: 0,
      done: false,
      deed: false,
    });
  });

  it("starts each step where the step before it ended", () => {
    for (const step of [1, 2, 3]) expect(startOf(step, sizes)).toEqual(finishedAt(step - 1, sizes));
  });

  it("ends the scene step with the move typed but not sent, under the choices", () => {
    const end = finishedAt(1, sizes);
    expect(end).toMatchObject({ picture: true, words1: 26, choices: true, typed: 47, sent: false });
    expect(end.words2).toBe(0);
  });

  it("sends the move, takes the choices away and reads the answer aloud in the next step", () => {
    expect(finishedAt(2, sizes)).toMatchObject({
      choices: false,
      typed: 0,
      sent: true,
      words2: 40,
      done: true,
      deed: false,
    });
  });

  it("keeps the deed in Memory only in the last step", () => {
    expect([0, 1, 2, 3].map((step) => finishedAt(step, sizes).deed)).toEqual([false, false, false, true]);
  });
});

describe("the thread between the steps", () => {
  const numbers = [
    { top: 100, bottom: 144 },
    { top: 500, bottom: 544 },
    { top: 900, bottom: 944 },
  ];

  it("reaches no step before the first number's middle passes the pen", () => {
    const at = reached(numbers, 110);
    expect(at.reached).toEqual([false, false, false]);
    expect(at.step).toBe(0);
    expect(at.fill).toEqual([0, 0, 0]);
  });

  it("fills toward the next number as the pen moves down", () => {
    const at = reached(numbers, 144 + (500 - 144) / 2);
    expect(at.reached).toEqual([true, false, false]);
    expect(at.step).toBe(0);
    expect(at.fill[0]).toBeCloseTo(0.5);
    expect(at.fill[1]).toBe(0);
  });

  it("reaches the last step, full all the way, and never fills past the last number", () => {
    const at = reached(numbers, 2000);
    expect(at.reached).toEqual([true, true, true]);
    expect(at.step).toBe(2);
    expect(at.fill).toEqual([1, 1, 0]);
  });
});

describe("the chapters' stack", () => {
  it("covers a chapter as the next one slides over it", () => {
    // The next chapter just below: nothing covered. Halfway up it: half. Over its top: all.
    expect(coverOf(100, 500, 628)).toBe(0);
    expect(coverOf(100, 500, 350)).toBeCloseTo(0.5);
    expect(coverOf(100, 500, 100)).toBe(1);
    expect(coverOf(100, 500, 40)).toBe(1);
    expect(coverOf(100, 0, 40)).toBe(0);
  });
});

describe("the header's thread and links", () => {
  it("reads 0 at the top of the page and 1 at its end", () => {
    expect(readProgress(0, 5000, 1000)).toBe(0);
    expect(readProgress(2000, 5000, 1000)).toBeCloseTo(0.5);
    expect(readProgress(4000, 5000, 1000)).toBe(1);
    expect(readProgress(4500, 5000, 1000)).toBe(1);
    // A page no taller than the window has nothing to read down.
    expect(readProgress(0, 800, 1000)).toBe(0);
  });

  it("lights the section under the line, and none on a page without the sections", () => {
    const sections = [
      { top: -900, bottom: 100 },
      { top: 100, bottom: 1400 },
      { top: 1400, bottom: 2400 },
    ];
    expect(activeSection(sections, 400)).toBe(1);
    expect(activeSection(sections, 50)).toBe(0);
    expect(activeSection([null, null, null], 400)).toBe(-1);
  });
});

describe("Memory's initials", () => {
  it("take the name's first letter after its article, in each language", () => {
    expect(initial("The grey mage")).toBe("G");
    expect(initial("El mago gris")).toBe("M");
    expect(initial("L'ancià Mo")).toBe("A");
    expect(initial("Elder Mo")).toBe("E");
  });
});

describe("the motion, under reduced motion", () => {
  it("shows every heading and its lead in place, with no slide", () => {
    const globals = css("../app/globals.css");
    const moments = globals.indexOf("@media (prefers-reduced-motion: no-preference)");
    expect(moments).toBeGreaterThan(-1);
    // Whatever hides a heading's words or its lead before it slides in waits for motion.
    const outside = globals.slice(0, moments) + globals.slice(globals.indexOf("\n}\n", moments));
    expect(outside).not.toMatch(/\.mask-line > span \{[^}]*transform: translateY/);
    expect(outside).not.toContain('[data-reveal="head"]:not([data-visible])');
  });

  it("plays the chapters' moments only for visitors who allow motion", () => {
    const features = css("./Features.module.css");
    const moments = features.indexOf("@media (prefers-reduced-motion: no-preference)");
    expect(moments).toBeGreaterThan(-1);
    // Every rule that hides a moment before it plays sits inside that block.
    const before = features.slice(0, moments);
    expect(before).not.toMatch(/:not\(\[data-visible\]\)/);
  });

  it("hides the header's reading thread", () => {
    const header = css("./Header.module.css");
    const reduced = header.slice(header.indexOf("@media (prefers-reduced-motion: reduce)"));
    expect(reduced).toMatch(/\.inner::after \{\s*display: none;/);
  });

  it("stops the steps' and the phone's transitions", () => {
    expect(css("./HowItPlays.module.css")).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\.number,\s*\.stepTitle \{\s*transition: none;/,
    );
    expect(css("./PlayDemo.module.css")).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\.view,[^}]*transition: none;/,
    );
  });
});
