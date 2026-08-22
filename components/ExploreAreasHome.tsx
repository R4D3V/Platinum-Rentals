import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { AREAS } from "@/components/AreasWeServe";
import { getAllProperties } from "@/lib/data";

const AREA_GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
];

export default async function ExploreAreasHome() {
  const all = await getAllProperties();
  const areasWithCount = AREAS.map((area) => {
    const name = area.name.split(" & ")[0];
    const count = all.filter(
      (p) => p.area === name || area.name.includes(p.area)
    ).length;
    return { ...area, count };
  });

  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10"
      style={{ background: "var(--color-surface-alt)" }}
    >
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
                Locations
              </span>
              <span
                className="inline-flex h-px w-8 shrink-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
            </div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Explore Properties{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), #ff5b71)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                by Area
              </span>
            </h2>
            <p
              className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Get details on properties in the most trending neighbourhoods
              across Greater Kampala.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areasWithCount.map((area, i) => (
            <FadeIn key={area.name} delay={i * 80}>
              <Link href="/properties">
                <div className="surface-raised group overflow-hidden rounded-3xl transition-transform duration-200 hover:scale-[1.02]">
                  {/* Gradient image header with overlay info */}
                  <div
                    className="relative flex h-40 items-end p-5"
                    style={{ background: AREA_GRADIENTS[i % AREA_GRADIENTS.length] }}
                  >
                    {/* Subtle overlay for text readability */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative flex w-full items-end justify-between">
                      <div>
                        <h3 className="text-lg font-extrabold text-white drop-shadow-sm">
                          {area.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-1.5">
                          <MapPin size={12} className="text-white/80" />
                          <span className="text-xs font-medium text-white/80">
                            Kampala, Uganda
                          </span>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                        {area.count} {area.count === 1 ? "Property" : "Properties"}
                      </span>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="flex items-center justify-between p-5">
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Explore rentals in {area.name.split(" & ")[0]}
                    </p>
                    <ArrowRight
                      size={16}
                      className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      style={{ color: "var(--color-accent)" }}
                    />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}

          {/* "Coming soon" card */}
          <FadeIn delay={areasWithCount.length * 80}>
            <div
              className="surface-pressed flex min-h-[212px] flex-col justify-center rounded-3xl p-6 text-center"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <span className="mb-2 text-3xl">📍</span>
              <p className="text-sm font-semibold">More areas coming soon</p>
              <p className="mt-2 text-xs leading-relaxed">
                We&apos;re expanding into additional suburbs and secondary towns.
                Ask us if your neighbourhood isn&apos;t listed.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center justify-center gap-1.5 text-xs font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                Contact Us
                <ArrowRight size={12} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
