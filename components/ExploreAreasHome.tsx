import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { AREAS } from "@/components/AreasWeServe";
import { SAMPLE_PROPERTIES } from "@/lib/data";

export default function ExploreAreasHome() {
  const areasWithCount = AREAS.map((area) => {
    const name = area.name.split(" & ")[0];
    const count = SAMPLE_PROPERTIES.filter(
      (p) => p.area === name || area.name.includes(p.area)
    ).length;
    return { ...area, count };
  });

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10" style={{ background: "var(--color-surface-alt)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Locations
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Explore Properties by Area
            </h2>
            <p
              className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Get details on properties in the most trending neighbourhoods across Greater Kampala.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areasWithCount.map((area, i) => (
            <FadeIn key={area.name} delay={i * 80}>
              <Link href="/properties">
                <div className="surface-raised group overflow-hidden rounded-3xl transition-transform duration-200 hover:scale-[1.02]">
                  <div
                    className="flex h-32 items-end p-6"
                    style={{ background: area.mapQuery.includes("Kololo") || area.mapQuery.includes("Nakasero")
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : area.mapQuery.includes("Muyenga") || area.mapQuery.includes("Naguru")
                        ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                        : area.mapQuery.includes("Ntinda") || area.mapQuery.includes("Bukoto")
                          ? "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                          : area.mapQuery.includes("Kisaasi") || area.mapQuery.includes("Kiwatule")
                            ? "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
                            : "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                    }}
                  >
                    <div>
                      <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                        {area.count} Propert{area.count === 1 ? "y" : "ies"}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold">{area.name}</h3>
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-0.5"
                        style={{ color: "var(--color-accent)" }}
                      />
                    </div>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
                      Explore properties in {area.name}
                    </p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
