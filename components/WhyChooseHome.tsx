import Link from "next/link";
import { ShieldCheck, FileBarChart, Wallet, ArrowRight, Star } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const REASONS = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Well Renowned in Kampala",
    detail:
      "Ninety Nine Property Consultants has earned a solid reputation as a trusted property consultancy, providing professional rental management services, verified land sales, and fully integrated landlord solutions.",
    color: "#7c6bf0",
  },
  {
    icon: FileBarChart,
    number: "02",
    title: "Years of Experience",
    detail:
      "Having an excellent understanding of clients' needs, our property management services are tailored to match each landlord's requirements.",
    color: "var(--color-accent)",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Customer Satisfaction",
    detail:
      "We believe that our client's satisfaction is a continuous stream to be nurtured. Our job doesn't end when a deal is completed — it starts again with another dimension of service.",
    color: "#2fe0b0",
  },
];

export default function WhyChooseHome() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span
                className="inline-flex h-px w-8 shrink-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                Why Choose Us
              </span>
              <span
                className="inline-flex h-px w-8 shrink-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
            </div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              The Smarter Way to{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), #ff5b71)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Manage Property
              </span>
            </h2>
            <p
              className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--color-ink-soft)" }}
            >
              We combine local expertise with professional systems so your
              investment works harder — and you worry less.
            </p>
            <Link
              href="/why-us"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              Find out more about us
              <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, number, title, detail, color }, i) => (
            <FadeIn key={title} delay={i * 120}>
              <div className="surface-raised group relative overflow-hidden rounded-3xl p-7 transition-transform duration-200 hover:scale-[1.02]">
                {/* Number watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-2 select-none text-7xl font-black opacity-[0.04]"
                  style={{ color }}
                >
                  {number}
                </span>

                {/* Icon */}
                <div
                  className="icon-chip mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ borderColor: `${color}30` }}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.9}
                    style={{ color }}
                  />
                </div>

                {/* Step label */}
                <span
                  className="mb-2 block text-[10px] font-bold uppercase tracking-widest"
                  style={{ color }}
                >
                  Step {number}
                </span>

                <h3 className="text-[15px] font-bold leading-snug">{title}</h3>
                <p
                  className="mt-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  {detail}
                </p>

                {/* Bottom subtle separator */}
                <div
                  className="mt-5 h-0.5 w-10 rounded-full"
                  style={{ background: color, opacity: 0.3 }}
                />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Social proof strip */}
        <FadeIn delay={300}>
          <div
            className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl p-6 sm:flex-row"
            style={{
              background: "var(--glass-bg-soft)",
              border: "1px solid var(--glass-border-soft)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["SK", "DM", "GN", "JO"].map((initials) => (
                  <div
                    key={initials}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-[10px] font-black text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-accent), #ff5b71)",
                      borderColor: "var(--color-surface)",
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      fill="var(--color-accent)"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  Trusted by{" "}
                  <strong style={{ color: "var(--color-ink)" }}>
                    50+ landlords
                  </strong>{" "}
                  across Kampala
                </p>
              </div>
            </div>
            <Link
              href="/landlord"
              className="btn-neu-accent shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            >
              List Your Property
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
