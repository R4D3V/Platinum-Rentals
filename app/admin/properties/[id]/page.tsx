"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  ArrowLeft,
  X,
  Check,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import type { Property } from "@/lib/data";

const TYPES = ["Apartment", "Villa", "Townhouse", "Studio", "Commercial"] as const;
const STATUSES = ["Available", "Let", "Under Offer"] as const;

export default function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    fetch(`/api/admin/properties/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          id: data.id,
          propertyId: data.propertyId,
          title: data.title,
          type: data.type,
          price: data.price,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          parking: data.parking,
          size: data.size,
          location: data.location,
          area: data.area,
          description: data.description,
          features: data.features ?? [],
          status: data.status,
          availableFrom: data.availableFrom ?? undefined,
          gradient: data.gradient,
          images: data.images ?? [],
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch(`/api/admin/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/admin/properties");
    } finally {
      setSaving(false);
    }
  }

  function addFeature() {
    const val = featureInput.trim();
    if (!val || !form) return;
    setForm({ ...form, features: [...form.features, val] });
    setFeatureInput("");
  }

  function removeFeature(i: number) {
    if (!form) return;
    setForm({
      ...form,
      features: form.features.filter((_, idx) => idx !== i),
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 size={24} className="animate-spin" style={{ color: "var(--color-ink-faint)" }} />
      </div>
    );
  }

  if (!form) {
    return (
      <p className="py-16 text-center text-sm" style={{ color: "var(--color-ink-faint)" }}>
        Property not found
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/properties"
            className="mb-2 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--color-ink-faint)" }}
          >
            <ArrowLeft size={16} />
            Back to properties
          </Link>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Edit Property
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-ink-soft)" }}>
            {form.propertyId} — {form.title}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Title
          </label>
          <input
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            ID (slug)
          </label>
          <input
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Images
          </label>

          <CldUploadWidget
            uploadPreset="platinum-rentals"
            onSuccess={(result) => {
              const url = (result as any).info?.secure_url;
              if (url) setForm({ ...form, images: [...form.images, url] });
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="btn-neu mb-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
              >
                <Upload size={16} />
                Upload Images
              </button>
            )}
          </CldUploadWidget>

          {form.images.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-2">
              {form.images.map((url, i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg">
                  <img
                    src={url}
                    alt={`Upload ${i + 1}`}
                    className="h-20 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        images: form.images.filter((_, idx) => idx !== i),
                      })
                    }
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            rows={3}
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm font-mono text-xs"
            placeholder="Or paste Cloudinary URLs, one per line"
            value={form.images.join("\n")}
            onChange={(e) =>
              setForm({
                ...form,
                images: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
          <p className="mt-1 text-xs" style={{ color: "var(--color-ink-faint)" }}>
            {form.images.length} image{form.images.length !== 1 ? "s" : ""} added
          </p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Type
          </label>
          <select
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as any })}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Status
          </label>
          <select
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as any })}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Price (UGX)
          </label>
          <input
            type="number"
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Bedrooms
          </label>
          <input
            type="number"
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.bedrooms}
            onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Bathrooms
          </label>
          <input
            type="number"
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.bathrooms}
            onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Parking
          </label>
          <input
            type="number"
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.parking}
            onChange={(e) => setForm({ ...form, parking: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Size (sqm)
          </label>
          <input
            type="number"
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.size}
            onChange={(e) => setForm({ ...form, size: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Area
          </label>
          <input
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Available From
          </label>
          <input
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.availableFrom ?? ""}
            onChange={(e) => setForm({ ...form, availableFrom: e.target.value || undefined })}
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Location
          </label>
          <input
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Description
          </label>
          <textarea
            rows={5}
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Features
          </label>
          <div className="flex flex-wrap gap-2">
            {form.features.map((f, i) => (
              <span
                key={i}
                className="surface-raised inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
              >
                {f}
                <button onClick={() => removeFeature(i)} className="opacity-60 hover:opacity-100">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              className="input-neu flex-1 rounded-xl px-4 py-2 text-sm"
              placeholder="Add a feature..."
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFeature();
                }
              }}
            />
            <button
              onClick={addFeature}
              className="btn-neu flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold"
            >
              <Check size={14} />
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3 border-t pt-6" style={{ borderColor: "var(--color-shadow-dark)" }}>
        <Link
          href="/admin/properties"
          className="btn-neu rounded-xl px-5 py-2.5 text-sm font-semibold"
        >
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-neu-accent flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          Save Changes
        </button>
      </div>
    </div>
  );
}
