import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { notFound } from "next/navigation";
import { initPageLocale } from "@/i18n/page-locale";
import { isPublicLocale } from "@/i18n/routing";

// Layout for the public website. "(site)" is a route group: it is not part of the URL.
// Pages set their own width, so photo sections can use the full screen width.
export default async function SiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = await initPageLocale(params);
  // Second safety net: src/proxy.ts already redirects /tr/... public pages to Dutch.
  if (!isPublicLocale(locale)) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
