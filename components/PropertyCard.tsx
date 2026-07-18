"use client";

import Link from "next/link";
import { BedDouble, Bath, MapPin } from "lucide-react";
import type { Property } from "@/lib/data";
import { formatPrice } from "@/lib/data";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group surface-raised flex flex-col overflow-hidden rounded-3xl transition-transform duration-200 hover:scale-[1.02]">
        {/* Image placeholder */}
        <div
          className="relative flex h-56 items-center justify-center"
          style={{ background: property.gradient }}
        >
          <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {property.type}
          </span>
          {property.status !== "Available" && (
            <span
              className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
              style={{
                background:
                  property.status === "Let" ? "#059669" : "#d97706",
              }}
            >
              {property.status}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <p
            className="text-sm font-bold"
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

          <h3 className="mt-2 text-lg font-bold leading-snug">
            {property.title}
          </h3>

          <div className="mt-2 flex items-center gap-1.5">
            <MapPin
              size={14}
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

          <div className="mt-auto flex items-center gap-4 pt-4">
            <div className="flex items-center gap-1.5">
              <BedDouble
                size={16}
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
                size={16}
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
          </div>
        </div>
      </div>
    </Link>
  );
}
