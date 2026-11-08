import { describe, expect, it } from "vitest";

import { getDictionary } from ".";
import { locales } from "./locales";

type Leaf = { path: string; value: unknown };

function leaves(value: unknown, path = ""): Leaf[] {
  if (Array.isArray(value)) return value.flatMap((item, i) => leaves(item, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => leaves(item, path ? `${path}.${key}` : key));
  }
  return [{ path, value }];
}

const en = getDictionary("en");

describe.each(locales)("the %s dictionary", (locale) => {
  const t = getDictionary(locale);

  it("has every phrase English has, and lists of the same length", () => {
    // The type checker holds the shape; this also holds the length of lists (steps, choices).
    expect(leaves(t).map((leaf) => leaf.path)).toEqual(leaves(en).map((leaf) => leaf.path));
  });

  it("has no empty or untrimmed phrases", () => {
    for (const { path, value } of leaves(t)) {
      expect(typeof value, path).toBe("string");
      expect((value as string).trim(), path).toBe(value);
      expect((value as string).length, path).toBeGreaterThan(0);
    }
  });

  it("keeps the brand and the store names as they are", () => {
    expect(t.badge.store).toBe("Google Play");
    expect(t.meta.title.startsWith("Lucid Saga")).toBe(true);
  });
});

describe("the translations", () => {
  it("are translated, apart from names", () => {
    const names = new Set(["Google Play", "© 2026 Lucid Saga"]);
    for (const locale of locales.filter((l) => l !== "en")) {
      const t = leaves(getDictionary(locale));
      const same = leaves(en).filter(
        ({ path, value }, i) => !names.has(value as string) && t[i].path === path && t[i].value === value,
      );
      expect(same.map((leaf) => `${locale}: ${leaf.path}`)).toEqual([]);
    }
  });
});
