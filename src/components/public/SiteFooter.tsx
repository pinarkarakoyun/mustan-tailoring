import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { shop, shopAddressLine, shopMapsUrl, shopWhatsAppUrl } from "@/lib/shop";
import { ShopLogo } from "./ShopLogo";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tContact = useTranslations("Contact");
  const tCommon = useTranslations("Common");

  return (
    <footer className="mt-auto bg-primary text-background">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-5">
          <ShopLogo inverted />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-display text-xl">{t("visit")}</p>
          <p className="text-background/85">{shopAddressLine()}</p>
          <a href={shopMapsUrl()} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
            {tContact("openInMaps")}
          </a>
          <a href={`tel:${shop.phone}`} className="mt-2 text-lg font-semibold">
            {shop.phoneDisplay}
          </a>
          <a
            href={shopWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 font-semibold hover:text-accent"
          >
            <WhatsAppIcon className="size-5" />
            {tCommon("whatsappUs")}
          </a>
        </div>

        <nav aria-label={t("menu")} className="flex flex-col gap-2">
          <p className="font-display text-xl">{t("menu")}</p>
          <Link href="/services" className="text-background/85 hover:text-background">{tNav("services")}</Link>
          <Link href="/how-it-works" className="text-background/85 hover:text-background">{tNav("howItWorks")}</Link>
          <Link href="/contact" className="text-background/85 hover:text-background">{tNav("contact")}</Link>
          <Link href="/privacy" className="text-background/85 hover:text-background">{t("privacy")}</Link>
        </nav>
      </div>
      <div className="border-t border-background/15">
        <p className="mx-auto max-w-5xl px-4 py-5 text-sm text-background/70">© {shop.fullName}</p>
      </div>
    </footer>
  );
}
