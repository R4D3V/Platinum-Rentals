import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { SERVICES } from "@/lib/services";

export default function ServicesShowcase() {
  const featured = SERVICES.slice(0, 4);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
      {/* Decorative right-side vertical accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-1 opacity-30"
        style={{
          background:
            "linear-gradient(180deg, transparent, #35c6e8 40%, #2fe0b0 70%, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-px w-8 shrink-0 rounded-full"
                  style={{ background: "#35c6e8" }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#35c6e8" }}
                >
                  What We Do
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Our{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #2fe0b0, #35c6e8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Services
                </span>
              </h2>
              <p
                className="mt-2 max-w-md text-sm leading-relaxed"
                style={{ color: "var(--color-ink-soft)" }}
              >
                Full-service property management — from tenant screening to
                rent collection and verified land transactions.
              </p>
            </div>
            <Link
              href="/services"
              className="btn-neu hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold sm:flex"
              style={{ color: "var(--color-ink)" }}
            >
              All Services
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(({ slug, title, icon: Icon, tagline }, i) => (
            <FadeIn key={slug} delay={i * 80}>
              <Link
                href={`/services/${slug}`}
                className="btn-neu group flex flex-col rounded-2xl p-6 text-left"
              >
                <div className="icon-chip mb-5 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Icon size={22} style={{ color: "var(--color-accent)" }} strokeWidth={1.9} />
                </div>
                <h3 className="text-[15px] font-bold leading-snug">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
                  {tagline}
                </p>
                <span
                  className="mt-4 flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: "var(--color-accent)" }}
                >
                  Learn more
                  <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Mobile-only link since header button is hidden on small screens */}
        <FadeIn delay={320}>
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/services"
              className="btn-neu flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ color: "var(--color-ink)" }}
            >
              View All Services
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
