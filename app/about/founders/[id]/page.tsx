import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Camera, Music2 } from "lucide-react";
import { FOUNDERS, getFounder } from "@/lib/founders";

export function generateStaticParams() {
  return FOUNDERS.map((f) => ({ id: String(f.id) }));
}

export default async function FounderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const founder = getFounder(Number(id));
  if (!founder) notFound();

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/about"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--color-ink-faint)" }}
        >
          <ArrowLeft size={16} />
          Back to About
        </Link>

        <div className="surface-raised-lg overflow-hidden rounded-3xl">
          <div className="flex flex-col items-center p-10 sm:p-12">
            <div className="relative h-48 w-48 overflow-hidden rounded-full sm:h-56 sm:w-56">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                sizes="(min-width: 640px) 224px, 192px"
                className="object-cover"
              />
            </div>

            <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">{founder.name}</h1>
            <p
              className="mt-1 text-sm font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              {founder.role}
            </p>

            <p
              className="mt-6 max-w-lg text-center text-base leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              {founder.description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={founder.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-chip flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-80"
                style={{ color: "var(--color-ink)" }}
              >
                <Camera size={18} />
                Instagram
              </a>
              <a
                href={founder.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-chip flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-80"
                style={{ color: "var(--color-ink)" }}
              >
                <Globe size={18} />
                WhatsApp
              </a>
              <a
                href={founder.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-chip flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-80"
                style={{ color: "var(--color-ink)" }}
              >
                <Music2 size={18} />
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
