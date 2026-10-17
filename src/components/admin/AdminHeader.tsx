import { useTranslations } from "next-intl";
import { logout } from "@/app/[locale]/admin/actions";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { shop } from "@/lib/shop";

export function AdminHeader() {
  const t = useTranslations("Admin");

  return (
    <header className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/admin" className="flex flex-col leading-tight">
          <span className="text-sm opacity-80">{shop.name}</span>
          <span className="text-xl font-bold">{t("panelName")}</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-surface">
            <LanguageSwitcher />
          </div>
          {/* A form, so logging out works even without JavaScript. */}
          <form action={logout}>
            <button
              type="submit"
              className="min-h-11 rounded-lg border-2 border-primary-foreground px-3 font-semibold hover:bg-primary-hover"
            >
              {t("logout")}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
