import Image from "next/image";
import {
  Check,
  ShieldCheck,
  FileBarChart,
  Wallet,
  Wrench,
  Smartphone,
  Globe,
  X,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Ring-fenced client account",
    detail:
      "Rent is held in a dedicated client account, separate from Platinum Rentals' own operating funds — your money is never mixed with company cash flow.",
  },
  {
    icon: FileBarChart,
    title: "Transparent, itemised statements",
    detail:
      "Every month you receive a clear breakdown of rent collected and any costs deducted — no vague summaries, no hidden charges, ever.",
  },
  {
    icon: Wallet,
    title: "We only earn when you do",
    detail:
      "Our management fee is charged only on rent actually collected. If a unit sits vacant or a tenant defaults, we don't get paid on it either.",
  },
  {
    icon: Wrench,
    title: "Fast maintenance turnaround",
    detail:
      "A pre-vetted, negotiated-rate network of plumbers, electricians, and contractors means repairs get handled quickly, at a controlled cost.",
  },
  {
    icon: Smartphone,
    title: "Mobile-money-first collection",
    detail:
      "Tenants pay the way they actually transact day to day, which reduces missed and delayed payments compared to cash-only arrangements.",
  },
  {
    icon: Globe,
    title: "Built for diaspora landlords",
    detail:
      "Digital, remote-friendly reporting means owners based outside Uganda stay fully informed without needing to be physically present.",
  },
];

const COMPARISON = [
  { label: "Written management agreement", caretaker: false, platinum: true },
  { label: "Rent held in a separate client account", caretaker: false, platinum: true },
  { label: "Itemised monthly statement", caretaker: false, platinum: true },
  { label: "Documented move-in / move-out condition", caretaker: false, platinum: true },
  { label: "Vetted maintenance network with cost oversight", caretaker: false, platinum: true },
  { label: "Structured arrears follow-up process", caretaker: false, platinum: true },
];

export default function WhyChooseUs() {
  return (
    <>
      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <FadeIn direction="left">
            <div className="surface-raised-lg relative flex items-center justify-center rounded-3xl p-10 sm:p-14">
              <Image
                src="/icon-mark.png"
                alt="Platinum Rentals mark"
                width={280}
                height={200}
                className="h-auto w-40 opacity-90 sm:w-56"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={150}>
            <div>
              <p className="max-w-lg text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                Most Ugandan landlords choose between managing property themselves or trusting an
                informal caretaker with little accountability. Platinum Rentals is the third option:
                a dedicated team, documented processes, and digital reporting, without the overhead
                of building an in-house management function.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map(({ icon: Icon, title, detail }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="surface-raised rounded-2xl p-6">
                  <div className="icon-chip mb-5 flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Icon size={22} strokeWidth={1.9} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <h3 className="text-[15px] font-bold leading-snug">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
                    {detail}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-8 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>
                The Difference
              </span>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Informal caretaker vs. Platinum Rentals
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="surface-raised overflow-hidden rounded-3xl">
              <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-2 border-b p-5 text-xs font-semibold uppercase tracking-wide sm:p-6" style={{ borderColor: "var(--color-shadow-dark)", color: "var(--color-ink-faint)" }}>
                <span />
                <span className="text-center">Caretaker</span>
                <span className="text-center" style={{ color: "var(--color-accent)" }}>Platinum Rentals</span>
              </div>
              {COMPARISON.map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-2 p-5 text-sm sm:p-6"
                  style={i !== COMPARISON.length - 1 ? { borderBottom: "1px solid var(--color-shadow-dark)" } : undefined}
                >
                  <span className="font-medium">{row.label}</span>
                  <span className="flex justify-center">
                    {row.caretaker ? (
                      <Check size={16} style={{ color: "var(--color-ink-faint)" }} />
                    ) : (
                      <X size={16} style={{ color: "var(--color-ink-faint)" }} />
                    )}
                  </span>
                  <span className="flex justify-center">
                    <span className="icon-chip flex h-7 w-7 items-center justify-center rounded-lg">
                      <Check size={14} strokeWidth={3} style={{ color: "var(--color-accent)" }} />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
