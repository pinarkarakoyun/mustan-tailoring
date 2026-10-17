import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { OpeningHoursList } from "@/components/public/OpeningHoursList";
import { ExternalButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatusTimeline } from "@/components/ui/StatusTimeline";
import { initPageLocale } from "@/i18n/page-locale";
import { dateOnlyToDate, isOpen } from "@/lib/order-utils";
import { getPublicOrderByToken } from "@/lib/orders";
import { getAllServices } from "@/lib/services";
import { shop, shopAddressLine, shopMapsUrl, shopWhatsAppUrl } from "@/lib/shop";

type Props = PageProps<"/[locale]/track/[token]">;

// Render on each request and wait for the order before showing the content,
// instead of a loading skeleton (the page is small and fast).
// An unknown token shows the translated "not found" page (marked noindex).
export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await initPageLocale(params);
  const t = await getTranslations({ locale, namespace: "Tracking" });
  return {
    title: t("title"),
    // Private page: keep it out of search engines.
    robots: { index: false, follow: false },
    // Do not send this URL (with the secret token) to other sites when a link is clicked.
    referrer: "no-referrer",
  };
}

export default async function TrackingPage({ params }: Props) {
  const locale = await initPageLocale(params);
  const { token } = await params;

  // Only safe, public fields come back (see getPublicOrderByToken).
  const order = await getPublicOrderByToken(token);
  if (!order) notFound();

  const t = await getTranslations("Tracking");
  const tCommon = await getTranslations("Common");
  const tContact = await getTranslations("Contact");
  const format = await getFormatter();
  const service = (await getAllServices()).find((item) => item.id === order.serviceId);
  // The expected date only matters while the work is not finished.
  const readyDate = isOpen(order.status) ? order.estimatedReadyDate : null;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <p className="text-lg font-semibold text-muted">
          {t("orderNumber", { number: order.orderNumber })}
        </p>
        <h1 className="text-3xl font-bold">{t("greeting", { name: order.firstName })}</h1>
      </header>

      <section
        aria-label={t("currentStatus")}
        className="flex flex-col gap-3 rounded-2xl border-2 border-primary bg-surface p-5"
      >
        <div>
          <StatusBadge status={order.status} />
        </div>
        <p className="text-xl font-semibold">{t(order.status)}</p>
        {readyDate && (
          <p className="text-lg">
            {t("expectedReady")}:{" "}
            <strong>{format.dateTime(dateOnlyToDate(readyDate), "dateLong")}</strong>
          </p>
        )}
      </section>

      {(service || order.publicDescription) && (
        <Section title={t("work")}>
          {service && <p className="text-lg font-semibold">{service.name[locale]}</p>}
          {order.publicDescription && <p className="text-lg">{order.publicDescription}</p>}
        </Section>
      )}

      <Section title={t("timeline")}>
        <StatusTimeline entries={order.timeline} />
      </Section>

      <Section title={t("pickupTitle")}>
        <p>{t("pickupText")}</p>
        <p className="font-medium">
          {shop.name}
          <br />
          {shopAddressLine()}
          <br />
          <a href={shopMapsUrl()} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            {tContact("openInMaps")}
          </a>
        </p>
        <h3 className="mt-2 font-bold">{tContact("openingHours")}</h3>
        <OpeningHoursList />
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <ExternalButtonLink href={`tel:${shop.phone}`}>{tCommon("callUs")}</ExternalButtonLink>
          <ExternalButtonLink
            href={shopWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            {tCommon("whatsappUs")}
          </ExternalButtonLink>
        </div>
      </Section>

      <p className="text-sm text-muted">{t("privacyNote")}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
