type PageIntroProps = {
  title: string;
  intro?: string;
};

/** Page title (h1) with an optional short introduction. */
export function PageIntro({ title, intro }: PageIntroProps) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <h1 className="text-3xl font-bold">{title}</h1>
      {intro && <p className="text-lg text-muted">{intro}</p>}
    </div>
  );
}
