"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, FileText, Mail, Send } from "lucide-react";
import FadeIn from "@/components/FadeIn";

import { submitFormToWhatsApp } from "@/lib/whatsapp";

export default function LandlordPage() {
  return (
    <main>
      <section className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <ArrowLeft size={16} />
              Back to website
            </Link>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="surface-raised-lg overflow-hidden rounded-3xl">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* Left — Branding */}
                <div className="glass-dark-panel flex flex-col justify-between p-10 sm:p-12">
                  <div>
                    <div
                      className="glass-inner-panel mb-10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest"
                      style={{ color: "rgba(255,255,255,0.88)" }}
                    >
                      <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_0_4px_rgba(74,222,128,0.15)]" />
                      For Landlords
                    </div>

                    <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                      Submit Your
                      <br />
                      Property
                    </h1>
                    <p
                      className="mt-4 max-w-sm text-base leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      Tell us about your property and we&apos;ll get back to you
                      within one business day. List with a team that manages
                      like it&apos;s their own.
                    </p>
                  </div>

                  <div className="mt-12 hidden lg:block">
                    <Image
                      src="/logo/platinum-rentals-logo-full.svg"
                      alt="Platinum Rentals"
                      width={168}
                      height={76}
                      className="h-12 w-auto rounded-xl bg-white p-2"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Right — Form */}
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                  <div className="mb-8">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Property Submission
                    </span>
                    <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                      Landlords: Submit Your Properties
                    </h2>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Fill in your details and property information below.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) =>
                      submitFormToWhatsApp(e, (data) => {
                        const name = data.get("name") || "—";
                        const description = data.get("description") || "—";
                        const email = data.get("email") || "—";
                        return [
                          "Hello Platinum Rentals, I'd like to submit my property.",
                          `Name: ${name}`,
                          `Property Description: ${description}`,
                          `Email: ${email}`,
                        ].join("\n");
                      })
                    }
                    className="space-y-5"
                  >
                    <div>
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide"
                        style={{ color: "var(--color-ink-faint)" }}
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <span
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                          style={{ color: "var(--color-ink-faint)" }}
                        >
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Enter your full name"
                          className="input-neu w-full rounded-2xl py-4 pl-12 pr-4 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide"
                        style={{ color: "var(--color-ink-faint)" }}
                      >
                        Property Description
                      </label>
                      <div className="relative">
                        <span
                          className="pointer-events-none absolute left-4 top-4"
                          style={{ color: "var(--color-ink-faint)" }}
                        >
                          <FileText size={18} />
                        </span>
                        <textarea
                          rows={4}
                          name="description"
                          placeholder="Tell us about your property — location, type, number of units..."
                          className="input-neu w-full resize-none rounded-2xl py-4 pl-12 pr-4 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide"
                        style={{ color: "var(--color-ink-faint)" }}
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <span
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                          style={{ color: "var(--color-ink-faint)" }}
                        >
                          <Mail size={18} />
                        </span>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Enter your email"
                          className="input-neu w-full rounded-2xl py-4 pl-12 pr-4 text-sm"
                        />
                      </div>
                    </div>

                    <div></div>

                    <button
                      type="submit"
                      className="btn-neu-accent mt-2 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold tracking-wide text-white"
                    >
                      <Send size={16} />
                      Submit Property
                    </button>
                  </form>

                  <p
                    className="mt-6 text-xs leading-relaxed"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    We&apos;ll review your submission and respond within one
                    business day. Your information is kept confidential.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
