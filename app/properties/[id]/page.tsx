import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  MapPin,
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
  getAllProperties,
  formatPrice,
} from "@/lib/data";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const all = await getAllProperties();
  return all.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
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
  const property = await getPropertyById(id);
  if (!property) notFound();

  const similar = await getSimilarProperties(property);

  const propertyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/properties/${property.id}`;

  const whatsappMessage = encodeURIComponent(
    [
      `Hello Platinum Rentals, I'm interested in the property: ${property.title} (${property.area}). Is it still available?`,
      "",
      `Property Link: ${propertyUrl}`,
    ].join("\n"),
  );

  const stats = [
    { icon: Tag, label: "Type", value: property.type },
    {
      icon: BedDouble,
      label: "Beds",
      value: property.bedrooms === 0 ? "Studio" : `${property.bedrooms}`,
    },
    { icon: Bath, label: "Baths", value: `${property.bathrooms}` },
    { icon: Car, label: "Parking", value: `${property.parking}` },
    { icon: Ruler, label: "Size", value: `${property.size} sqm` },
  ];

  const detailRows: [string, string][] = [
    ["Property ID", property.propertyId],
    ["Type", property.type],
    ["Status", property.status],
    [
      "Bedrooms",
      property.bedrooms === 0 ? "Studio" : `${property.bedrooms}`,
    ],
    ["Bathrooms", `${property.bathrooms}`],
    [
      "Parking",
      `${property.parking} Space${property.parking > 1 ? "s" : ""}`,
    ],
    ["Size", `${property.size} sqm`],
    ["Area", property.area],
    ["Price", formatPrice(property.price)],
  ];

  if (property.availableFrom) {
    const idx = detailRows.findIndex(([l]) => l === "Status");
    detailRows.splice(idx + 1, 0, ["Available From", property.availableFrom]);
  }

  return (
    <main className="flex min-w-0 flex-col overflow-x-clip pb-20 sm:pb-0">
      {/* Breadcrumb + Back */}
      <section className="px-4 pt-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <nav
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <Link
                href="/properties"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-80"
                style={{ color: "var(--color-accent)" }}
              >
                <ArrowLeft size={14} />
                Back to listings
              </Link>
              <span className="mx-2 hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="hidden items-center gap-1 sm:flex">
                <Link href="/" className="transition hover:opacity-80">
                  <Home size={12} />
                </Link>
                <span>/</span>
                <Link
                  href="/properties"
                  className="transition hover:opacity-80"
                >
                  Properties
                </Link>
                <span>/</span>
                <span className="max-w-[200px] truncate">
                  {property.title}
                </span>
              </span>
            </nav>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="mt-4 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn direction="up" delay={50}>
            <PropertyGallery images={property.images} type={property.type} />
          </FadeIn>
        </div>
      </section>

      {/* Title + Price + Location + Badges */}
      <section className="mt-6 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn delay={100}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {property.status !== "Available" && (
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                      style={{
                        background:
                          property.status === "Let" ? "#059669" : "#d97706",
                      }}
                    >
                      {property.status}
                    </span>
                  )}
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide"
                    style={{
                      borderColor: "var(--color-shadow-dark)",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    For Rent
                  </span>
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide"
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
                    {property.location}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <p
                  className="text-2xl font-extrabold sm:text-3xl"
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
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mt-8 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn delay={150}>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="surface-raised flex flex-col items-center rounded-2xl px-2 py-4 sm:rounded-2xl sm:px-4 sm:py-5"
                >
                  <stat.icon
                    size={20}
                    strokeWidth={1.8}
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span
                    className="mt-2 text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    {stat.label}
                  </span>
                  <span className="mt-0.5 text-sm font-bold sm:text-base">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Description + Sidebar */}
      <section className="mt-10 px-4 sm:mt-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[1.3fr_1fr]">
            <FadeIn direction="left" delay={100}>
              <div>
                <h2 className="text-lg font-bold sm:text-xl">
                  About This Property
                </h2>
                <p
                  className="mt-3 min-w-0 text-sm leading-relaxed sm:mt-4 sm:text-base sm:leading-relaxed"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  {property.description}
                </p>
              </div>
            </FadeIn>

            {property.status === "Available" && (
              <FadeIn direction="right" delay={150}>
                <div className="surface-raised-lg sticky top-24 rounded-3xl p-6 sm:p-8 hidden sm:block">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neu-accent flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold tracking-wide text-white"
                  >
                    <MessageCircle size={18} />
                    Contact for Viewing
                  </a>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-14 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Features
            </span>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              What&apos;s Included
            </h2>
          </FadeIn>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {property.features.map((feature, i) => (
              <FadeIn key={feature} delay={i * 50}>
                <div className="surface-raised flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium sm:px-5 sm:py-4">
                  <Check
                    size={16}
                    strokeWidth={2.5}
                    style={{ color: "var(--color-accent)" }}
                  />
                  {feature}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Details Table */}
      <section className="mt-14 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Property Details
            </span>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Full Details
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-6 surface-raised-lg overflow-hidden rounded-3xl">
              <div
                className="divide-y"
                style={{ borderColor: "var(--color-shadow-dark)" }}
              >
                {detailRows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8 sm:py-4"
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      {label}
                    </span>
                    <span className="text-right text-sm font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <section className="mt-14 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-accent)" }}
              >
                You May Also Like
              </span>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Similar Properties
              </h2>
            </FadeIn>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Sticky Mobile CTA */}
      {property.status === "Available" && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 border-t p-4 backdrop-blur-xl sm:hidden"
          style={{
            backgroundColor: "rgba(var(--glass-tint), 0.95)",
            borderColor: "var(--glass-border)",
          }}
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neu-accent flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold tracking-wide text-white"
          >
            <MessageCircle size={18} />
            Contact for Viewing
          </a>
        </div>
      )}
    </main>
  );
}
