import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, localeCookie, localizedPath, negotiateLocale } from "@/i18n/locales";

/**
 * Sends a visitor without a language in the path to one: the language they picked before in the
 * language switch (a cookie, components/LanguageLink), else the best match for their browser's
 * languages, else English. A page with a language in its path is served as is.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (hasLocale(pathname.split("/")[1])) return NextResponse.next();

  const remembered = request.cookies.get(localeCookie)?.value;
  const locale = hasLocale(remembered)
    ? remembered
    : (negotiateLocale(request.headers.get("accept-language")) ?? defaultLocale);
  const url = request.nextUrl.clone();
  url.pathname = localizedPath(pathname, locale);
  url.search = search;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language, Cookie");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  // Everything but Next's own files and the files served from the site's root.
  matcher: [
    "/((?!_next/|og/|robots\\.txt|sitemap\\.xml|favicon\\.ico|icon\\.png|apple-icon\\.png|manifest\\.webmanifest).*)",
  ],
};
