import { describe, expect, it } from "vitest";

import { hasLocale, localizedPath, negotiateLocale } from "./locales";

describe("negotiateLocale", () => {
  it("finds nothing without a header", () => {
    expect(negotiateLocale(null)).toBeNull();
    expect(negotiateLocale(undefined)).toBeNull();
    expect(negotiateLocale("")).toBeNull();
  });

  it("ignores the region", () => {
    expect(negotiateLocale("es-419")).toBe("es");
    expect(negotiateLocale("ca-ES-valencia")).toBe("ca");
    expect(negotiateLocale("EN-gb")).toBe("en");
  });

  it("takes the first language the site has", () => {
    expect(negotiateLocale("fr-FR,fr;q=0.9,ca;q=0.8,en;q=0.7")).toBe("ca");
    expect(negotiateLocale("de,ja")).toBeNull();
  });

  it("honours weights over order", () => {
    expect(negotiateLocale("en;q=0.4,es;q=0.9")).toBe("es");
    expect(negotiateLocale("ca;q=0.5, es;q=0.5")).toBe("ca");
  });

  it("refuses a language weighted zero, and the wildcard", () => {
    expect(negotiateLocale("es;q=0,en;q=0.2")).toBe("en");
    expect(negotiateLocale("*")).toBeNull();
    expect(negotiateLocale("*;q=1,ca;q=0.1")).toBe("ca");
  });

  it("treats a malformed weight as a refusal", () => {
    expect(negotiateLocale("es;q=abc,en;q=0.1")).toBe("en");
  });
});

describe("hasLocale", () => {
  it("knows the three languages and nothing else", () => {
    expect(hasLocale("en")).toBe(true);
    expect(hasLocale("es")).toBe(true);
    expect(hasLocale("ca")).toBe(true);
    expect(hasLocale("fr")).toBe(false);
    expect(hasLocale("EN")).toBe(false);
    expect(hasLocale(undefined)).toBe(false);
    expect(hasLocale(null)).toBe(false);
  });
});

describe("localizedPath", () => {
  it("swaps the language of a localized path", () => {
    expect(localizedPath("/es", "ca")).toBe("/ca");
    expect(localizedPath("/es/worlds", "en")).toBe("/en/worlds");
  });

  it("adds a language to a path without one", () => {
    expect(localizedPath("/", "es")).toBe("/es");
    expect(localizedPath("/worlds", "ca")).toBe("/ca/worlds");
  });
});
