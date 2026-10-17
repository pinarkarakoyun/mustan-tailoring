import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { initPageLocale } from "@/i18n/page-locale";

// Layout for the public website. "(site)" is a route group: it is not part of the URL.
export default async function SiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  await initPageLocale(params);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
