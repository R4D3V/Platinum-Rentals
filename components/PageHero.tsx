import FadeIn from "@/components/FadeIn";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="px-4 pb-4 pt-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>
            {eyebrow}
          </span>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-ink-soft)" }}>
              {description}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
