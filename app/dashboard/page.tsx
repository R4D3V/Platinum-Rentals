"use client";

import { useEffect, useState } from "react";
import { Building2, Loader2, Map } from "lucide-react";
import Link from "next/link";
import type { Property, Land } from "@/lib/data";
import { formatPrice } from "@/lib/data";

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [lands, setLands] = useState<Land[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/user/properties").then((r) => r.json()),
      fetch("/api/user/lands").then((r) => r.json()),
    ])
      .then(([props, lands]) => {
        setProperties(props);
        setLands(lands);
      })
      .finally(() => setLoading(false));
  }, []);

  const available = properties.filter((p) => p.status === "Available").length;
  const letCount = properties.filter((p) => p.status === "Let").length;
  const underOffer = properties.filter((p) => p.status === "Under Offer").length;
  const landAvailable = lands.filter((l) => l.status === "Available").length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm" style={{ color: "var(--color-ink-soft)" }}>
        Welcome back! Here is an overview of your listings.
      </p>

      {loading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 size={24} className="animate-spin" style={{ color: "var(--color-ink-faint)" }} />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="surface-raised rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>Available Properties</p>
              <p className="mt-1 text-3xl font-extrabold" style={{ color: "var(--color-accent)" }}>{available}</p>
            </div>
            <div className="surface-raised rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>Let</p>
              <p className="mt-1 text-3xl font-extrabold" style={{ color: "#059669" }}>{letCount}</p>
            </div>
            <div className="surface-raised rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>Under Offer</p>
              <p className="mt-1 text-3xl font-extrabold" style={{ color: "#d97706" }}>{underOffer}</p>
            </div>
            <div className="surface-raised rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>Available Land</p>
              <p className="mt-1 text-3xl font-extrabold" style={{ color: "var(--color-accent)" }}>{landAvailable}</p>
            </div>
          </div>

          {properties.length === 0 && lands.length === 0 ? (
            <div className="mt-12 flex flex-col items-center gap-3">
              <Building2 size={48} style={{ color: "var(--color-ink-faint)" }} />
              <p className="text-sm" style={{ color: "var(--color-ink-faint)" }}>
                You have no listings yet.
              </p>
              <Link
                href="/dashboard/properties"
                className="btn-neu-accent rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              >
                Add Your First Listing
              </Link>
            </div>
          ) : (
            <>
              {properties.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-extrabold">Recent Listings</h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {properties.slice(0, 5).map((p) => (
                      <Link
                        key={p.id}
                        href={`/dashboard/properties/${p.id}`}
                        className="surface-raised flex items-center justify-between rounded-2xl px-5 py-4 transition hover:opacity-80"
                      >
                        <div>
                          <p className="font-semibold">{p.title}</p>
                          <p className="text-xs" style={{ color: "var(--color-ink-faint)" }}>
                            {p.area} &middot; {formatPrice(p.price)}/mo
                          </p>
                        </div>
                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            color: p.status === "Available" ? "var(--color-accent)" : p.status === "Let" ? "#059669" : "#d97706",
                            border: "1px solid var(--color-shadow-dark)",
                          }}
                        >
                          {p.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {lands.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-extrabold">Recent Land Listings</h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {lands.slice(0, 5).map((l) => (
                      <Link
                        key={l.id}
                        href={`/dashboard/lands/${l.id}`}
                        className="surface-raised flex items-center justify-between rounded-2xl px-5 py-4 transition hover:opacity-80"
                      >
                        <div>
                          <p className="font-semibold">{l.title}</p>
                          <p className="text-xs" style={{ color: "var(--color-ink-faint)" }}>
                            {l.area} &middot; {formatPrice(l.price)} &middot; {l.size} dec
                          </p>
                        </div>
                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            color: l.status === "Available" ? "var(--color-accent)" : l.status === "Sold" ? "#059669" : "#d97706",
                            border: "1px solid var(--color-shadow-dark)",
                          }}
                        >
                          {l.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      href="/dashboard/lands/new"
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                      style={{ color: "var(--color-accent)", background: "var(--color-accent-soft)" }}
                    >
                      <Map size={16} />
                      Add Land Listing
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
