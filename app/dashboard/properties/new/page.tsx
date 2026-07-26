"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  ArrowLeft,
  X,
  Check,
  Save,
  Trash2,
  Upload,
  Plus,
  MinusCircle,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { fetcher } from "@/lib/fetcher";
import { AREAS } from "@/components/AreasWeServe";

const TYPES = ["Apartment", "Villa", "Townhouse", "Studio", "Commercial"] as const;
const STATUSES = ["Available", "Let", "Under Offer"] as const;

const INITIAL_FORM = {
  id: "",
  propertyId: "",
  title: "",
  type: "Apartment" as const,
  price: 0,
  bedrooms: 1,
  bathrooms: 1,
  parking: 1,
  size: 50,
  location: "",
  area: "",
  description: "",
  features: [] as string[],
  status: "Available" as const,
  availableFrom: undefined as string | undefined,
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  images: [] as string[],
  featured: false,
};

export default function NewListingPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const [areaList, setAreaList] = useState<string[]>([]);
  const areasInitialized = useRef(false);
  const [typeList, setTypeList] = useState<string[]>([...TYPES]);
  const [typeInput, setTypeInput] = useState("");

  const { data: allProperties = [] } = useSWR<{ area: string; location: string }[]>("/api/properties", fetcher);

  useSWR<{ propertyId: string }[]>("/api/admin/properties", fetcher, {
    onSuccess(data) {
      const max = data.reduce((m, p) => {
        const n = parseInt(p.propertyId.replace("PR-", ""), 10);
        return isNaN(n) ? m : Math.max(m, n);
      }, 999);
      setForm((f) => ({ ...f, propertyId: `PR-${max + 1}` }));
    },
  });

  useEffect(() => {
    if (allProperties.length > 0 && !areasInitialized.current) {
      areasInitialized.current = true;
      const defaultAreas = [
        ...new Set([
          ...AREAS.map((a) => a.name),
          ...allProperties.map((p) => p.area),
        ]),
      ].sort();
      setAreaList(defaultAreas);
    }
  }, [allProperties]);

  const areas = useMemo(
    () => [...new Set([...areaList, ...allProperties.map((p) => p.area)])].sort(),
    [areaList, allProperties],
  );

  function addArea() {
    const val = areaInput.trim();
    if (!val || areas.includes(val)) return;
    setAreaList((prev) => [...prev, val].sort());
    setAreaInput("");
    setForm((f) => ({ ...f, area: val, location: val }));
  }

  function removeArea(area: string) {
    setAreaList((prev) => prev.filter((a) => a !== area));
    if (form.area === area) {
      setForm((f) => ({ ...f, area: "", location: "" }));
    }
  }

  function addType() {
    const val = typeInput.trim();
    if (!val || typeList.includes(val)) return;
    setTypeList((prev) => [...prev, val]);
    setTypeInput("");
    setForm((f) => ({ ...f, type: val as any }));
  }

  function removeType(type: string) {
    setTypeList((prev) => prev.filter((t) => t !== type));
    if (form.type === type) {
      setForm((f) => ({ ...f, type: "" as any }));
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const slug =
        form.id ||
        form.title
          .slice(0, 20)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ||
        `property-${Date.now()}`;
      await fetch("/api/user/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: slug }),
      });
      router.push("/dashboard/properties");
    } finally {
      setSaving(false);
    }
  }

  function addFeature() {
    const val = featureInput.trim();
    if (!val) return;
    setForm({ ...form, features: [...form.features, val] });
    setFeatureInput("");
  }

  function removeFeature(i: number) {
    setForm({
      ...form,
      features: form.features.filter((_, idx) => idx !== i),
    });
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/properties"
            className="mb-2 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--color-ink-faint)" }}
          >
            <ArrowLeft size={16} />
            Back to listings
          </Link>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Add Listing
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Create a new property listing
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
            placeholder="Auto-generated from title"
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
            options={{ multiple: true }}
            onSuccess={(result) => {
              const url = (result as any).info?.secure_url;
              if (url) setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
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
                <div key={url} className="group relative h-20 overflow-hidden rounded-lg">
                  <Image
                    src={url}
                    alt={`Upload ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 33vw, 150px"
                    className="object-cover"
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
            <option value="">Select type...</option>
            {typeList.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {typeList.map((t) => (
              <span
                key={t}
                className="surface-raised inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
              >
                {t}
                <button
                  type="button"
                  onClick={() => removeType(t)}
                  className="opacity-50 hover:opacity-100"
                >
                  <MinusCircle size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              className="input-neu flex-1 rounded-xl px-3 py-1.5 text-xs"
              placeholder="Add new type..."
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addType();
                }
              }}
            />
            <button
              type="button"
              onClick={addType}
              className="btn-neu flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold"
            >
              <Plus size={12} />
              Add
            </button>
          </div>
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
            Featured
          </label>
          <label className="surface-raised flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 rounded accent-current"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            <span style={{ color: "var(--color-ink-soft)" }}>
              {form.featured ? "Listed as featured" : "Mark as featured"}
            </span>
          </label>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
            Area
          </label>
          <select
            className="input-neu w-full rounded-xl px-4 py-2.5 text-sm"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value, location: e.target.value })}
          >
            <option value="">Select area...</option>
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {areaList.map((a) => (
              <span
                key={a}
                className="surface-raised inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
              >
                {a}
                <button
                  type="button"
                  onClick={() => removeArea(a)}
                  className="opacity-50 hover:opacity-100"
                >
                  <MinusCircle size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              className="input-neu flex-1 rounded-xl px-3 py-1.5 text-xs"
              placeholder="Add new area..."
              value={areaInput}
              onChange={(e) => setAreaInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addArea();
                }
              }}
            />
            <button
              type="button"
              onClick={addArea}
              className="btn-neu flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold"
            >
              <Plus size={12} />
              Add
            </button>
          </div>
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
                key={`f-${i}`}
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
          href="/dashboard/properties"
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
          Create Listing
        </button>
      </div>
    </div>
  );
}
