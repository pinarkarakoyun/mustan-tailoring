import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { OpeningHoursList } from "@/components/public/OpeningHoursList";
import { PageIntro } from "@/components/public/PageIntro";
import { ExternalButtonLink } from "@/components/ui/ButtonLink";
import { initPageLocale } from "@/i18n/page-locale";
import { shop, shopAddressLine, shopMapsUrl, shopWhatsAppUrl } from "@/lib/shop";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = await initPageLocale(params);
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  await initPageLocale(params);
  const t = await getTranslations("Contact");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <PageIntro title={t("title")} />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <ExternalButtonLink href={`tel:${shop.phone}`}>
            {tCommon("callUs")}
          </ExternalButtonLink>
          <ExternalButtonLink
            href={shopWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            {tCommon("whatsappUs")}
          </ExternalButtonLink>
        </div>

        <dl className="flex flex-col gap-5">
          <div>
            <dt className="text-muted">{t("address")}</dt>
            <dd className="font-medium">
              {shopAddressLine()}
              <br />
              {/* A link instead of an embedded map: no third-party cookies, no consent banner needed. */}
              <a
                href={shopMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {t("openInMaps")}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">{t("phone")}</dt>
            <dd>
              <a href={`tel:${shop.phone}`} className="font-medium underline">
                {shop.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">{t("email")}</dt>
            <dd>
              <a href={`mailto:${shop.email}`} className="font-medium underline">
                {shop.email}
              </a>
            </dd>
          </div>
        </dl>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{t("openingHours")}</h2>
          <OpeningHoursList />
        </section>
      </div>
    </>
  );
}
