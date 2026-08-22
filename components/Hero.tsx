"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  PhoneCall,
  Search,
  BedDouble,
  Home,
  MapPin,
  Ruler,
  CheckCircle2,
  TrendingUp,
  Shield,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

const BEDROOM_OPTIONS = ["Any", "Studio", "1", "2", "3", "4+"];
const TYPES = ["All Types", "Apartment", "Villa", "Townhouse", "Studio"];
const AREAS = [
  "All Areas",
  "Kololo",
  "Bugolobi",
  "Nakasero",
  "Munyonyo",
  "Ntinda",
  "Kisaasi",
];
const LAND_AREAS = [
  "All Areas",
  "Wakiso",
  "Entebbe",
  "Mukono",
  "Gayaza",
  "Kampala",
  "Jinja",
];
const LAND_TYPES = [
  "All Types",
  "Residential",
  "Commercial",
  "Agricultural",
  "Mixed Use",
];

const TYPEWRITER_PHRASES = [
  "That Suits You Best",
  "Perfect for You",
  "Fitting Your Lifestyle",
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [propertyCount, setPropertyCount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"properties" | "land">(
    "properties"
  );

  useEffect(() => {
    fetch("/api/properties/count")
      .then((r) => r.json())
      .then((d) => setPropertyCount(d.count))
      .catch(() => setPropertyCount(0));
  }, []);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
        if (typedText.length + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setTypedText(currentPhrase.slice(0, typedText.length - 1));
        if (typedText.length - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-4 pb-12 pt-4 sm:px-6 lg:px-10"
    >
      {/* Decorative ring accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
        {/* Left — copy */}
        <FadeIn direction="left">
          <div>
            {/* Badge */}
            <span
              className="surface-raised-sm inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              Rental Management &amp; Land Sales · Greater Kampala
            </span>

            {/* Headline */}
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
              Find The Property
              <br />
              <span style={{ color: "var(--color-accent)" }}>
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Browse available rental properties and verified land across
              Kampala — managed end-to-end by Ninety Nine Property Consultants
              with transparent reporting and professional tenant screening.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/properties"
                className="btn-neu-accent flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white sm:text-base"
              >
                Browse Properties
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/land"
                className="btn-neu flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold sm:text-base"
                style={{ color: "var(--color-ink)" }}
              >
                <MapPin size={18} style={{ color: "var(--color-accent)" }} />
                Buy Land
              </Link>
              <a
                href="tel:+256785175160"
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: "var(--color-ink-soft)" }}
              >
                <PhoneCall size={16} style={{ color: "var(--color-accent)" }} />
                Call Us
              </a>
            </div>

            {/* Stat pills */}
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                {
                  icon: TrendingUp,
                  value: propertyCount ?? "—",
                  label: "Properties Listed",
                },
                {
                  icon: MapPin,
                  value: "5+",
                  label: "Neighbourhoods",
                },
                {
                  icon: Shield,
                  value: "0%",
                  label: "Fee if rent isn't collected",
                },
                {
                  icon: CheckCircle2,
                  value: "100%",
                  label: "Verified Listings",
                },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="surface-raised-sm flex items-center gap-2.5 rounded-xl px-4 py-2.5"
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span>
                    <strong className="text-sm font-extrabold">{value}</strong>
                    <span
                      className="ml-1.5 text-xs"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      {label}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Right — Search card */}
        <FadeIn direction="right" delay={150}>
          <div className="surface-raised-lg rounded-3xl p-1.5">
            {/* Tab switcher */}
            <div
              className="mb-1 flex rounded-2xl p-1"
              style={{ background: "var(--glass-bg-soft)" }}
            >
              <button
                onClick={() => setActiveTab("properties")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeTab === "properties"
                    ? "btn-neu-accent text-white"
                    : "text-ink-faint hover:text-ink"
                }`}
                style={
                  activeTab !== "properties"
                    ? { color: "var(--color-ink-soft)" }
                    : {}
                }
              >
                <Home size={15} />
                Properties
              </button>
              <button
                onClick={() => setActiveTab("land")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeTab === "land"
                    ? "btn-neu-accent text-white"
                    : "text-ink-faint hover:text-ink"
                }`}
                style={
                  activeTab !== "land"
                    ? { color: "var(--color-ink-soft)" }
                    : {}
                }
              >
                <MapPin size={15} />
                Land
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="icon-chip flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                  <Search size={20} style={{ color: "var(--color-accent)" }} />
                </div>
                <div>
                  <h2 className="text-base font-bold">
                    {activeTab === "properties"
                      ? "Search Properties"
                      : "Search Land"}
                  </h2>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    {activeTab === "properties"
                      ? "Find your next rental in Kampala"
                      : "Browse verified land for sale"}
                  </p>
                </div>
              </div>

              {/* Properties form */}
              {activeTab === "properties" && (
                <form action="/properties" className="space-y-3.5">
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Bedrooms
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                        <BedDouble
                          size={15}
                          style={{ color: "var(--color-ink-faint)" }}
                        />
                      </span>
                      <select
                        name="bedrooms"
                        className="input-neu w-full appearance-none rounded-xl py-2.5 pl-10 pr-4 text-sm"
                      >
                        {BEDROOM_OPTIONS.map((b) => (
                          <option key={b} value={b === "Any" ? "" : b}>
                            {b === "Any"
                              ? "Any Bedrooms"
                              : b === "Studio"
                                ? "Studio"
                                : b === "4+"
                                  ? "4+ Bedrooms"
                                  : `${b} Bedroom${b !== "1" ? "s" : ""}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-ink-faint)" }}
                      >
                        Type
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                          <Home
                            size={15}
                            style={{ color: "var(--color-ink-faint)" }}
                          />
                        </span>
                        <select
                          name="type"
                          className="input-neu w-full appearance-none rounded-xl py-2.5 pl-10 pr-4 text-sm"
                        >
                          {TYPES.map((t) => (
                            <option key={t} value={t === "All Types" ? "" : t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-ink-faint)" }}
                      >
                        Area
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                          <MapPin
                            size={15}
                            style={{ color: "var(--color-ink-faint)" }}
                          />
                        </span>
                        <select
                          name="area"
                          className="input-neu w-full appearance-none rounded-xl py-2.5 pl-10 pr-4 text-sm"
                        >
                          {AREAS.map((a) => (
                            <option
                              key={a}
                              value={a === "All Areas" ? "" : a}
                            >
                              {a}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-neu-accent w-full rounded-xl py-3 text-sm font-semibold text-white"
                  >
                    Search Properties
                  </button>
                </form>
              )}

              {/* Land form */}
              {activeTab === "land" && (
                <form action="/land" className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-ink-faint)" }}
                      >
                        Land Type
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                          <Home
                            size={15}
                            style={{ color: "var(--color-ink-faint)" }}
                          />
                        </span>
                        <select
                          name="type"
                          className="input-neu w-full appearance-none rounded-xl py-2.5 pl-10 pr-4 text-sm"
                        >
                          {LAND_TYPES.map((t) => (
                            <option key={t} value={t === "All Types" ? "" : t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-ink-faint)" }}
                      >
                        Area
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                          <MapPin
                            size={15}
                            style={{ color: "var(--color-ink-faint)" }}
                          />
                        </span>
                        <select
                          name="area"
                          className="input-neu w-full appearance-none rounded-xl py-2.5 pl-10 pr-4 text-sm"
                        >
                          {LAND_AREAS.map((a) => (
                            <option
                              key={a}
                              value={a === "All Areas" ? "" : a}
                            >
                              {a}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Size (Decimals)
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                        <Ruler
                          size={15}
                          style={{ color: "var(--color-ink-faint)" }}
                        />
                      </span>
                      <select
                        name="size"
                        className="input-neu w-full appearance-none rounded-xl py-2.5 pl-10 pr-4 text-sm"
                      >
                        <option value="">Any Size</option>
                        <option value="0.25">¼ Decimal</option>
                        <option value="0.5">½ Decimal</option>
                        <option value="1">1 Decimal</option>
                        <option value="2">2+ Decimals</option>
                        <option value="5">5+ Decimals</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-neu-accent w-full rounded-xl py-3 text-sm font-semibold text-white"
                  >
                    Search Land
                  </button>
                </form>
              )}

              <p
                className="mt-3 text-center text-xs"
                style={{ color: "var(--color-ink-faint)" }}
              >
                Advanced filters available on the{" "}
                {activeTab === "properties" ? (
                  <Link
                    href="/properties"
                    className="underline"
                    style={{ color: "var(--color-accent)" }}
                  >
                    properties page
                  </Link>
                ) : (
                  <Link
                    href="/land"
                    className="underline"
                    style={{ color: "var(--color-accent)" }}
                  >
                    land page
                  </Link>
                )}
                .
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
