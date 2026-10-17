import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/public/PageIntro";
import { initPageLocale } from "@/i18n/page-locale";
import { shop } from "@/lib/shop";

const sections = [
  { title: "collectTitle", text: "collectText" },
  { title: "purposeTitle", text: "purposeText" },
  { title: "trackingTitle", text: "trackingText" },
  { title: "rightsTitle", text: "rightsText" },
] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const locale = await initPageLocale(params);
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
  await initPageLocale(params);
  const t = await getTranslations("Privacy");

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{t(section.title)}</h2>
            <p>{t(section.text)}</p>
          </section>
        ))}
        <p className="text-muted">
          {shop.name} · {shop.email}
        </p>
      </div>
    </>
  );
}
