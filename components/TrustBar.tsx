import { ShieldCheck, Wallet, Building2, Timer } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const FACTS = [
  {
    icon: ShieldCheck,
    title: "Ring-fenced funds",
    detail: "Rent held in a dedicated client account, separate from company funds.",
  },
  {
    icon: Wallet,
    title: "Pay only on rent collected",
    detail: "Our fee is charged only on rent actually received — we earn when you do.",
  },
  {
    icon: Building2,
    title: "Residential & commercial",
    detail: "Individual units to full apartment blocks, across Greater Kampala.",
  },
  {
    icon: Timer,
    title: "Fast turnaround",
    detail: "Maintenance and tenant concerns handled through a vetted vendor network.",
  },
];

export default function TrustBar() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
        {FACTS.map(({ icon: Icon, title, detail }, i) => (
          <FadeIn key={title} delay={i * 100}>
            <div className="surface-raised rounded-2xl p-5">
              <div className="icon-chip mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
                <Icon size={20} style={{ color: "var(--color-accent)" }} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-bold leading-snug">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
                {detail}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
