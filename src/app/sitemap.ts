import type { MetadataRoute } from "next";

import { documents } from "@/content/legal";
import { locales } from "@/i18n/locales";
import { siteUrl } from "@/site";

/** The home page and each legal document, in every language, each with its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  type Page = { path: string; changeFrequency: "monthly" | "yearly"; priority: number };
  const pages: Page[] = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    ...documents.map((document): Page => ({
      path: `/${document}`,
      changeFrequency: "yearly",
      priority: 0.3,
    })),
  ];
  return pages.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]));
    return locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
