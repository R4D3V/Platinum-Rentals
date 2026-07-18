import FadeIn from "@/components/FadeIn";

const STATS = [
  { value: "5+", label: "Neighbourhoods Covered" },
  { value: "100%", label: "Transparent Reporting" },
  { value: "24hr", label: "Maintenance Response" },
  { value: "0%", label: "Fee If Rent Not Collected" },
];

export default function Stats() {
  return (
    <section className="glass-dark-panel px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 100}>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/60">
                {stat.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
