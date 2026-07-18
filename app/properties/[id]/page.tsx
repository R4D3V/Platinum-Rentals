import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  MapPin,
  Calendar,
  Check,
  MessageCircle,
  Home,
  Car,
  Ruler,
  Tag,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyCard from "@/components/PropertyCard";
import LandlordCta from "@/components/LandlordCta";
import {
  getPropertyById,
  getSimilarProperties,
  formatPrice,
  SAMPLE_PROPERTIES,
} from "@/lib/data";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SAMPLE_PROPERTIES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} | Platinum Rentals`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const similar = getSimilarProperties(property);

  const whatsappMessage = encodeURIComponent(
    `Hello Platinum Rentals, I'm interested in the property: ${property.title} (${property.area}). Is it still available?`,
  );

  const detailRows: [string, string][] = [
    ["Property ID", property.propertyId],
    ["Type", property.type],
    ["Status", property.status],
    ["Bedrooms", property.bedrooms === 0 ? "Studio" : `${property.bedrooms}`],
    ["Bathrooms", `${property.bathrooms}`],
    ["Parking", `${property.parking} Space${property.parking > 1 ? "s" : ""}`],
    ["Size", `${property.size} sqm`],
    ["Area", `${property.area}, Kampala`],
    ["Price", formatPrice(property.price)],
  ];

  if (property.availableFrom) {
    detailRows.splice(9, 0, ["Available From", property.availableFrom]);
  }

  return (
    <main className="flex min-w-0 flex-col overflow-x-clip">
      {/* Breadcrumb + Back */}
      <section className="px-4 pt-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <Link
              href="/properties"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <ArrowLeft size={16} />
              Back to listings
            </Link>
          </FadeIn>

          <FadeIn delay={50}>
            <nav
              className="mb-6 flex flex-wrap items-center gap-1.5 text-xs"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <Link href="/" className="transition hover:opacity-80">
                <Home size={13} />
              </Link>
              <span>/</span>
              <Link href="/properties" className="transition hover:opacity-80">
                Properties
              </Link>
              <span>/</span>
              <span style={{ color: "var(--color-ink-soft)" }}>
                {property.area}
              </span>
              <span>/</span>
              <span
                className="max-w-[180px] truncate"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {property.title}
              </span>
            </nav>
          </FadeIn>
        </div>
      </section>

      {/* Title + Price */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn delay={100}>
            <div className="flex flex-wrap items-start gap-3">
              {property.status !== "Available" && (
                <span
                  className="mt-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                  style={{
                    background:
                      property.status === "Let" ? "#059669" : "#d97706",
                  }}
                >
                  {property.status}
                </span>
              )}
              <span
                className="mt-1 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide"
                style={{
                  borderColor: "var(--color-shadow-dark)",
                  color: "var(--color-ink-soft)",
                }}
              >
                For Rent
              </span>
              <span
                className="mt-1 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide"
                style={{
                  borderColor: "var(--color-shadow-dark)",
                  color: "var(--color-ink-soft)",
                }}
              >
                {property.type}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">
              {property.title}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <MapPin
                size={16}
                strokeWidth={2}
                style={{ color: "var(--color-accent)" }}
              />
              <span
                className="text-sm"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {property.location}, Kampala
              </span>
            </div>

            <p
              className="mt-4 text-2xl font-extrabold sm:text-3xl"
              style={{ color: "var(--color-accent)" }}
            >
              {formatPrice(property.price)}
              <span
                className="ml-1 text-sm font-normal"
                style={{ color: "var(--color-ink-faint)" }}
              >
                /month
              </span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery + Sidebar */}
      <section className="py-6 sm:px-6 sm:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left — Gallery */}
            <FadeIn direction="left">
              <PropertyGallery
                gradient={property.gradient}
                type={property.type}
              />
            </FadeIn>

            {/* Right — Info badges + About + CTA */}
            <FadeIn direction="right" delay={100}>
              <div className="flex min-w-0 flex-col">
                {/* Property info badges */}
                <div className="grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 sm:gap-3 sm:px-0 lg:grid-cols-5">
                  <div className="surface-raised flex flex-col items-center rounded-2xl px-3 py-4">
                    <Tag
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: "var(--color-accent)" }}
                    />
                    <span
                      className="mt-2 text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Type
                    </span>
                    <span className="mt-0.5 text-xs font-semibold">
                      {property.type}
                    </span>
                  </div>
                  <div className="surface-raised flex flex-col items-center rounded-2xl px-3 py-4">
                    <BedDouble
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: "var(--color-accent)" }}
                    />
                    <span
                      className="mt-2 text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Beds
                    </span>
                    <span className="mt-0.5 text-xs font-semibold">
                      {property.bedrooms === 0 ? "Studio" : property.bedrooms}
                    </span>
                  </div>
                  <div className="surface-raised flex flex-col items-center rounded-2xl px-3 py-4">
                    <Bath
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: "var(--color-accent)" }}
                    />
                    <span
                      className="mt-2 text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Baths
                    </span>
                    <span className="mt-0.5 text-xs font-semibold">
                      {property.bathrooms}
                    </span>
                  </div>
                  <div className="surface-raised flex flex-col items-center rounded-2xl px-3 py-4">
                    <Car
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: "var(--color-accent)" }}
                    />
                    <span
                      className="mt-2 text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Parking
                    </span>
                    <span className="mt-0.5 text-xs font-semibold">
                      {property.parking}
                    </span>
                  </div>
                  <div className="surface-raised flex flex-col items-center rounded-2xl px-3 py-4 col-span-2 sm:col-span-1">
                    <Ruler
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: "var(--color-accent)" }}
                    />
                    <span
                      className="mt-2 text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Size
                    </span>
                    <span className="mt-0.5 text-xs font-semibold">
                      {property.size}sqm
                    </span>
                  </div>
                </div>

                {/* About This Property */}
                <div className="mt-6 min-w-0 px-4 sm:mt-8 sm:px-8">
                  <h2 className="text-base font-bold sm:text-lg">
                    About This Property
                  </h2>
                  <p
                    className="mt-2 min-w-0 text-sm leading-relaxed sm:mt-3"
                    style={{ color: "var(--color-ink-soft)" }}
                  >
                    {property.description}
                  </p>
                </div>

                {/* CTA */}
                {property.status === "Available" && (
                  <div className="mt-8 px-4 sm:px-0">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-neu-accent flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold tracking-wide text-white"
                    >
                      <MessageCircle size={18} />
                      Contact for Viewing
                    </a>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Details Table */}
      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Property Details
            </span>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Details
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-8 surface-raised overflow-hidden rounded-3xl">
              {detailRows.map(([label, value], i) => (
                <div
                  key={label}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 sm:px-6 sm:py-4"
                  style={{
                    borderBottom:
                      i < detailRows.length - 1
                        ? "1px solid var(--color-shadow-dark)"
                        : "none",
                  }}
                >
                  <span
                    className="shrink-0 text-sm font-medium"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    {label}
                  </span>
                  <span className="text-right text-sm font-semibold break-words">{value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Features
            </span>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              What&apos;s Included
            </h2>
          </FadeIn>

          <div className="mt-8 flex flex-wrap gap-3">
            {property.features.map((feature, i) => (
              <FadeIn key={feature} delay={i * 60}>
                <span className="surface-raised inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    style={{ color: "var(--color-accent)" }}
                  />
                  {feature}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <section className="px-4 py-12 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-accent)" }}
              >
                You May Also Like
              </span>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Similar Properties
              </h2>
            </FadeIn>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p, i) => (
                <FadeIn key={p.id} delay={i * 100}>
                  <PropertyCard property={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <LandlordCta />
    </main>
  );
}
