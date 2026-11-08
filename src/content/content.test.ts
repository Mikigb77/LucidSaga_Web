import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/locales";

import { accentFor } from "./accent";
import { worlds } from "./worlds";

describe("worlds", () => {
  it("are the app's twenty-three starter worlds, each once", () => {
    expect(worlds).toHaveLength(23);
    expect(new Set(worlds.map((w) => w.id)).size).toBe(23);
  });

  it("put the nine signature worlds first", () => {
    const signature = worlds.filter((w) => w.signature);
    expect(signature).toHaveLength(9);
    expect(worlds.slice(0, 9).every((w) => w.signature)).toBe(true);
  });

  it("have a cover and words in every language", () => {
    for (const world of worlds) {
      expect(world.cover, world.id).toBeTruthy();
      for (const locale of locales) {
        const text = world.text[locale];
        expect(text.title.length, `${world.id} ${locale}`).toBeGreaterThan(0);
        expect(text.genre.length, `${world.id} ${locale}`).toBeGreaterThan(0);
        expect(text.tagline.length, `${world.id} ${locale}`).toBeGreaterThan(0);
      }
    }
  });
});

describe("accentFor", () => {
  it("matches the app's genre accents", () => {
    expect(accentFor("Cultivation")).toBe("#5CC9A7");
    expect(accentFor("Knights with aura")).toBe("#84A9F5");
    expect(accentFor("Monster races")).toBe("#F08A5D");
    expect(accentFor("Reincarnation")).toBe("#B08CFA");
    expect(accentFor("Mafia drama")).toBe("#EF7A82");
    expect(accentFor("Space opera")).toBe("#4FCFE0");
    expect(accentFor("Supernatural")).toBe("#DD8BE8");
  });

  it("reads urban fantasy as supernatural before fantasy", () => {
    expect(accentFor("Neon urban fantasy")).toBe("#DD8BE8");
  });

  it("gives an unknown genre the app's gold", () => {
    expect(accentFor("Cozy baking")).toBe("#E3B66B");
  });

  it("does not take a word inside another word", () => {
    // "star" only at the start of a word: "mustard" is not space.
    expect(accentFor("Mustard farming")).toBe("#E3B66B");
  });
});
