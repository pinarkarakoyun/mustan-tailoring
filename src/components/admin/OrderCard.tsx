import { useFormatter, useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  dateOnlyToDate,
  getDueState,
  getMissingFields,
} from "@/lib/order-utils";
import type { Order } from "@/types/order";
import type { Service } from "@/types/service";

type OrderCardProps = {
  order: Order;
  service: Service | undefined;
  /** Today's date in the shop ("YYYY-MM-DD"), to show late orders. */
  today: string;
  showMissing?: boolean;
};

export function OrderCard({
  order,
  service,
  today,
  showMissing = false,
}: OrderCardProps) {
  const t = useTranslations("OrderCard");
  const tMissing = useTranslations("MissingField");
  const format = useFormatter();
  const locale = useLocale();

  const dueState = getDueState(order, today);
  const missing = showMissing ? getMissingFields(order) : [];

  return (
    <article className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-lg font-bold">
          #{order.orderNumber} · {order.customerName}
        </p>
        <StatusBadge status={order.status} />
      </div>

      <p className="text-muted">
        {service ? service.name[locale] : t("noService")}
        {order.clothingType && ` · ${order.clothingType}`}
      </p>

      <p className="flex flex-wrap items-center gap-2">
        <span>
          {order.estimatedReadyDate
            ? t("readyBy", {
                date: format.dateTime(dateOnlyToDate(order.estimatedReadyDate), {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                }),
              })
            : t("noDate")}
        </span>
        {dueState && (
          <span
            className={`rounded-full px-2 py-0.5 text-sm font-bold ${
              dueState === "overdue"
                ? "bg-red-700 text-white"
                : "bg-amber-200 text-amber-950"
            }`}
          >
            {t(dueState)}
          </span>
        )}
      </p>

      {missing.length > 0 && (
        <p className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">{t("missing")}</span>
          {missing.map((field) => (
            <span
              key={field}
              className="rounded-full border border-dashed border-muted px-2 py-0.5 text-sm"
            >
              {tMissing(field)}
            </span>
          ))}
        </p>
      )}
    </article>
  );
}
