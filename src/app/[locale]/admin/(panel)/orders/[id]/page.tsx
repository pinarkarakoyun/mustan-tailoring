import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { DueBadge } from "@/components/admin/DueBadge";
import { MissingFieldChips } from "@/components/admin/MissingFieldChips";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatusTimeline } from "@/components/ui/StatusTimeline";
import { localeNames } from "@/i18n/locale-names";
import { Link } from "@/i18n/navigation";
import { initPageLocale } from "@/i18n/page-locale";
import { requireAdmin } from "@/lib/auth";
import {
  dateOnlyToDate,
  getDueState,
  getMissingFields,
  todayInShop,
} from "@/lib/order-utils";
import { getOrderWithHistory } from "@/lib/orders";
import { formatPhone } from "@/lib/phone";
import { getAllServices } from "@/lib/services";

type Props = PageProps<"/[locale]/admin/orders/[id]">;

// No generateMetadata here: the page title would need the order id, which is only known
// at request time and would block the whole page. The default site title is used instead.

// The order id is only known at request time; loading.tsx shows a placeholder meanwhile.
export default async function OrderDetailPage({ params, searchParams }: Props) {
  const locale = await initPageLocale(params);
  await requireAdmin();
  const { id } = await params;
  // Set by the "new order" form after saving, to show a confirmation.
  const justCreated = (await searchParams).created === "1";

  const result = await getOrderWithHistory(id);
  if (!result) notFound();
  const { order, history } = result;

  const t = await getTranslations("OrderDetail");
  const format = await getFormatter();
  const service = (await getAllServices()).find(
    (candidate) => candidate.id === order.serviceId,
  );
  const missing = getMissingFields(order);

  return (
    <div className="flex flex-col gap-8">
      <Link href="/admin/orders" className="self-start font-semibold text-primary underline">
        ← {t("backToOrders")}
      </Link>

      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">#{order.orderNumber}</h1>
          <StatusBadge status={order.status} />
        </div>
        <p className="text-xl">{order.customerName}</p>
      </header>

      {justCreated && (
        <div role="status" className="flex flex-col gap-1 rounded-xl bg-green-100 p-4 text-green-950">
          <p className="text-lg font-bold">
            ✓ {t("createdTitle", { number: order.orderNumber })}
          </p>
          <p>{t("createdText")}</p>
        </div>
      )}

      {missing.length > 0 && (
        <div className="flex flex-col gap-2 rounded-xl border-2 border-dashed border-amber-500 bg-amber-50 p-4">
          <p className="font-semibold">{t("missingTitle")}</p>
          <MissingFieldChips fields={missing} />
        </div>
      )}

      <DetailSection title={t("customer")}>
        <DetailRow label={t("name")}>{order.customerName}</DetailRow>
        <DetailRow label={t("phone")}>
          <a href={`tel:${order.customerPhone}`} className="font-medium underline">
            {formatPhone(order.customerPhone)}
          </a>
        </DetailRow>
        <DetailRow label={t("language")}>{localeNames[order.customerLanguage]}</DetailRow>
      </DetailSection>

      <DetailSection title={t("order")}>
        <DetailRow label={t("service")} empty={t("notFilled")}>
          {service?.name[locale]}
        </DetailRow>
        <DetailRow label={t("clothingType")} empty={t("notFilled")}>
          {order.clothingType}
        </DetailRow>
        <DetailRow label={t("publicDescription")} empty={t("notFilled")}>
          {order.publicDescription}
        </DetailRow>
        <DetailRow label={t("internalNote")} empty={t("notFilled")}>
          {order.internalNote && (
            <span className="block rounded-lg bg-amber-50 px-3 py-2 whitespace-pre-line">
              {order.internalNote}
            </span>
          )}
        </DetailRow>
        <DetailRow label={t("price")} empty={t("notFilled")}>
          {order.priceCents !== null && format.number(order.priceCents / 100, "price")}
        </DetailRow>
        <DetailRow label={t("estimatedReadyDate")} empty={t("notFilled")}>
          {order.estimatedReadyDate && (
            <span className="flex flex-wrap items-center gap-2">
              {format.dateTime(dateOnlyToDate(order.estimatedReadyDate), "dateLong")}
              <DueBadge state={getDueState(order, todayInShop())} />
            </span>
          )}
        </DetailRow>
        <DetailRow label={t("createdAt")}>
          {format.dateTime(new Date(order.createdAt), "dateTime")}
        </DetailRow>
      </DetailSection>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{t("history")}</h2>
        <StatusTimeline entries={history} />
      </section>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">{title}</h2>
      <dl className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface">
        {children}
      </dl>
    </section>
  );
}

/** One label/value row. Shows `empty` (muted) when there is no value. */
function DetailRow({
  label,
  empty,
  children,
}: {
  label: string;
  empty?: string;
  children: ReactNode;
}) {
  const hasValue = children !== null && children !== undefined && children !== false && children !== "";
  return (
    <div className="flex flex-col gap-1 px-4 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-lg">
        {hasValue ? children : <span className="text-muted italic">{empty}</span>}
      </dd>
    </div>
  );
}
