import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/public/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");
  const tCommon = useTranslations("Common");

  return (
    <>
      <PageIntro title={t("title")} intro={t("text")} />
      <ButtonLink href="/">{tCommon("backHome")}</ButtonLink>
    </>
  );
}
