"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  Loader2,
  ArrowLeft,
  Shield,
  ShieldCheck,
  Building2,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Property } from "@/lib/data";

interface UserInfo {
  id: string;
  name: string | null;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: string | null;
}

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [usersRes, propsRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch(`/api/admin/users/${id}/properties`),
      ]);
      const users: UserInfo[] = await usersRes.json();
      const props: Property[] = await propsRes.json();
      setUser(users.find((u) => u.id === id) ?? null);
      setProperties(props);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleDelete(propertyId: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/properties/${propertyId}`, { method: "DELETE" });
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 size={24} className="animate-spin" style={{ color: "var(--color-ink-faint)" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <p className="py-16 text-center text-sm" style={{ color: "var(--color-ink-faint)" }}>
        User not found
      </p>
    );
  }

  return (
    <div>
      <Link
        href="/admin/users"
        className="mb-2 inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color: "var(--color-ink-faint)" }}
      >
        <ArrowLeft size={16} />
        Back to users
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold"
          style={{ color: "var(--color-accent)", background: "var(--color-shadow-light)" }}
        >
          {user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">{user.name || "Unnamed"}</h1>
          <div className="mt-1 flex items-center gap-3 text-sm" style={{ color: "var(--color-ink-soft)" }}>
            <span>{user.email}</span>
            <span>&middot;</span>
            {user.role === "admin" ? (
              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ background: "var(--color-accent)", color: "#fff" }}
              >
                <ShieldCheck size={12} />
                admin
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ color: "var(--color-ink-faint)", border: "1px solid var(--color-shadow-dark)" }}
              >
                <Shield size={12} />
                user
              </span>
            )}
            <span>&middot;</span>
            <span>Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</span>
            <span>&middot;</span>
            <span>{user.emailVerified ? "Verified" : "Not verified"}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <Building2 size={18} style={{ color: "var(--color-accent)" }} />
          Listings ({properties.length})
        </h2>

        {properties.length === 0 ? (
          <p className="mt-4 text-sm" style={{ color: "var(--color-ink-faint)" }}>
            This user has no listings.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ color: "var(--color-ink-faint)" }}>
                  <th className="pb-3 pr-4 font-semibold">ID</th>
                  <th className="pb-3 pr-4 font-semibold">Title</th>
                  <th className="pb-3 pr-4 font-semibold">Type</th>
                  <th className="pb-3 pr-4 font-semibold">Price</th>
                  <th className="pb-3 pr-4 font-semibold">Area</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t"
                    style={{ borderColor: "var(--color-shadow-dark)" }}
                  >
                    <td className="py-3 pr-4 font-mono text-xs">{p.propertyId}</td>
                    <td className="py-3 pr-4 font-medium">{p.title}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--color-ink-soft)" }}>{p.type}</td>
                    <td className="py-3 pr-4 whitespace-nowrap" style={{ color: "var(--color-ink-soft)" }}>
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
                          onClick={() => handleDelete(p.id, p.title)}
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
        )}
      </div>
    </div>
  );
}
