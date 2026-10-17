import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { initPageLocale } from "@/i18n/page-locale";
import { routing } from "@/i18n/routing";
import { shop } from "@/lib/shop";
import "../globals.css";

// next/font downloads the font at build time and serves it ourselves,
// so visitors' browsers never contact Google (better for privacy/GDPR).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

// Pre-render every page once per language at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = await initPageLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: { default: shop.name, template: `%s | ${shop.name}` },
    description: t("description"),
  };
}

// Root layout: shared by the public site and (later) the admin panel.
export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = await initPageLocale(params);

  return (
    <html lang={locale} className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {/* Makes translations available in client components ("use client"). */}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
