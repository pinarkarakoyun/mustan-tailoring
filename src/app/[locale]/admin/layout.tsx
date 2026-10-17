import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { ADMIN_CLIENT_NAMESPACES, getClientMessages } from "@/i18n/client-messages";
import { initPageLocale } from "@/i18n/page-locale";

// The admin panel must never appear in search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Gives the admin client components (forms) their texts.
// This replaces the public messages from the root layout inside /admin.
export default async function AdminLayout({
  children,
  params,
}: LayoutProps<"/[locale]/admin">) {
  await initPageLocale(params);

  return (
    <NextIntlClientProvider messages={await getClientMessages(ADMIN_CLIENT_NAMESPACES)}>
      {children}
    </NextIntlClientProvider>
  );
}
