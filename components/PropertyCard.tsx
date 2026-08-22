import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { BedDouble, Bath, MapPin, ImageIcon, ArrowUpRight } from "lucide-react";
import type { Property } from "@/lib/data";
import { formatPrice } from "@/lib/data";

function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group surface-raised flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.025] hover:shadow-xl">
        {/* Image */}
        <div className="relative flex h-56 items-center justify-center overflow-hidden">
          {property.images[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: "var(--color-surface-deep)" }}
            >
              <div className="flex flex-col items-center gap-2 opacity-40">
                <ImageIcon size={32} style={{ color: "var(--color-ink-faint)" }} />
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: "var(--glass-bg)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {property.type}
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
          {property.status !== "Available" && (
            <span
              className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
              style={{
                background:
                  property.status === "Let" ? "#059669" : "#d97706",
              }}
            >
              {property.status}
            </span>
          )}

          {/* Type pill */}
          <span
            className="absolute bottom-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            {property.type}
          </span>

          {/* Arrow icon on hover */}
          <div className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight size={15} style={{ color: "var(--color-accent)" }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <p
            className="text-sm font-extrabold"
            style={{ color: "var(--color-accent)" }}
          >
            {formatPrice(property.price)}
            <span
              className="ml-1 text-xs font-normal"
              style={{ color: "var(--color-ink-faint)" }}
            >
              /month
            </span>
          </p>

          <h3 className="mt-1.5 text-base font-bold leading-snug">
            {property.title}
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
              {property.area}, Kampala
            </span>
          </div>

          {/* Amenities */}
          <div
            className="mt-auto flex items-center gap-4 border-t pt-4"
            style={{ borderColor: "var(--glass-border-soft)" }}
          >
            <div className="flex items-center gap-1.5">
              <BedDouble
                size={15}
                strokeWidth={1.8}
                style={{ color: "var(--color-ink-soft)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {property.bedrooms === 0
                  ? "Studio"
                  : `${property.bedrooms} Bed${property.bedrooms > 1 ? "s" : ""}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath
                size={15}
                strokeWidth={1.8}
                style={{ color: "var(--color-ink-soft)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {property.bathrooms} Bath{property.bathrooms > 1 ? "s" : ""}
              </span>
            </div>
            <span
              className="ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{
                background: "var(--color-accent-soft)",
                color: "var(--color-accent)",
              }}
            >
              {property.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(PropertyCard);
