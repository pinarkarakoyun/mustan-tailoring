import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { NOT_FOUND_LOCALE_HEADER } from "./i18n/not-found-locale";
import { isPublicLocale, routing } from "./i18n/routing";
import { isOrderTrackingEnabled } from "./lib/features";
import { SESSION_COOKIE, verifySessionToken } from "./lib/session";

// Resolves the language from the URL (e.g. /en/contact -> "en", /contact -> default "nl").
const handleI18nRouting = createMiddleware(routing);

const LOCALE_PREFIX = `(/(?:${routing.locales.join("|")}))?`;

// Matches "/admin..." with an optional language prefix, e.g. "/tr/admin/orders".
const ADMIN_PATH = new RegExp(`^${LOCALE_PREFIX}/admin(/.*)?$`);

// Everything of the order module: the admin panel and the customer tracking pages.
const ORDER_MODULE_PATH = new RegExp(`^${LOCALE_PREFIX}/(?:admin|track)(?:/.*)?$`);

// Folders starting with "_" are private in Next.js, so no page can ever live here.
const MISSING_PAGE = "/_order-module-disabled";

// A language prefix the public website does not offer, e.g. "/tr/contact" -> "tr".
const NON_PUBLIC_LOCALE_PATH = new RegExp(
  `^/(${routing.locales.filter((locale) => !isPublicLocale(locale)).join("|")})(/.*)?$`,
);

// Runs before every page request.
export default async function proxy(request: NextRequest) {
  // The public website is only in Dutch and English. Old Turkish links
  // (/tr/contact, /tr/track/<token> from earlier QR codes) go to the Dutch page.
  // The admin panel stays available in Turkish (/tr/admin).
  const nonPublicMatch = request.nextUrl.pathname.match(NON_PUBLIC_LOCALE_PATH);
  if (nonPublicMatch && !ADMIN_PATH.test(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = nonPublicMatch[2] ?? "/";
    // 307 (temporary), not 308: browsers would remember a permanent redirect forever.
    return NextResponse.redirect(url, 307);
  }

  const moduleMatch = request.nextUrl.pathname.match(ORDER_MODULE_PATH);
  if (moduleMatch && !isOrderTrackingEnabled()) {
    return showNotFound(request, moduleMatch[1]);
  }

  const match = request.nextUrl.pathname.match(ADMIN_PATH);

  if (match) {
    const localePrefix = match[1] ?? "";
    const isLoginPage = match[2] === "/login";
    const isSignedIn = await verifySessionToken(
      request.cookies.get(SESSION_COOKIE)?.value,
    );

    // Fast first check. Admin data is checked again on the server (requireAdmin).
    if (!isSignedIn && !isLoginPage) {
      return NextResponse.redirect(
        new URL(`${localePrefix}/admin/login`, request.url),
      );
    }
    if (isSignedIn && isLoginPage) {
      return NextResponse.redirect(new URL(`${localePrefix}/admin`, request.url));
    }
  }

  return withoutNonPublicAlternates(handleI18nRouting(request));
}

/**
 * next-intl tells search engines about every language version of a page in the
 * "Link" header (hreflang). Remove the Turkish entries: the public site has no
 * Turkish pages, and Google should not index the redirecting /tr/... addresses.
 */
function withoutNonPublicAlternates(response: NextResponse): NextResponse {
  const link = response.headers.get("link");
  if (!link) return response;

  const entries = link
    .split(/,\s*(?=<)/)
    .filter((entry) => {
      const hreflang = entry.match(/hreflang="([^"]+)"/)?.[1];
      return !hreflang || hreflang === "x-default" || isPublicLocale(hreflang);
    });
  response.headers.set("link", entries.join(", "));
  return response;
}

/**
 * Order module turned off: answer with the translated 404 page.
 * The request is rewritten (not redirected) to a path that has no page, so the
 * visitor gets a real 404 and the address bar keeps what they typed.
 * The language goes along in a header, because the 404 page has no URL parameters.
 */
function showNotFound(request: NextRequest, localePrefix: string | undefined) {
  const locale = localePrefix ? localePrefix.slice(1) : routing.defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${MISSING_PAGE}`;

  const headers = new Headers(request.headers);
  headers.set(NOT_FOUND_LOCALE_HEADER, locale);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip API routes, Next.js internals and files with an extension (images, favicon...).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
