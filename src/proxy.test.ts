import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { proxy } from "./proxy";

function request(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(new URL(path, "https://lucidsaga.example"), { headers });
}

describe("proxy", () => {
  it("sends a visitor without a language to their browser's", () => {
    const response = proxy(request("/", { "accept-language": "ca-ES,ca;q=0.9,en;q=0.8" }));
    expect(response.status).toBe(307);
    expect(new URL(response.headers.get("location")!).pathname).toBe("/ca");
    expect(response.headers.get("vary")).toBe("Accept-Language, Cookie");
    expect(response.headers.get("cache-control")).toBe("private, no-store");
  });

  it("falls back to English", () => {
    const response = proxy(request("/", { "accept-language": "de-DE,fr;q=0.5" }));
    expect(new URL(response.headers.get("location")!).pathname).toBe("/en");
  });

  it("prefers the language the visitor picked before", () => {
    const response = proxy(request("/", { "accept-language": "es", cookie: "lang=ca" }));
    expect(new URL(response.headers.get("location")!).pathname).toBe("/ca");
  });

  it("ignores a cookie that names no language", () => {
    const response = proxy(request("/", { "accept-language": "es", cookie: "lang=xx" }));
    expect(new URL(response.headers.get("location")!).pathname).toBe("/es");
  });

  it("keeps the path and the query", () => {
    const response = proxy(request("/worlds?ref=share", { "accept-language": "es" }));
    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/es/worlds");
    expect(location.search).toBe("?ref=share");
  });

  it("serves a localized page as is and remembers its language", () => {
    const response = proxy(request("/es"));
    expect(response.headers.get("location")).toBeNull();
    const cookie = response.cookies.get("lang");
    expect(cookie?.value).toBe("es");
    expect(cookie?.secure).toBe(true);
    expect(cookie?.maxAge).toBe(60 * 60 * 24 * 365);
  });

  it("sets no cookie when the language is already remembered", () => {
    const response = proxy(request("/es", { cookie: "lang=es" }));
    expect(response.cookies.get("lang")).toBeUndefined();
  });
});
