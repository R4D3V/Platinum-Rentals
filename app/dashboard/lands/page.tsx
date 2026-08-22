"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  CheckSquare,
  Square,
} from "lucide-react";
import type { Land } from "@/lib/data";
import FilterTabs from "@/components/FilterTabs";
import { fetcher } from "@/lib/fetcher";

export default function MyLandsPage() {
  const { data: lands = [], isLoading, mutate } = useSWR<Land[]>("/api/user/lands", fetcher);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const types = useMemo(
    () => [...new Set(lands.map((l) => l.landType))],
    [lands],
  );
  const areas = useMemo(
    () => [...new Set(lands.map((l) => l.area))],
    [lands],
  );
  const statuses = useMemo(
    () => [...new Set(lands.map((l) => l.status))],
    [lands],
  );

  const filtered = useMemo(
    () => lands.filter((l) => {
      if (activeType && l.landType !== activeType) return false;
      if (activeArea && l.area !== activeArea) return false;
      if (activeStatus && l.status !== activeStatus) return false;
      return true;
    }),
    [lands, activeType, activeArea, activeStatus],
  );

  const allFilteredSelected = useMemo(
    () => filtered.length > 0 && filtered.every((l) => selectedIds.has(l.id)),
    [filtered, selectedIds],
  );

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (allFilteredSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((l) => l.id)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this land listing?")) return;
    await fetch(`/api/user/lands/${id}`, { method: "DELETE" });
    setSelectedIds(new Set());
    mutate();
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} land listings?`)) return;
    setDeleting(true);
    try {
      await fetch("/api/user/lands/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [...selectedIds] }),
      });
      setSelectedIds(new Set());
      mutate();
    } finally {
      setDeleting(false);
    }
  }

  function statusColor(status: string) {
    return status === "Available"
      ? "var(--color-accent)"
      : status === "Sold"
        ? "#059669"
        : "#d97706";
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">My Land</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Manage your land for sale listings
          </p>
        </div>
        <Link
          href="/dashboard/lands/new"
          className="btn-neu-accent flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={16} />
          Add Land
        </Link>
      </div>

      {selectedIds.size > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-red-50 px-5 py-3">
          <span className="text-sm font-semibold text-red-700">
            {selectedIds.size} selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700"
          >
            {deleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            Delete Selected
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="ml-auto text-xs font-semibold text-red-600 underline underline-offset-2 transition hover:opacity-80"
          >
            Clear selection
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 size={24} className="animate-spin" style={{ color: "var(--color-ink-faint)" }} />
        </div>
      ) : (
        <>
          {lands.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <FilterTabs
                label="Type"
                options={types}
                active={activeType}
                onSelect={setActiveType}
              />
              <FilterTabs
                label="Area"
                options={areas}
                active={activeArea}
                onSelect={setActiveArea}
              />
              <FilterTabs
                label="Status"
                options={statuses}
                active={activeStatus}
                onSelect={setActiveStatus}
              />
            </div>
          )}
          {filtered.length === 0 ? (
            <p className="mt-12 text-center text-sm" style={{ color: "var(--color-ink-faint)" }}>
              {lands.length === 0 ? "You have no land listings yet" : "No land listings match the selected filters"}
            </p>
          ) : (
          <div className="mt-4">
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr style={{ color: "var(--color-ink-faint)" }}>
                    <th className="pb-3 pr-2 w-10">
                      <button onClick={toggleSelectAll} className="flex items-center">
                        {allFilteredSelected ? (
                          <CheckSquare size={16} style={{ color: "var(--color-accent)" }} />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                    </th>
                    <th className="pb-3 pr-4 font-semibold">Title</th>
                    <th className="pb-3 pr-4 font-semibold">Type</th>
                    <th className="pb-3 pr-4 font-semibold">Size</th>
                    <th className="pb-3 pr-4 font-semibold">Price</th>
                    <th className="pb-3 pr-4 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr
                      key={l.id}
                      className="border-t"
                      style={{ borderColor: "var(--color-shadow-dark)" }}
                    >
                      <td className="py-3 pr-2">
                        <button onClick={() => toggleSelect(l.id)} className="flex items-center">
                          {selectedIds.has(l.id) ? (
                            <CheckSquare size={16} style={{ color: "var(--color-accent)" }} />
                          ) : (
                            <Square size={16} style={{ color: "var(--color-ink-faint)" }} />
                          )}
                        </button>
                      </td>
                      <td className="py-3 pr-4 font-medium">{l.title}</td>
                      <td className="py-3 pr-4" style={{ color: "var(--color-ink-soft)" }}>{l.landType}</td>
                      <td className="py-3 pr-4" style={{ color: "var(--color-ink-soft)" }}>{l.size} dec</td>
                      <td className="py-3 pr-4 whitespace-nowrap" style={{ color: "var(--color-ink-soft)" }}>
                        UGX {(l.price / 1000000).toFixed(1)}M
                      </td>
                      <td
                        className="py-3 pr-4 font-semibold"
                        style={{ color: statusColor(l.status) }}
                      >
                        {l.status}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link
                            href={`/dashboard/lands/${l.id}`}
                            className="icon-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                            style={{ color: "var(--color-ink-soft)" }}
                          >
                            <Pencil size={13} />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(l.id)}
                            className="icon-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                            style={{ color: "#dc2626" }}
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 md:hidden">
              {filtered.map((l) => (
                <div
                  key={l.id}
                  className="surface-raised rounded-2xl p-4"
                  style={{ border: selectedIds.has(l.id) ? "2px solid var(--color-accent)" : "none" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <button onClick={() => toggleSelect(l.id)} className="mt-0.5 shrink-0">
                        {selectedIds.has(l.id) ? (
                          <CheckSquare size={18} style={{ color: "var(--color-accent)" }} />
                        ) : (
                          <Square size={18} style={{ color: "var(--color-ink-faint)" }} />
                        )}
                      </button>
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-snug break-words">{l.title}</p>
                      </div>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                      style={{ background: statusColor(l.status) }}
                    >
                      {l.status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--color-ink-soft)" }}>
                    <span>{l.landType}</span>
                    <span>{l.size} dec</span>
                    <span>UGX {(l.price / 1000000).toFixed(1)}M</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/dashboard/lands/${l.id}`}
                      className="icon-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                      style={{ color: "var(--color-ink-soft)" }}
                    >
                      <Pencil size={12} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="icon-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                      style={{ color: "#dc2626" }}
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
        </>
      )}
    </div>
  );
}