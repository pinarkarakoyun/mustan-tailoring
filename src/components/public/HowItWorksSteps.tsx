import { useTranslations } from "next-intl";

const steps = [
  { title: "step1Title", text: "step1Text" },
  { title: "step2Title", text: "step2Text" },
  { title: "step3Title", text: "step3Text" },
  { title: "step4Title", text: "step4Text" },
] as const;

export function HowItWorksSteps() {
  const t = useTranslations("HowItWorks");

  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
          >
            {index + 1}
          </span>
          <div>
            <p className="font-semibold">{t(step.title)}</p>
            <p className="text-muted">{t(step.text)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
