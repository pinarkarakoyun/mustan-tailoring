import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { PageIntro } from "@/components/public/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "404",
};

// Rendered on each request (not pre-rendered), because the language is only
// known from the requested URL. Fine for a small, rarely visited page.
export const instant = false;

// Shown for URLs that match no page at all (e.g. /tr/abc).
// It bypasses all layouts, so it renders its own <html> and site header.
export default async function GlobalNotFound() {
  // The language comes from the URL prefix, resolved by src/proxy.ts.
  const locale = await getLocale();
  const t = await getTranslations("NotFound");
  const tCommon = await getTranslations("Common");

  return (
    <html lang={locale} className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
            <PageIntro title={t("title")} intro={t("text")} />
            <ButtonLink href="/">{tCommon("backHome")}</ButtonLink>
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
