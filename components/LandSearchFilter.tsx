"use client";

import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Home,
  Tag,
  DollarSign,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import LandCard from "@/components/LandCard";
import type { Land } from "@/lib/data";
import { fetcher } from "@/lib/fetcher";

const TYPES = ["All", "Residential", "Commercial", "Agricultural", "Mixed Use"] as const;
const STATUSES = ["All", "Available", "Sold", "Under Offer"] as const;

interface Filters {
  landType: string;
  area: string;
  status: string;
  minPrice: string;
  maxPrice: string;
}

const ALL_FILTERS: Filters = {
  landType: "All",
  area: "All",
  status: "All",
  minPrice: "",
  maxPrice: "",
};

function hasActiveFilters(f: Filters) {
  return (
    f.landType !== "All" ||
    f.area !== "All" ||
    f.status !== "All" ||
    f.minPrice !== "" ||
    f.maxPrice !== ""
  );
}

export default function LandSearchFilter() {
  const { data: lands = [], isLoading } = useSWR<Land[]>("/api/lands", fetcher);
  const [draft, setDraft] = useState<Filters>(ALL_FILTERS);
  const [applied, setApplied] = useState<Filters>(ALL_FILTERS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setPageSize(mq.matches ? 20 : 30);
    const handler = (e: MediaQueryListEvent) => setPageSize(e.matches ? 20 : 30);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial: Partial<Filters> = {};
    const type = params.get("type");
    if (type) initial.landType = type;
    const area = params.get("area");
    if (area) initial.area = area;
    if (Object.keys(initial).length > 0) {
      const merged = { ...ALL_FILTERS, ...initial };
      setDraft(merged);
      setApplied(merged);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const areas = useMemo(
    () => ["All", ...Array.from(new Set(lands.map((l) => l.area)))],
    [lands],
  );

  const filtered = useMemo(
    () =>
      lands.filter((l) => {
        if (applied.landType !== "All" && l.landType !== applied.landType) return false;
        if (applied.area !== "All" && l.area !== applied.area) return false;
        if (applied.status !== "All" && l.status !== applied.status) return false;
        if (applied.minPrice && l.price < Number(applied.minPrice) * 1000000) return false;
        if (applied.maxPrice && l.price > Number(applied.maxPrice) * 1000000) return false;
        return true;
      }),
    [lands, applied],
  );

  const appliedHasFilters = hasActiveFilters(applied);
  const draftHasFilters = hasActiveFilters(draft);

  function updateDraft(key: keyof Filters, value: string) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function syncUrl(f: Filters) {
    const params = new URLSearchParams();
    if (f.landType !== "All") params.set("type", f.landType);
    if (f.area !== "All") params.set("area", f.area);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/land?${qs}` : "/land");
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setApplied({ ...draft });
    syncUrl(draft);
    setPage(1);
    setMobileOpen(false);
  }

  function resetAll() {
    setDraft(ALL_FILTERS);
    setApplied(ALL_FILTERS);
    syncUrl(ALL_FILTERS);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function removeFilter(key: keyof Filters) {
    const next = { ...applied, [key]: key === "minPrice" || key === "maxPrice" ? "" : "All" };
    setDraft(next);
    setApplied(next);
  }

  const selectClass =
    "input-neu w-full appearance-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none";

  return (
    <>
      {/* Filter Bar */}
      <FadeIn>
        <form onSubmit={handleSearch} className="surface-raised-lg mb-8 overflow-hidden rounded-3xl">
          {/* Desktop header */}
          <div className="hidden items-center justify-between px-6 py-4 sm:flex">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold">Search & Filter</span>
            </div>
            {appliedHasFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-80"
                style={{ color: "var(--color-accent)" }}
              >
                <RotateCcw size={13} />
                Reset Filters
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex w-full items-center justify-between px-6 py-4 sm:hidden"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold">Search & Filter</span>
            </div>
            {appliedHasFilters ? (
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                style={{ background: "var(--color-accent)" }}
              >
                Active
              </span>
            ) : (
              <span className="text-xs" style={{ color: "var(--color-ink-faint)" }}>
                Tap to open
              </span>
            )}
          </button>

          {/* Filters grid */}
          <div className={`px-6 pb-6 ${mobileOpen ? "block" : "hidden sm:block"}`}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {/* Land type */}
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2">
                  <Home size={16} style={{ color: "var(--color-ink-faint)" }} />
                </span>
                <select
                  value={draft.landType}
                  onChange={(e) => updateDraft("landType", e.target.value)}
                  className={selectClass}
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>
                  ))}
                </select>
              </div>

              {/* Area */}
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2">
                  <MapPin size={16} style={{ color: "var(--color-ink-faint)" }} />
                </span>
                <select
                  value={draft.area}
                  onChange={(e) => updateDraft("area", e.target.value)}
                  className={selectClass}
                >
                  {areas.map((a) => (
                    <option key={a} value={a}>{a === "All" ? "All Areas" : a}</option>
                  ))}
                </select>
              </div>

              {/* Price range */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2">
                    <DollarSign size={16} style={{ color: "var(--color-ink-faint)" }} />
                  </span>
                  <input
                    type="number"
                    placeholder="Min (M)"
                    value={draft.minPrice}
                    onChange={(e) => updateDraft("minPrice", e.target.value)}
                    className="input-neu w-full rounded-xl py-3 pl-10 pr-3 text-sm font-medium outline-none"
                  />
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    placeholder="Max (M)"
                    value={draft.maxPrice}
                    onChange={(e) => updateDraft("maxPrice", e.target.value)}
                    className="input-neu w-full rounded-xl py-3 pl-4 pr-3 text-sm font-medium outline-none"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2">
                  <Tag size={16} style={{ color: "var(--color-ink-faint)" }} />
                </span>
                <select
                  value={draft.status}
                  onChange={(e) => updateDraft("status", e.target.value)}
                  className={selectClass}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons row */}
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="submit"
                className="btn-neu-accent flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold tracking-wide text-white sm:w-auto sm:px-10"
              >
                <Search size={16} />
                Search Land
              </button>
              {draftHasFilters && (
                <button
                  type="button"
                  onClick={resetAll}
                  className="flex items-center gap-1.5 rounded-xl px-5 py-3 text-xs font-semibold transition hover:opacity-80"
                  style={{
                    color: "var(--color-accent)",
                    background: "var(--color-accent-soft)",
                  }}
                >
                  <RotateCcw size={13} />
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>
      </FadeIn>

      {/* Results count + active chips */}
      <FadeIn delay={50}>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium" style={{ color: "var(--color-ink-faint)" }}>
            {isLoading
              ? "Loading..."
              : `${filtered.length} land plot${filtered.length === 1 ? "" : "s"} found` +
                (totalPages > 1 ? ` — Page ${page} of ${totalPages}` : "")}
          </p>
          {appliedHasFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs" style={{ color: "var(--color-ink-faint)" }}>
                Filters:
              </span>
              {applied.landType !== "All" && (
                <FilterChip label={applied.landType} onRemove={() => removeFilter("landType")} />
              )}
              {applied.area !== "All" && (
                <FilterChip label={applied.area} onRemove={() => removeFilter("area")} />
              )}
              {applied.status !== "All" && (
                <FilterChip label={applied.status} onRemove={() => removeFilter("status")} />
              )}
              {(applied.minPrice || applied.maxPrice) && (
                <FilterChip
                  label={`${applied.minPrice || "0"}–${applied.maxPrice || "∞"}M`}
                  onRemove={() => { removeFilter("minPrice"); removeFilter("maxPrice"); }}
                />
              )}
              <button
                onClick={resetAll}
                className="ml-1 text-[11px] font-bold underline underline-offset-2 transition hover:opacity-80"
                style={{ color: "var(--color-accent)" }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Land grid or loading / empty state */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="surface-raised flex flex-col overflow-hidden rounded-3xl">
              <div className="h-56 animate-pulse bg-slate-200" />
              <div className="flex flex-1 flex-col p-6 gap-3">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
                <div className="mt-auto flex items-center gap-4 pt-4">
                  <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : paginated.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((land, i) => (
              <FadeIn key={land.id} delay={i * 80}>
                <LandCard land={land} />
              </FadeIn>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeIn delay={200}>
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-neu flex h-10 w-10 items-center justify-center rounded-xl disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    if (totalPages <= 7) return true;
                    if (p === 1 || p === totalPages) return true;
                    if (Math.abs(p - page) <= 1) return true;
                    return false;
                  })
                  .map((p, idx, arr) => (
                    <span key={p} className="flex items-center gap-1">
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <span className="px-1 text-xs" style={{ color: "var(--color-ink-faint)" }}>...</span>
                      )}
                      <button
                        onClick={() => setPage(p)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition ${
                          page === p
                            ? "bg-[var(--color-accent)] text-white"
                            : "btn-neu"
                        }`}
                      >
                        {p}
                      </button>
                    </span>
                  ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn-neu flex h-10 w-10 items-center justify-center rounded-xl disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </FadeIn>
          )}
        </>
      ) : (
        <FadeIn>
          <div className="surface-pressed flex flex-col items-center rounded-3xl px-6 py-16 text-center">
            <Search size={36} strokeWidth={1.5} style={{ color: "var(--color-ink-faint)" }} />
            <h3 className="mt-4 text-lg font-bold">No land matches your search</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
              Try adjusting your filters or{" "}
              <button
                onClick={resetAll}
                className="font-semibold underline underline-offset-2"
                style={{ color: "var(--color-accent)" }}
              >
                reset all filters
              </button>{" "}
              to see every plot.
            </p>
          </div>
        </FadeIn>
      )}
    </>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold">
      <span className="rounded-full px-2.5 py-0.5 text-white" style={{ background: "var(--color-accent)" }}>
        {label}
      </span>
      <button
        onClick={onRemove}
        className="flex h-4 w-4 items-center justify-center rounded-full transition hover:opacity-70"
        style={{ color: "var(--color-ink-faint)" }}
        aria-label={`Remove ${label} filter`}
      >
        <X size={12} />
      </button>
    </span>
  );
}