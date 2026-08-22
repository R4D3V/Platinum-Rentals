import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { MapPin, ImageIcon, Ruler, FileText, ArrowUpRight, BadgeCheck } from "lucide-react";
import type { Land } from "@/lib/data";
import { formatPrice } from "@/lib/data";

function LandCard({ land }: { land: Land }) {
  return (
    <Link href={`/land/${land.id}`}>
      <div className="group surface-raised flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.025] hover:shadow-xl">
        {/* Image */}
        <div className="relative flex h-56 items-center justify-center overflow-hidden">
          {land.images[0] ? (
            <Image
              src={land.images[0]}
              alt={land.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(47,224,176,0.12), rgba(53,198,232,0.12))",
              }}
            >
              <div className="flex flex-col items-center gap-2 opacity-50">
                <ImageIcon size={32} style={{ color: "#2fe0b0" }} />
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(47,224,176,0.15)",
                    color: "#2fe0b0",
                    border: "1px solid rgba(47,224,176,0.25)",
                  }}
                >
                  {land.landType}
                </span>
              </div>
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
            }}
          />

          {/* Status badge */}
          {land.status !== "Available" && (
            <span
              className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
              style={{
                background: land.status === "Sold" ? "#059669" : "#d97706",
              }}
            >
              {land.status}
            </span>
          )}

          {/* Verified badge */}
          <span
            className="absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm"
            style={{ background: "rgba(47, 224, 176, 0.7)" }}
          >
            <BadgeCheck size={11} />
            Verified
          </span>

          {/* Arrow icon on hover */}
          <div className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight size={15} style={{ color: "#2fe0b0" }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <p
            className="text-sm font-extrabold"
            style={{ color: "#2fe0b0" }}
          >
            {formatPrice(land.price)}
            <span
              className="ml-1 text-xs font-normal"
              style={{ color: "var(--color-ink-faint)" }}
            >
              for sale
            </span>
          </p>

          <h3 className="mt-1.5 text-base font-bold leading-snug">
            {land.title}
          </h3>

          <div className="mt-1.5 flex items-center gap-1.5">
            <MapPin
              size={13}
              strokeWidth={2}
              style={{ color: "var(--color-ink-faint)" }}
            />
            <span
              className="text-xs"
              style={{ color: "var(--color-ink-faint)" }}
            >
              {land.area}
            </span>
          </div>

          {/* Details */}
          <div
            className="mt-auto flex items-center gap-4 border-t pt-4"
            style={{ borderColor: "var(--glass-border-soft)" }}
          >
            <div className="flex items-center gap-1.5">
              <Ruler
                size={15}
                strokeWidth={1.8}
                style={{ color: "var(--color-ink-soft)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {land.size} dec
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText
                size={15}
                strokeWidth={1.8}
                style={{ color: "var(--color-ink-soft)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {land.titleDocument}
              </span>
            </div>
            <span
              className="ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{
                background: "rgba(47,224,176,0.1)",
                color: "#2fe0b0",
                border: "1px solid rgba(47,224,176,0.2)",
              }}
            >
              {land.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(LandCard);