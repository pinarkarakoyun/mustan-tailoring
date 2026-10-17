import { useFormatter, useLocale, useTranslations } from "next-intl";
import type { Service } from "@/types/service";

type ServiceListProps = {
  services: Service[];
  showPrices?: boolean;
};

export function ServiceList({ services, showPrices = false }: ServiceListProps) {
  const t = useTranslations("Common");
  const format = useFormatter();
  const locale = useLocale();

  return (
    <ul className="flex flex-col gap-3">
      {services.map((service) => (
        <li
          key={service.id}
          className="flex flex-col gap-1 rounded-xl border border-border bg-surface px-4 py-3"
        >
          <span className="font-semibold">{service.name[locale]}</span>
          {showPrices && (
            <span className="text-muted">
              {service.fromPriceCents === null
                ? t("priceOnRequest")
                : t("priceFrom", {
                    price: format.number(service.fromPriceCents / 100, {
                      style: "currency",
                      currency: "EUR",
                    }),
                  })}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
