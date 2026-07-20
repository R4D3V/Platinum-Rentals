"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Copy,
  Loader2,
  User,
  CheckSquare,
  Square,
} from "lucide-react";
import type { Property } from "@/lib/data";
import FilterTabs from "@/components/FilterTabs";

interface UserInfo {
  id: string;
  name: string | null;
  email: string;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const userMap = new Map(users.map((u) => [u.id, u.name || u.email]));
  const userOptions = [...new Set(properties.map((p) => p.landlordId).filter(Boolean))] as string[];

  const types = [...new Set(properties.map((p) => p.type))];
  const areas = [...new Set(properties.map((p) => p.area))];
  const statuses = [...new Set(properties.map((p) => p.status))];

  const filtered = properties.filter((p) => {
    if (activeType && p.type !== activeType) return false;
    if (activeArea && p.area !== activeArea) return false;
    if (activeStatus && p.status !== activeStatus) return false;
    if (activeUser && p.landlordId !== activeUser) return false;
    return true;
  });

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id));

  async function fetchData() {
    setLoading(true);
    try {
      const [propsRes, usersRes] = await Promise.all([
        fetch("/api/admin/properties"),
        fetch("/api/admin/users"),
      ]);
      setProperties(await propsRes.json());
      setUsers(await usersRes.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this property?")) return;
    await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    setSelectedIds(new Set());
    await fetchData();
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} properties?`)) return;
    setDeleting(true);
    try {
      await fetch("/api/admin/properties/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [...selectedIds] }),
      });
      setSelectedIds(new Set());
      await fetchData();
    } finally {
      setDeleting(false);
    }
  }

  async function handleDuplicate(p: Property) {
    const nextNum =
      properties.reduce(
        (max, prop) => Math.max(max, Number(prop.propertyId.replace("PR-", ""))),
        1000,
      ) + 1;
    await fetch("/api/admin/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...p,
        id: `${p.id}-copy`,
        propertyId: `PR-${nextNum}`,
        title: `${p.title} (Copy)`,
      }),
    });
    await fetchData();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">Properties</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Manage your property listings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/properties/new"
            className="btn-neu-accent flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus size={16} />
            Add Property
          </Link>
        </div>
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

      {loading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 size={24} className="animate-spin" style={{ color: "var(--color-ink-faint)" }} />
        </div>
      ) : (
        <>
          {properties.length > 0 && (
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
              <FilterTabs
                label="User"
                options={userOptions}
                optionLabels={userOptions.map((id) => userMap.get(id) || id)}
                active={activeUser}
                onSelect={setActiveUser}
              />
            </div>
          )}
          {filtered.length === 0 ? (
            <p className="mt-12 text-center text-sm" style={{ color: "var(--color-ink-faint)" }}>
              {properties.length === 0 ? "No properties yet" : "No properties match the selected filters"}
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
                    <th className="pb-3 pr-4 font-semibold">Landlord</th>
                    <th className="pb-3 pr-4 font-semibold">Type</th>
                    <th className="pb-3 pr-4 font-semibold">Price</th>
                    <th className="pb-3 pr-4 font-semibold">Area</th>
                    <th className="pb-3 pr-4 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t"
                      style={{ borderColor: "var(--color-shadow-dark)" }}
                    >
                      <td className="py-3 pr-2">
                        <button onClick={() => toggleSelect(p.id)} className="flex items-center">
                          {selectedIds.has(p.id) ? (
                            <CheckSquare size={16} style={{ color: "var(--color-accent)" }} />
                          ) : (
                            <Square size={16} style={{ color: "var(--color-ink-faint)" }} />
                          )}
                        </button>
                      </td>
                      <td className="py-3 pr-4 font-medium">{p.title}</td>
                      <td className="py-3 pr-4" style={{ color: "var(--color-ink-soft)" }}>
                        <span className="inline-flex items-center gap-1">
                          <User size={11} />
                          {userMap.get(p.landlordId ?? "") || "—"}
                        </span>
                      </td>
                      <td className="py-3 pr-4" style={{ color: "var(--color-ink-soft)" }}>{p.type}</td>
                      <td className="py-3 pr-4" style={{ color: "var(--color-ink-soft)" }}>
                        UGX {(p.price / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 pr-4" style={{ color: "var(--color-ink-soft)" }}>{p.area}</td>
                      <td
                        className="py-3 pr-4 font-semibold"
                        style={{
                          color:
                            p.status === "Available"
                              ? "var(--color-accent)"
                              : p.status === "Let"
                                ? "#059669"
                                : "#d97706",
                        }}
                      >
                        {p.status}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/properties/${p.id}`}
                            className="icon-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                            style={{ color: "var(--color-ink-soft)" }}
                          >
                            <Pencil size={13} />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDuplicate(p)}
                            className="icon-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                            style={{ color: "var(--color-ink-soft)" }}
                          >
                            <Copy size={13} />
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
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
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="surface-raised rounded-2xl p-4"
                  style={{ border: selectedIds.has(p.id) ? "2px solid var(--color-accent)" : "none" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <button onClick={() => toggleSelect(p.id)} className="mt-0.5 shrink-0">
                        {selectedIds.has(p.id) ? (
                          <CheckSquare size={18} style={{ color: "var(--color-accent)" }} />
                        ) : (
                          <Square size={18} style={{ color: "var(--color-ink-faint)" }} />
                        )}
                      </button>
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-snug break-words">{p.title}</p>
                        <p className="mt-1 text-xs" style={{ color: "var(--color-ink-soft)" }}>
                          <span className="inline-flex items-center gap-1">
                            <User size={11} />
                            {userMap.get(p.landlordId ?? "") || "—"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                      style={{
                        background:
                          p.status === "Available"
                            ? "var(--color-accent)"
                            : p.status === "Let"
                              ? "#059669"
                              : "#d97706",
                      }}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--color-ink-soft)" }}>
                    <span>{p.type}</span>
                    <span>UGX {(p.price / 1000000).toFixed(1)}M</span>
                    <span>{p.area}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/admin/properties/${p.id}`}
                      className="icon-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                      style={{ color: "var(--color-ink-soft)" }}
                    >
                      <Pencil size={12} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDuplicate(p)}
                      className="icon-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                      style={{ color: "var(--color-ink-soft)" }}
                    >
                      <Copy size={12} />
                      Duplicate
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
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
