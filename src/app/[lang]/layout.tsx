import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { inter, literata, literataDisplay } from "@/fonts";
import { getDictionary } from "@/i18n";
import { hasLocale, locales, ogLocales } from "@/i18n/locales";
import { siteUrl } from "@/site";

import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  const image = { url: `/og/${lang}.jpg`, width: 1200, height: 630, alt: t.meta.ogAlt };
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: "Lucid Saga",
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "Lucid Saga",
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}`,
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [image],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  colorScheme: "dark",
};

// Lets CSS hide content that rises into view only when a script will reveal it (globals.css).
const markJs = "document.documentElement.classList.add('js')";

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${literata.variable} ${literataDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: markJs }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {t.nav.skip}
        </a>
        <Header t={t} lang={lang} />
        {children}
        <Footer t={t} lang={lang} />
        <RevealObserver />
      </body>
    </html>
  );
}
