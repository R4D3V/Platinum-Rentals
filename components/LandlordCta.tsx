import Link from "next/link";
import { ArrowRight, MapPin, Home, Key } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function LandlordCta() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-10">
      <FadeIn>
        <div className="glass-dark-panel mx-auto max-w-6xl overflow-hidden rounded-3xl">
          {/* Top strip of mini-stats */}
          <div
            className="grid grid-cols-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {[
              { label: "Days avg. to tenant", value: "7" },
              { label: "Managed properties", value: "50+" },
              { label: "Fee if not collected", value: "0%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center border-r py-4 last:border-r-0"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span className="text-xl font-extrabold text-white sm:text-2xl">
                  {stat.value}
                </span>
                <span className="mt-0.5 text-center text-[10px] font-medium uppercase tracking-wide text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Main CTA row */}
          <div className="flex flex-col items-start justify-between gap-8 p-8 sm:flex-row sm:items-center sm:p-12">
            <div className="max-w-lg">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#e2757f" }}
              >
                Get Started Today
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Hand your property to a team that treats it like their own —{" "}
                or buy verified land with clear title.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Join the landlords who&apos;ve made the switch to professional,
                transparent property management in Kampala.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-col">
              <Link
                href="/landlord"
                className="btn-neu-accent flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold text-white"
              >
                <Home size={17} />
                List Your Property
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/land"
                className="flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold text-white/90 transition-colors hover:text-white"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <MapPin size={17} />
                Browse Verified Land
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}