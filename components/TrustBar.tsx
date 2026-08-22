import { ShieldCheck, Wallet, Building2, Timer, CheckCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const FACTS = [
  {
    icon: ShieldCheck,
    title: "Ring-fenced Funds",
    detail: "Rent held in a dedicated client account, separate from company funds.",
    color: "#7c6bf0",
  },
  {
    icon: Wallet,
    title: "Pay Only on Rent Collected",
    detail: "Our fee is charged only on rent actually received — we earn when you do.",
    color: "#35c6e8",
  },
  {
    icon: Building2,
    title: "Residential & Commercial",
    detail: "Individual units to full apartment blocks, across Greater Kampala.",
    color: "#ff5f9e",
  },
  {
    icon: Timer,
    title: "24hr Fast Turnaround",
    detail: "Maintenance and tenant concerns handled through a vetted vendor network.",
    color: "#2fe0b0",
  },
];

export default function TrustBar() {
  return (
    <section className="px-4 pb-4 pt-2 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {FACTS.map(({ icon: Icon, title, detail, color }, i) => (
            <FadeIn key={title} delay={i * 80}>
              <div
                className="surface-raised group relative overflow-hidden rounded-2xl p-5 transition-transform duration-200 hover:scale-[1.02]"
              >
                {/* Subtle color wash */}
                <div
                  aria-hidden="true"
                  className="absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                  style={{ background: color }}
                />
                <div
                  className="icon-chip mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ borderColor: `${color}30` }}
                >
                  <Icon size={20} style={{ color }} strokeWidth={2} />
                </div>
                <h3 className="text-sm font-bold leading-snug">{title}</h3>
                <p
                  className="mt-1.5 text-xs leading-relaxed"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  {detail}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
