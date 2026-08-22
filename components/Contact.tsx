"use client";

import { Phone, Mail, MapPin, Send } from "lucide-react";
import { submitFormToWhatsApp } from "@/lib/whatsapp";
import { SERVICES } from "@/lib/services";
import FadeIn from "@/components/FadeIn";

export default function Contact({ prefillService }: { prefillService?: string }) {
  const defaultMessage = prefillService
    ? `I'd like to ask about ${prefillService}.`
    : "";

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn direction="left">
            <div className="flex flex-col gap-6">
              <div className="surface-raised flex flex-col justify-between gap-8 rounded-3xl p-8">
                <div className="space-y-6">
                  <a href="tel:+256785175160" className="flex items-center gap-4">
                    <span className="icon-chip flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                      <Phone size={20} style={{ color: "var(--color-accent)" }} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>Phone</p>
                      <p className="font-semibold">+256 785 175160</p>
                    </div>
                  </a>
                  <a href="mailto:info@ninetyninepropertyconsultants.ug" className="flex items-center gap-4">
                    <span className="icon-chip flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                      <Mail size={20} style={{ color: "var(--color-accent)" }} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>Email</p>
                      <p className="font-semibold">info@ninetyninepropertyconsultants.ug</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <span className="icon-chip flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                      <MapPin size={20} style={{ color: "var(--color-accent)" }} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>Office</p>
                      <p className="font-semibold">Kampala, Uganda</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm italic" style={{ color: "var(--color-ink-faint)" }}>
                  &ldquo;Managing your property like it&rsquo;s our own.&rdquo;
                </p>
              </div>

              <div className="surface-raised overflow-hidden rounded-3xl">
                <iframe
                  title="Ninety Nine Property Consultants office — Kampala, Uganda"
                  src="https://www.google.com/maps?q=Kampala,Uganda&z=12&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={150}>
            <form
              className="surface-raised rounded-3xl p-8"
              onSubmit={(e) =>
                submitFormToWhatsApp(e, (data) => {
                  const name = data.get("name") || "—";
                  const email = data.get("email") || "—";
                  const service = data.get("service") || "—";
                  const message = data.get("message") || "—";
                  return [
                    "Hello Ninety Nine Property Consultants, I have an enquiry.",
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Service of interest: ${service}`,
                    `Message: ${message}`,
                  ].join("\n");
                })
              }
            >
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
                  Full name
                </label>
                <input type="text" name="name" required placeholder="Jane Doe" className="input-neu w-full rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
                  Email address
                </label>
                <input type="email" name="email" placeholder="you@email.com" className="input-neu w-full rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
                  Service of interest
                </label>
                <select
                  name="service"
                  required
                  defaultValue={prefillService || ""}
                  className="input-neu w-full rounded-xl px-4 py-3 text-sm"
                >
                  <option value="" disabled>Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-ink-faint)" }}>
                  Tell us about your property
                </label>
                <textarea
                  rows={4}
                  name="message"
                  defaultValue={defaultMessage}
                  placeholder="Location, property type, number of units..."
                  className="input-neu w-full resize-none rounded-xl px-4 py-3 text-sm"
                />
              </div>
              <button
                type="submit"
                className="btn-neu-accent mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white sm:w-auto sm:px-10"
              >
                <Send size={16} />
                Send via WhatsApp
              </button>
              <p className="mt-3 text-xs" style={{ color: "var(--color-ink-faint)" }}>
                Opens WhatsApp with your details pre-filled — nothing is sent until you hit send there.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
