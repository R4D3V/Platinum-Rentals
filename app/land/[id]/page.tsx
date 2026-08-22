import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Check,
  MessageCircle,
  Home,
  Ruler,
  Tag,
  FileText,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import PropertyGallery from "@/components/PropertyGallery";
import LandCard from "@/components/LandCard";
import LandlordCta from "@/components/LandlordCta";
import {
  getLandById,
  getSimilarLands,
  getAllLands,
  formatPrice,
} from "@/lib/data";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getAllLands();
  return all.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const land = await getLandById(id);
  if (!land) return { title: "Land Not Found" };
  return {
    title: `${land.title} | Ninety Nine Property Consultants`,
    description: land.description.slice(0, 160),
  };
}

export default async function LandDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const land = await getLandById(id);
  if (!land) notFound();

  const similar = await getSimilarLands(land);

  const landUrl = `${process.env.NEXT_PUBLIC_APP_URL}/land/${land.id}`;

  const whatsappMessage = encodeURIComponent(
    [
      `Hello Ninety Nine Property Consultants, I'm interested in the land: ${land.title} (${land.area}). Is it still available?`,
      "",
      `Land Link: ${landUrl}`,
    ].join("\n"),
  );

  const stats = [
    { icon: Tag, label: "Type", value: land.landType },
    { icon: Ruler, label: "Size", value: `${land.size} dec` },
    { icon: FileText, label: "Title", value: land.titleDocument },
    { icon: MapPin, label: "Area", value: land.area },
  ];

  const detailRows: [string, string][] = [
    ["Type", land.landType],
    ["Status", land.status],
    ["Size", `${land.size} decimal${land.size === 1 ? "" : "s"}`],
    ["Title Document", land.titleDocument],
    ["Area", land.area],
    ["Location", land.location],
    ["Price", formatPrice(land.price)],
  ];

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
                href="/land"
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
                <Link href="/land" className="transition hover:opacity-80">
                  Land
                </Link>
                <span>/</span>
                <span className="max-w-[200px] truncate">
                  {land.title}
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
            <PropertyGallery images={land.images} type={land.landType} />
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
                  {land.status !== "Available" && (
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                      style={{
                        background:
                          land.status === "Sold" ? "#059669" : "#d97706",
                      }}
                    >
                      {land.status}
                    </span>
                  )}
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide"
                    style={{
                      borderColor: "var(--color-shadow-dark)",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    For Sale
                  </span>
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide"
                    style={{
                      borderColor: "var(--color-shadow-dark)",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    {land.landType}
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">
                  {land.title}
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
                    {land.location}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <p
                  className="text-2xl font-extrabold sm:text-3xl"
                  style={{ color: "var(--color-accent)" }}
                >
                  {formatPrice(land.price)}
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
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
                  About This Land
                </h2>
                <p
                  className="mt-3 min-w-0 text-sm leading-relaxed sm:mt-4 sm:text-base sm:leading-relaxed"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  {land.description}
                </p>
              </div>
            </FadeIn>

            {land.status === "Available" && (
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
            {land.features.map((feature, i) => (
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
              Land Details
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

      {/* Similar Land */}
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
                Similar Land
              </h2>
            </FadeIn>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((l, i) => (
                <FadeIn key={l.id} delay={i * 100}>
                  <LandCard land={l} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <LandlordCta />

      {/* Sticky Mobile CTA */}
      {land.status === "Available" && (
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