import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/data";

export default async function AllProperties() {
  const properties = await getAllProperties();
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10" style={{ background: "var(--color-surface-alt)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-accent)" }}
              >
                Browse Latest Offers
              </span>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                All Properties
              </h2>
            </div>
            <Link
              href="/properties"
              className="hidden items-center gap-1.5 text-sm font-semibold sm:flex"
              style={{ color: "var(--color-accent)" }}
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <FadeIn key={property.id} delay={i * 80}>
              <PropertyCard property={property} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="mt-10 text-center">
            <Link
              href="/properties"
              className="btn-neu inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold"
            >
              View All Properties
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
