import FadeIn from "@/components/FadeIn";

const STATS = [
  { value: "5+", label: "Neighbourhoods Covered", suffix: "" },
  { value: "100", label: "Transparent Reporting", suffix: "%" },
  { value: "24", label: "Maintenance Response", suffix: "hr" },
  { value: "0", label: "Fee If Rent Not Collected", suffix: "%" },
];

export default function Stats() {
  return (
    <section className="glass-dark-panel relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10">
      {/* Decorative radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(190,29,44,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              By The Numbers
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 100}>
              <div className="group text-center">
                {/* Large number */}
                <p className="text-4xl font-black text-white sm:text-5xl lg:text-6xl">
                  {stat.value}
                  <span
                    className="text-2xl font-extrabold sm:text-3xl"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {stat.suffix}
                  </span>
                </p>
                <div
                  className="mx-auto mt-3 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ background: "var(--color-accent)", opacity: 0.6 }}
                />
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
