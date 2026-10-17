import { getTranslations } from "next-intl/server";
import { HowItWorksSteps } from "@/components/public/HowItWorksSteps";
import { OpeningHoursList } from "@/components/public/OpeningHoursList";
import { ServiceList } from "@/components/public/ServiceList";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/ButtonLink";
import { initPageLocale } from "@/i18n/page-locale";
import { Link } from "@/i18n/navigation";
import { getActiveServices, OTHER_SERVICE_ID } from "@/lib/services";
import { shopAddressLine, shopWhatsAppUrl } from "@/lib/shop";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  await initPageLocale(params);
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const services = (await getActiveServices()).filter(
    (service) => service.id !== OTHER_SERVICE_ID,
  );

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        <p className="text-lg text-muted">{t("intro")}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/track">{tCommon("trackOrder")}</ButtonLink>
          <ExternalButtonLink
            href={shopWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            {tCommon("whatsappUs")}
          </ExternalButtonLink>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{t("servicesTitle")}</h2>
        <ServiceList services={services} />
        <Link href="/services" className="font-semibold text-primary underline">
          {t("allServices")}
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{t("howItWorksTitle")}</h2>
        <HowItWorksSteps />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{t("visitTitle")}</h2>
        <p className="font-medium">{shopAddressLine()}</p>
        <OpeningHoursList />
        <ButtonLink href="/contact" variant="secondary">
          {t("allContactInfo")}
        </ButtonLink>
      </section>
    </div>
  );
}
