import { notFound } from "next/navigation";

import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { hasLocale } from "@/i18n/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  return hasLocale(lang) ? legalMetadata("privacy", lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage document="privacy" lang={lang} />;
}
