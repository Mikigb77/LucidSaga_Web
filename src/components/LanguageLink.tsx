"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { localeCookie, localeNames, localizedPath, type Locale } from "@/i18n/locales";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * A link to this page in another language. Following it remembers the choice in the lang cookie,
 * so / opens in that language next time (src/proxy.ts). Only a visitor's own pick sets the cookie.
 */
export function LanguageLink({
  locale,
  current,
  className,
  title,
  children,
}: {
  locale: Locale;
  current: Locale;
  className?: string;
  title?: string;
  children: ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const remember = () => {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${localeCookie}=${locale}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax${secure}`;
  };
  return (
    <a
      href={localizedPath(pathname, locale)}
      hrefLang={locale}
      lang={locale}
      title={title ?? localeNames[locale]}
      aria-current={locale === current ? "page" : undefined}
      className={className}
      onClick={remember}
    >
      {children}
    </a>
  );
}
