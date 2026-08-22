import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/data";

export default async function FeaturedProperties() {
  const all = await getAllProperties();
  const featured = all.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
      {/* Decorative accent line */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-full opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 flex items-end justify-between">
            <div>
              {/* Eyebrow label */}
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-px w-8 shrink-0 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-accent)" }}
                >
                  Browse Hot Offers
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Featured{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-accent), #ff5b71)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Rental Properties
                </span>
              </h2>
              <p
                className="mt-2 max-w-md text-sm leading-relaxed"
                style={{ color: "var(--color-ink-soft)" }}
              >
                Handpicked, managed, and ready to move into — across Greater
                Kampala&apos;s best neighbourhoods.
              </p>
            </div>
            <Link
              href="/properties"
              className="btn-neu hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold sm:flex"
              style={{ color: "var(--color-ink)" }}
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property, i) => (
            <FadeIn key={property.id} delay={i * 100}>
              <PropertyCard property={property} />
            </FadeIn>
          ))}
        </div>

        {/* Mobile CTA */}
        <FadeIn delay={200}>
          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/properties"
              className="btn-neu-accent inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
            >
              View All Properties
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        {/* Bottom CTA banner */}
        <FadeIn delay={300}>
          <div
            className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border p-6 sm:flex-row"
            style={{
              background: "var(--glass-bg-soft)",
              borderColor: "var(--glass-border)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="icon-chip flex h-10 w-10 items-center justify-center rounded-xl">
                <Sparkles size={18} style={{ color: "var(--color-accent)" }} />
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--color-ink-soft)" }}>
                New properties added weekly.{" "}
                <strong style={{ color: "var(--color-ink)" }}>
                  Get notified before anyone else.
                </strong>
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-neu-accent shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            >
              Get Alerts
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
