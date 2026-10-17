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
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="reveal flex flex-col gap-3 rounded-2xl bg-surface p-6 ring-1 ring-border">
          <span aria-hidden="true" className="font-display text-5xl leading-none text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-xl font-semibold">{t(step.title)}</p>
          <p className="text-muted">{t(step.text)}</p>
        </li>
      ))}
    </ol>
  );
}
