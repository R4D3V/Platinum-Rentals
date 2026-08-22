"use client";

import { MessageCircle, Phone, Send, CheckCircle2 } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import FadeIn from "@/components/FadeIn";

export default function FinalCta() {
  const whatsappMessage = encodeURIComponent(
    "Hello Ninety Nine Property Consultants, I'd like to enquire about your property management and land services.",
  );

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="glass-dark-panel overflow-hidden rounded-3xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left — headline & CTAs */}
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#e2757f" }}
                >
                  For Inquiry
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                  Ready to Find Your{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #ff5b71, #e2757f)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Next Home?
                  </span>
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                  Whether you&apos;re looking to rent, buy land, or list your
                  property — our team is ready to assist you.
                </p>

                {/* Trust bullets */}
                <ul className="mt-5 space-y-2">
                  {[
                    "Free consultation with no obligations",
                    "Verified listings, no hidden fees",
                    "Response within 1 business hour",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle2
                        size={15}
                        style={{ color: "#e2757f", flexShrink: 0 }}
                      />
                      <span className="text-xs text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neu-accent flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Us
                  </a>
                  <a
                    href="tel:+256785175160"
                    className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold text-white transition-colors hover:text-white/80"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.14)",
                    }}
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                </div>
              </div>

              {/* Right — contact form */}
              <div
                className="flex flex-col justify-center border-t p-8 sm:p-12 lg:border-l lg:border-t-0"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <h3 className="text-lg font-bold text-white">
                  Drop Your Number
                </h3>
                <p className="mt-1 text-sm text-white/50">
                  Get a call-back from a property expert.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    const phone = data.get("phone") || "";
                    const name = data.get("name") || "";
                    const msg = encodeURIComponent(
                      `Hello Ninety Nine Property Consultants, my name is ${name} and my phone number is ${phone}. I'd like to discuss property services.`
                    );
                    window.open(
                      `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className="mt-6 space-y-3"
                >
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e2757f] focus:bg-white/8"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Your Phone Number (+256...)"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e2757f] focus:bg-white/8"
                  />
                  <button
                    type="submit"
                    className="btn-neu-accent flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white"
                  >
                    <Send size={15} />
                    Get a Call-Back via WhatsApp
                  </button>
                  <p className="text-center text-[10px] text-white/30">
                    We don&apos;t share your details with third parties.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
