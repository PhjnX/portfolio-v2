import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";

/**
 * Picks a locale for a visitor without one in the URL.
 * Order: cookie (last language visited) > Accept-Language > default (vi).
 */
function detectLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (fromCookie && hasLocale(fromCookie)) return fromCookie;

  // e.g. "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7"
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { base } of preferred) {
    if (hasLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const urlLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (urlLocale) {
    // Remember the language in the URL so "/" sends the visitor back to it next time.
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== urlLocale) {
      response.cookies.set(LOCALE_COOKIE, urlLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (favicon, images...)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
