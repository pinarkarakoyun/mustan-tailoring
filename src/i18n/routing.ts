import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All languages of the app. Turkish is only used in the admin panel; the public
  // website and everything sent to customers is Dutch or English (see publicLocales).
  // To drop a language completely, remove it here and from publicLocales,
  // and delete its file in /messages.
  locales: ["nl", "tr", "en"],
  defaultLocale: "nl",
  // Dutch URLs have no prefix (/contact); others do (/en/contact).
  localePrefix: "as-needed",
  // Always start in Dutch instead of guessing from browser settings,
  // so the shop staff and customers get a predictable experience.
  localeDetection: false,
  // No language cookie: the language always comes from the URL, so a cookie would
  // store something we never read. Fewer cookies = simpler privacy (no consent needed).
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];

/** Languages of the public website and of customers (tracking page, WhatsApp messages). */
export const publicLocales = ["nl", "en"] as const satisfies readonly Locale[];

export type PublicLocale = (typeof publicLocales)[number];

export function isPublicLocale(locale: string): locale is PublicLocale {
  return (publicLocales as readonly string[]).includes(locale);
}

