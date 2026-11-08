import { notFound } from "next/navigation";

import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { hasLocale } from "@/i18n/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/delete-account">) {
  const { lang } = await params;
  return hasLocale(lang) ? legalMetadata("delete-account", lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/delete-account">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage document="delete-account" lang={lang} />;
}
