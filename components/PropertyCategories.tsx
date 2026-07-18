import Link from "next/link";
import { Home, Building2, Castle, Warehouse } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const CATEGORIES = [
  { label: "Apartments", icon: Home, type: "Apartment", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { label: "Villas", icon: Castle, type: "Villa", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { label: "Townhouses", icon: Building2, type: "Townhouse", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" },
  { label: "Studios", icon: Warehouse, type: "Studio", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
];

export default function PropertyCategories() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Browse by Category
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Popular Property Types
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {CATEGORIES.map(({ label, icon: Icon, type, gradient }, i) => (
            <FadeIn key={type} delay={i * 80}>
              <Link href="/properties">
                <div className="group relative overflow-hidden rounded-3xl transition-transform duration-200 hover:scale-[1.03]">
                  <div
                    className="flex h-40 items-center justify-center sm:h-48"
                    style={{ background: gradient }}
                  >
                    <Icon size={40} strokeWidth={1.5} className="text-white/80" />
                  </div>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-5">
                    <span className="text-lg font-bold text-white">{label}</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
