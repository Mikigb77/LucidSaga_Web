import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, localeCookie, negotiateLocale } from "@/i18n/locales";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Sends a visitor without a language in the path to one: the language they picked before (a
 * cookie), else the best match for their browser's languages, else English. A page with a language
 * in its path is served as is, and remembers that language for the next visit to /.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (hasLocale(first)) {
    const response = NextResponse.next();
    if (request.cookies.get(localeCookie)?.value !== first) {
      response.cookies.set(localeCookie, first, {
        path: "/",
        maxAge: ONE_YEAR,
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
      });
    }
    return response;
  }

  const remembered = request.cookies.get(localeCookie)?.value;
  const locale = hasLocale(remembered)
    ? remembered
    : (negotiateLocale(request.headers.get("accept-language")) ?? defaultLocale);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
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
