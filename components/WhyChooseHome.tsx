import Link from "next/link";
import { ShieldCheck, FileBarChart, Wallet, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Well Renowned in Kampala",
    detail:
      "Platinum Rentals has earned a solid reputation as a trusted property management company, providing professional services and fully integrated landlord solutions.",
  },
  {
    icon: FileBarChart,
    title: "Years of Experience",
    detail:
      "Having an excellent understanding of clients' needs, our property management services are tailored to match each landlord's requirements.",
  },
  {
    icon: Wallet,
    title: "Customer Satisfaction",
    detail:
      "We believe that our client's satisfaction is a continuous stream to be nurtured. Our job doesn't end when a deal is completed — it starts again with another dimension of service.",
  },
];

export default function WhyChooseHome() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Why Choose Our Properties
            </h2>
            <Link
              href="/why-us"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              Click here to find out more about us
              <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, detail }, i) => (
            <FadeIn key={title} delay={i * 100}>
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
  );
}
