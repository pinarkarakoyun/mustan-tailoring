import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { shop } from "@/lib/shop";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { NavLink } from "@/components/ui/NavLink";

export function SiteHeader() {
  const t = useTranslations("Nav");

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-xl font-bold text-primary">
            {shop.name}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* No hamburger menu: four links fit and stay visible, which is easier for older users. */}
        <nav aria-label={t("mainMenu")}>
          <ul className="-mx-3 flex flex-wrap">
            <li>
              <NavLink href="/">{t("home")}</NavLink>
            </li>
            <li>
              <NavLink href="/services">{t("services")}</NavLink>
            </li>
            <li>
              <NavLink href="/how-it-works">{t("howItWorks")}</NavLink>
            </li>
            <li>
              <NavLink href="/contact">{t("contact")}</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
