import { MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const AREAS = [
  {
    name: "Kololo & Nakasero",
    description:
      "Kampala's premium diplomatic and business district — high-end apartments, embassy residences, and executive housing. Strong demand from corporate tenants and NGOs.",
    mapQuery: "Kololo, Kampala, Uganda",
  },
  {
    name: "Naguru & Muyenga",
    description:
      "Established residential hills with a mix of standalone houses and modern apartment blocks, popular with expatriate and diaspora tenants for their views and quieter setting.",
    mapQuery: "Muyenga, Kampala, Uganda",
  },
  {
    name: "Ntinda & Bukoto",
    description:
      "A fast-growing middle-income corridor with newer apartment developments, good road access, and steady rental demand from young professionals.",
    mapQuery: "Ntinda, Kampala, Uganda",
  },
  {
    name: "Kisaasi & Kiwatule",
    description:
      "Popular with families and long-term tenants, offering a balance of standalone homes and gated compounds within reach of the city centre.",
    mapQuery: "Kisaasi, Kampala, Uganda",
  },
  {
    name: "Kira & Najjera",
    description:
      "Kampala's expanding suburban edge — newer construction, larger plots, and increasing interest from landlords building purpose-built rental units.",
    mapQuery: "Kira, Uganda",
  },
];

export default function AreasWeServe() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-accent)" }}
          >
            Coverage
          </span>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Areas We Serve
          </h2>
          <p
            className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--color-ink-soft)" }}
          >
            We currently manage properties across these Kampala neighbourhoods, with plans to expand into additional suburbs and secondary towns as our portfolio grows.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area, i) => (
            <FadeIn key={area.name} delay={i * 80}>
              <div className="surface-raised flex flex-col rounded-2xl p-6">
                <div className="icon-chip mb-4 flex h-11 w-11 items-center justify-center rounded-2xl">
                  <MapPin size={20} strokeWidth={1.9} style={{ color: "var(--color-accent)" }} />
                </div>
                <h3 className="text-[15px] font-bold leading-snug">{area.name}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
                  {area.description}
                </p>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={AREAS.length * 80}>
            <div className="surface-pressed flex flex-col justify-center rounded-2xl p-6" style={{ color: "var(--color-ink-faint)" }}>
              <p className="text-sm font-semibold">More suburbs coming soon</p>
              <p className="mt-2 text-sm leading-relaxed">
                We're expanding into additional Kampala suburbs and secondary towns as our portfolio grows.
                Ask us if your neighbourhood isn't listed yet.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <div className="surface-raised-lg mt-10 overflow-hidden rounded-3xl">
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-bold">Greater Kampala Coverage Map</h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-ink-faint)" }}>
                An overview of the metropolitan area we currently operate in.
              </p>
            </div>
            <iframe
              title="Platinum Rentals coverage area — Greater Kampala"
              src="https://www.google.com/maps?q=Kampala,Uganda&z=11&output=embed"
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
