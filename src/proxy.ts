import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Runs before every page request: resolves the language from the URL
// (e.g. /tr/contact -> "tr", /contact -> default "nl").
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next.js internals and files with an extension (images, favicon...).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
