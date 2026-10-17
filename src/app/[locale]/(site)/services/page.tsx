import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/public/PageIntro";
import { ServiceList } from "@/components/public/ServiceList";
import { ExternalButtonLink } from "@/components/ui/ButtonLink";
import { initPageLocale } from "@/i18n/page-locale";
import { getActiveServices, OTHER_SERVICE_ID } from "@/lib/services";
import { shopWhatsAppUrl } from "@/lib/shop";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = await initPageLocale(params);
  const t = await getTranslations({ locale, namespace: "Services" });
  return { title: t("title") };
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  await initPageLocale(params);
  const t = await getTranslations("Services");
  const tCommon = await getTranslations("Common");
  const services = (await getActiveServices()).filter(
    (service) => service.id !== OTHER_SERVICE_ID,
  );

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />
      <ServiceList services={services} showPrices />

      <section className="mt-10 flex flex-col gap-3 rounded-xl bg-surface p-5">
        <h2 className="text-xl font-bold">{t("otherTitle")}</h2>
        <p className="text-muted">{t("otherText")}</p>
        <ExternalButtonLink
          href={shopWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tCommon("whatsappUs")}
        </ExternalButtonLink>
      </section>
    </>
  );
}
