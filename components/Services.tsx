import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import FadeIn from "@/components/FadeIn";

export default function Services() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ slug, title, icon: Icon, summary }, i) => (
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
                  {summary}
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
      </div>
    </section>
  );
}
