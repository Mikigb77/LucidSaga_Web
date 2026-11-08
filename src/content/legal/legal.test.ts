import { existsSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/locales";

import { company, contactHref, documents, legalCopy, localizeHref, versionDate } from ".";

const en = legalCopy.en;

describe.each(locales.filter((l) => l !== "en"))("the %s legal documents", (locale) => {
  const copy = legalCopy[locale];

  it.each(documents)("%s has English's sections, in the same order and shape", (document) => {
    const shape = (doc: typeof en.privacy) => ({
      summary: doc.summary.length,
      sections: doc.sections.map((s) => ({
        id: s.id,
        company: s.company ?? false,
        contact: s.contact ?? null,
        paragraphs: s.paragraphs?.length ?? 0,
        bullets: s.bullets?.length ?? 0,
        notes: s.notes?.length ?? 0,
        // Site links must match; outside links may point at a page in the reader's language.
        links: s.links?.map((l) => (l.href.startsWith("/") ? l.href : "external")) ?? [],
      })),
    });
    expect(shape(copy[document])).toEqual(shape(en[document]));
  });
});

describe.each(locales)("the %s legal documents", (locale) => {
  const copy = legalCopy[locale];

  it("are written out, with no placeholders or empty lines", () => {
    for (const document of documents) {
      const doc = copy[document];
      const lines = [
        doc.title,
        doc.description,
        ...doc.summary,
        ...doc.sections.flatMap((s) => [
          s.title,
          ...(s.paragraphs ?? []),
          ...(s.bullets ?? []),
          ...(s.notes ?? []),
          ...(s.links ?? []).map((l) => l.label),
        ]),
      ];
      for (const line of lines) {
        expect(line.trim(), `${locale} ${document}`).toBe(line);
        expect(line.length, `${locale} ${document}`).toBeGreaterThan(0);
        expect(line, `${locale} ${document}`).not.toMatch(/undefined|\$\{|TODO|TBD|XXX/);
      }
    }
  });

  it("name the operator and its contacts", () => {
    expect(copy.legal.sections[0].paragraphs!.join(" ")).toContain(company.name);
    expect(JSON.stringify(copy)).toContain(company.supportEmail);
    expect(JSON.stringify(copy)).toContain(company.generalEmail);
  });

  it("state the minimum age", () => {
    const age = copy.privacy.sections.find((s) => s.id === "age-changes")!.paragraphs![0];
    expect(age).toContain(String(company.minimumAge));
  });

  it("link only to pages that exist", () => {
    for (const document of documents) {
      for (const section of copy[document].sections) {
        for (const link of section.links ?? []) {
          if (link.href.startsWith("http")) {
            expect(link.href).toMatch(/^https:\/\//);
            continue;
          }
          const [path, anchor] = link.href.split("#");
          const target = documents.find((d) => path === `/${d}`);
          expect(target, link.href).toBeDefined();
          if (anchor) expect(copy[target!].sections.map((s) => s.id)).toContain(anchor);
        }
      }
    }
  });

  it("write the date out", () => {
    expect(versionDate(locale)).toMatch(/2026/);
  });
});

describe("routes", () => {
  it.each(documents)("%s has a page", (document) => {
    expect(existsSync(`src/app/[lang]/${document}/page.tsx`)).toBe(true);
  });
});

describe("helpers", () => {
  it("localize site links and leave URLs alone", () => {
    expect(localizeHref("/privacy#rights", "ca")).toBe("/ca/privacy#rights");
    expect(localizeHref("https://www.aepd.es/", "es")).toBe("https://www.aepd.es/");
  });

  it("write an email to support", () => {
    expect(contactHref("Delete my account", "Hello,\n\nPlease")).toBe(
      `mailto:${company.supportEmail}?subject=Delete%20my%20account&body=Hello%2C%0A%0APlease`,
    );
    expect(contactHref("Hi")).toBe(`mailto:${company.supportEmail}?subject=Hi`);
  });
});
