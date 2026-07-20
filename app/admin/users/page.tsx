"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Shield,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  banned: boolean | null;
  createdAt: string | null;
  listingsCount?: number;
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

const EMPTY_FORM: UserForm = {
  name: "",
  email: "",
  password: "",
  role: "user",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<UserForm>(EMPTY_FORM);
  const [error, setError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    try {
      const [usersRes, propsRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/properties"),
      ]);
      if (!usersRes.ok) throw new Error("Failed to fetch");
      const usersData: UserRow[] = await usersRes.json();
      const propsData: { landlordId: string | null }[] = await propsRes.json();
      const counts: Record<string, number> = {};
      for (const p of propsData) {
        if (p.landlordId) counts[p.landlordId] = (counts[p.landlordId] || 0) + 1;
      }
      setUsers(usersData.map((u) => ({ ...u, listingsCount: counts[u.id] || 0 })));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setShowModal(true);
  }

  function openEdit(u: UserRow) {
    setEditingId(u.id);
    setForm({ name: u.name ?? "", email: u.email, password: "", role: u.role });
    setError("");
    setShowModal(true);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        const body: Record<string, unknown> = {
          name: form.name,
          email: form.email,
          role: form.role,
        };
        if (form.password) body.password = form.password;
        const res = await fetch(`/api/admin/users/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || err.message || "Failed to update");
        }
      } else {
        if (!form.password) {
          throw new Error("Password is required");
        }
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || err.message || "Failed to create");
        }
      }
      setShowModal(false);
      await fetchUsers();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(u: UserRow) {
    if (!confirm(`Are you sure you want to delete ${u.name || u.email}? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || err.message || "Failed to delete");
      return;
    }
    await fetchUsers();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">Users</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Manage user accounts, roles, and credentials
          </p>
        </div>
        <button
          onClick={openAdd}
          className="btn-neu-accent flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {loading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 size={24} className="animate-spin" style={{ color: "var(--color-ink-faint)" }} />
        </div>
      ) : users.length === 0 ? (
        <p className="mt-12 text-center text-sm" style={{ color: "var(--color-ink-faint)" }}>
          No users registered yet
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ color: "var(--color-ink-faint)" }}>
                <th className="pb-3 pr-4 font-semibold">Name</th>
                <th className="pb-3 pr-4 font-semibold">Email</th>
                <th className="pb-3 pr-4 font-semibold">Role</th>
                <th className="pb-3 pr-4 font-semibold">Listings</th>
                <th className="pb-3 pr-4 font-semibold">Verified</th>
                <th className="pb-3 pr-4 font-semibold">Joined</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-t"
                  style={{ borderColor: "var(--color-shadow-dark)" }}
                >
                  <td className="py-3 pr-4 font-medium">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold"
                        style={{ color: "var(--color-accent)", background: "var(--color-shadow-light)" }}
                      >
                        {u.name?.charAt(0)?.toUpperCase() || u.email.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate max-w-[160px]">{u.name || "Unnamed"}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4" style={{ color: "var(--color-ink-soft)" }}>
                    {u.email}
                  </td>
                  <td className="py-3 pr-4">
                    {u.role === "admin" ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{ background: "var(--color-accent)", color: "#fff" }}
                      >
                        <ShieldCheck size={12} />
                        admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{ color: "var(--color-ink-faint)", border: "1px solid var(--color-shadow-dark)" }}
                      >
                        <Shield size={12} />
                        user
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition hover:opacity-80"
                      style={{ color: "var(--color-accent)", background: "var(--color-shadow-light)" }}
                    >
                      <Building2 size={12} />
                      {u.listingsCount ?? 0}
                    </Link>
                  </td>
                  <td className="py-3 pr-4" style={{ color: u.emailVerified ? "var(--color-accent)" : "var(--color-ink-faint)" }}>
                    {u.emailVerified ? "Yes" : "No"}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap" style={{ color: "var(--color-ink-faint)" }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(u)}
                        className="icon-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                        style={{ color: "var(--color-ink-soft)" }}
                      >
                        <Pencil size={13} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u)}
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

      {showModal && (
        <div className="glass-modal-backdrop fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-12">
          <div className="surface-raised-lg w-full max-w-lg rounded-3xl p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">
                {editingId ? "Edit User" : "Add User"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="glass-modal-close flex h-9 w-9 items-center justify-center rounded-xl"
              >
                <X size={16} />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
                  Name
                </label>
                <input
                  className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
                  {editingId ? "New Password (leave blank to keep current)" : "Password"}
                </label>
                <input
                  type="password"
                  className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
                  Role
                </label>
                <select
                  className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="btn-neu rounded-xl px-5 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-neu-accent flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {editingId ? "Save Changes" : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
