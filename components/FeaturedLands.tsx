import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import LandCard from "@/components/LandCard";
import { getAllLands } from "@/lib/data";

export default async function FeaturedLands() {
  const all = await getAllLands();
  const featured = all.filter((l) => l.featured).slice(0, 3);
  const shown = featured.length > 0 ? featured : all.slice(0, 3);

  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10"
      style={{ background: "var(--color-surface-alt)" }}
    >
      {/* Decorative left-side vertical accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-1 opacity-30"
        style={{
          background:
            "linear-gradient(180deg, transparent, #2fe0b0 40%, #35c6e8 70%, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-px w-8 shrink-0 rounded-full"
                  style={{ background: "#2fe0b0" }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#2fe0b0" }}
                >
                  Land for Sale
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Featured{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #2fe0b0, #35c6e8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Verified Land
                </span>
              </h2>
              <p
                className="mt-2 max-w-md text-sm leading-relaxed"
                style={{ color: "var(--color-ink-soft)" }}
              >
                Mailo &amp; Freehold titles verified by our legal team — invest
                with confidence across Uganda.
              </p>
            </div>
            <Link
              href="/land"
              className="btn-neu hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold sm:flex"
              style={{ color: "var(--color-ink)" }}
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        {/* Trust badge bar */}
        <FadeIn delay={80}>
          <div className="mb-8 flex flex-wrap gap-3">
            {[
              "Mailo Title Verified",
              "Freehold Available",
              "No Hidden Fees",
              "Legal Due Diligence",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: "rgba(47, 224, 176, 0.1)",
                  color: "#2fe0b0",
                  border: "1px solid rgba(47, 224, 176, 0.25)",
                }}
              >
                <BadgeCheck size={12} />
                {badge}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Land cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((land, i) => (
            <FadeIn key={land.id} delay={i * 100}>
              <LandCard land={land} />
            </FadeIn>
          ))}
        </div>

        {/* Mobile CTA */}
        <FadeIn delay={200}>
          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/land"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#2fe0b0" }}
            >
              View All Land
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        {/* Bottom info banner */}
        <FadeIn delay={300}>
          <div
            className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border p-6 sm:flex-row"
            style={{
              background: "rgba(47, 224, 176, 0.06)",
              borderColor: "rgba(47, 224, 176, 0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(47, 224, 176, 0.12)",
                  border: "1px solid rgba(47, 224, 176, 0.2)",
                }}
              >
                <BadgeCheck size={18} style={{ color: "#2fe0b0" }} />
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--color-ink-soft)" }}>
                All land listings go through our{" "}
                <strong style={{ color: "var(--color-ink)" }}>
                  in-house legal verification
                </strong>{" "}
                before being published.
              </p>
            </div>
            <Link
              href="/how-it-works"
              className="shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{
                background: "rgba(47, 224, 176, 0.15)",
                color: "#2fe0b0",
                border: "1px solid rgba(47, 224, 176, 0.25)",
              }}
            >
              How It Works
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}