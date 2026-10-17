import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { SESSION_COOKIE, verifySessionToken } from "./lib/session";

// Resolves the language from the URL (e.g. /tr/contact -> "tr", /contact -> default "nl").
const handleI18nRouting = createMiddleware(routing);

// Matches "/admin..." with an optional language prefix, e.g. "/tr/admin/orders".
const ADMIN_PATH = new RegExp(
  `^(/(?:${routing.locales.join("|")}))?/admin(/.*)?$`,
);

// Runs before every page request.
export default async function proxy(request: NextRequest) {
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

  return handleI18nRouting(request);
}

export const config = {
  // Skip API routes, Next.js internals and files with an extension (images, favicon...).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
