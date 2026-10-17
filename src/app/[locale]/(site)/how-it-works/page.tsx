import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HowItWorksSteps } from "@/components/public/HowItWorksSteps";
import { PageIntro } from "@/components/public/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { initPageLocale } from "@/i18n/page-locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/how-it-works">): Promise<Metadata> {
  const locale = await initPageLocale(params);
  const t = await getTranslations({ locale, namespace: "HowItWorks" });
  return { title: t("title") };
}

export default async function HowItWorksPage({
  params,
}: PageProps<"/[locale]/how-it-works">) {
  await initPageLocale(params);
  const t = await getTranslations("HowItWorks");
  const tCommon = await getTranslations("Common");

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />
      <HowItWorksSteps />
      <ButtonLink href="/track" className="mt-10 w-full sm:w-auto">
        {tCommon("trackOrder")}
      </ButtonLink>
    </>
  );
}
