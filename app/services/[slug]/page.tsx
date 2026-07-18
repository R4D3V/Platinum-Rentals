import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SERVICES, getServiceBySlug } from "@/lib/services";
import IconPanel from "@/components/IconPanel";
import FadeIn from "@/components/FadeIn";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Platinum Rentals`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--color-ink-faint)" }}
          >
            <ArrowLeft size={16} />
            All Services
          </Link>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <FadeIn direction="left">
            <div>
              <div className="icon-chip mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                <Icon size={26} strokeWidth={1.8} style={{ color: "var(--color-accent)" }} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>
                Service
              </span>
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{service.title}</h1>
              <p className="mt-4 text-lg font-medium" style={{ color: "var(--color-ink-soft)" }}>
                {service.tagline}
              </p>

              <div className="mt-6 space-y-4">
                {service.overview.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={150}>
            <IconPanel icon={Icon} />
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="surface-raised rounded-3xl p-8">
              <h2 className="text-lg font-bold">What&rsquo;s Included</h2>
              <ul className="mt-5 space-y-3.5">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="icon-chip mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg">
                      <Check size={13} strokeWidth={3} style={{ color: "var(--color-accent)" }} />
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="surface-raised rounded-3xl p-8">
              <h2 className="text-lg font-bold">Ideal For</h2>
              <ul className="mt-5 space-y-3.5">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    />
                    <span className="text-sm leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-lg font-bold">FAQs</h2>
              <div className="mt-5 space-y-5">
                {service.faqs.map((faq) => (
                  <div key={faq.q}>
                    <p className="text-sm font-semibold">{faq.q}</p>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="glass-dark-panel mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#e2757f" }}>
                Interested?
              </span>
              <h3 className="mt-2 max-w-md text-xl font-extrabold text-white sm:text-2xl">
                Ask us about {service.title.toLowerCase()} for your property.
              </h3>
            </div>
            <Link
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              className="btn-neu-accent flex shrink-0 items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white"
            >
              Get in Touch
              <ArrowRight size={18} />
            </Link>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-16">
            <h2 className="mb-6 text-lg font-bold">Other Services</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {otherServices.map((s) => {
                const OtherIcon = s.icon;
                return (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="btn-neu flex flex-col rounded-2xl p-6">
                    <div className="icon-chip mb-4 flex h-11 w-11 items-center justify-center rounded-2xl">
                      <OtherIcon size={20} strokeWidth={1.9} style={{ color: "var(--color-accent)" }} />
                    </div>
                    <h3 className="text-sm font-bold leading-snug">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
                      {s.summary}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
