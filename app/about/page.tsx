import Image from "next/image";
import Link from "next/link";
import { Eye, Target, ShieldCheck, Clock, Users, Scale, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import LandlordCta from "@/components/LandlordCta";
import FadeIn from "@/components/FadeIn";
import { FOUNDERS } from "@/lib/founders";

const STATS = [
  { label: "Founded", value: "2026" },
  { label: "Headquarters", value: "Kampala, Uganda" },
  { label: "Coverage", value: "Greater Kampala" },
  { label: "Focus", value: "Residential & Commercial" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    detail: "Honest rent accounting and transparent reporting to every landlord.",
  },
  {
    icon: Clock,
    title: "Reliability",
    detail: "Rent collected and remitted on time, every time.",
  },
  {
    icon: Users,
    title: "Professionalism",
    detail: "Trained staff, written agreements, and documented processes.",
  },
  {
    icon: Scale,
    title: "Fairness",
    detail: "Balanced treatment of landlords and tenants to sustain long-term occupancy.",
  },
];



export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Us"
        title="A professional alternative to informal property management"
      />

      {/* Who We Are */}
      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <FadeIn direction="left">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Who We Are</h2>
              <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-ink-soft)" }}>
                Platinum Rentals is a Kampala-based rental property management company offering landlords a professional, transparent, and technology-enabled alternative to informal caretaker-based management.
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                We manage residential and commercial rental properties on behalf of individual landlords, diaspora investors, and small institutional owners across the Greater Kampala Metropolitan Area.
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                We exist because most Ugandan landlords are still forced to choose between managing property themselves or trusting an informal caretaker with little accountability. Platinum Rentals gives landlords a third option: a dedicated team, documented processes, and digital reporting — without the overhead of building an in-house management function.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="surface-raised rounded-2xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-accent)" }}>
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm font-bold" style={{ color: "var(--color-ink)" }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>
                Our Purpose
              </span>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Vision & Mission</h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn delay={100}>
              <div className="surface-raised flex flex-col rounded-3xl p-8">
                <div className="icon-chip mb-5 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Eye size={22} strokeWidth={1.9} style={{ color: "var(--color-accent)" }} />
                </div>
                <h3 className="text-lg font-bold">Vision</h3>
                <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                  To become the most trusted rental property management brand in Uganda, known for integrity, reliability, and modern service delivery.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="surface-raised flex flex-col rounded-3xl p-8">
                <div className="icon-chip mb-5 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Target size={22} strokeWidth={1.9} style={{ color: "var(--color-accent)" }} />
                </div>
                <h3 className="text-lg font-bold">Mission</h3>
                <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                  To give landlords peace of mind and tenants a fair, professional renting experience by managing rental properties with transparency, accountability, and consistent maintenance standards.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>
                What Drives Us
              </span>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Core Values</h2>
            </div>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, detail }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="surface-raised flex flex-col rounded-2xl p-6">
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

      {/* Founders */}
      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>
                The Team
              </span>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Meet Our Founders</h2>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
              {FOUNDERS.map(({ id, name, role, image }) => (
                <Link
                  key={id}
                  href={`/about/founders/${id}`}
                  className="group surface-raised flex flex-col items-center rounded-2xl p-5 transition-transform hover:scale-105"
                >
                  <div className="relative h-40 w-40 overflow-hidden rounded-full sm:h-48 sm:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold">{name}</p>
                  <p className="text-xs" style={{ color: "var(--color-ink-faint)" }}>{role}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-accent)" }}>
                    View profile <ArrowUpRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <LandlordCta />
    </main>
  );
}
