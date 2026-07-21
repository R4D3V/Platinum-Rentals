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
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8">
        <FadeIn direction="left">
          <div>
            <span
              className="surface-raised-sm inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Property Management &middot; Greater Kampala
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
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
              Browse available rental properties across Kampala — managed
              end-to-end by Platinum Rentals with transparent reporting and
              professional tenant screening.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/properties"
                className="btn-neu-accent flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white sm:text-base"
              >
                Browse Properties
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+256785175160"
                className="btn-neu flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold sm:text-base"
              >
                <PhoneCall size={18} style={{ color: "var(--color-accent)" }} />
                Call Us
              </a>
            </div>

            <div
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <span>
                <strong style={{ color: "var(--color-ink)" }}>{propertyCount ?? "—"}</strong>{" "}
                Properties listed
              </span>
              <span>
                <strong style={{ color: "var(--color-ink)" }}>5+</strong>{" "}
                Neighbourhoods covered
              </span>
              <span>
                <strong style={{ color: "var(--color-ink)" }}>0%</strong> Fee if
                rent isn&apos;t collected
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Search card */}
        <FadeIn direction="right" delay={150}>
          <div className="surface-raised-lg rounded-3xl p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="icon-chip flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                <Search size={22} style={{ color: "var(--color-accent)" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold">Search Properties</h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  Find your next rental in Kampala
                </p>
              </div>
            </div>

            <form action="/properties" className="space-y-4">
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
                      size={16}
                      style={{ color: "var(--color-ink-faint)" }}
                    />
                  </span>
                  <select
                    name="bedrooms"
                    className="input-neu w-full appearance-none rounded-xl py-3 pl-10 pr-4 text-sm"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    Property Type
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Home
                        size={16}
                        style={{ color: "var(--color-ink-faint)" }}
                      />
                    </span>
                    <select
                      name="type"
                      className="input-neu w-full appearance-none rounded-xl py-3 pl-10 pr-4 text-sm"
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
                        size={16}
                        style={{ color: "var(--color-ink-faint)" }}
                      />
                    </span>
                    <select
                      name="area"
                      className="input-neu w-full appearance-none rounded-xl py-3 pl-10 pr-4 text-sm"
                    >
                      {AREAS.map((a) => (
                        <option key={a} value={a === "All Areas" ? "" : a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-neu-accent w-full rounded-xl py-3.5 text-sm font-semibold text-white"
              >
                Search Properties
              </button>
            </form>

            <p
              className="mt-3 text-center text-xs"
              style={{ color: "var(--color-ink-faint)" }}
            >
              Browse all listings with advanced filters on the properties page.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
