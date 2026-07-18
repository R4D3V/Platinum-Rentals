import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function LandlordCta() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-10">
      <FadeIn>
        <div className="glass-dark-panel mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#e2757f" }}
            >
              For Landlords
            </span>
            <h2 className="mt-2 max-w-lg text-2xl font-extrabold text-white sm:text-3xl">
              Whether you own a single unit or a full apartment block, hand it
              to a team that treats it like their own.
            </h2>
          </div>
          <Link
            href="/landlord"
            className="btn-neu-accent flex shrink-0 items-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold text-white"
          >
            List Your Property
            <ArrowRight size={18} />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
