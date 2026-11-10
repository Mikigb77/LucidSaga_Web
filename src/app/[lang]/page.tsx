import { notFound } from "next/navigation";

import { Features } from "@/components/Features";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItPlays } from "@/components/HowItPlays";
import { Marquee } from "@/components/Marquee";
import { Worlds } from "@/components/Worlds";
import { getDictionary } from "@/i18n";
import { hasLocale } from "@/i18n/locales";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <main id="main">
      <Hero t={t} />
      <Marquee t={t} />
      <HowItPlays t={t} />
      <Features t={t} />
      <Worlds t={t} lang={lang} />
      <FinalCta t={t} />
    </main>
  );
}
