import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { shop, shopAddressLine } from "@/lib/shop";

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-6 text-muted">
        <p className="font-semibold text-foreground">{shop.name}</p>
        <p>{shopAddressLine()}</p>
        <p>
          <a href={`tel:${shop.phone}`} className="underline">
            {shop.phoneDisplay}
          </a>
        </p>
        <p>
          <Link href="/privacy" className="underline">
            {t("privacy")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
