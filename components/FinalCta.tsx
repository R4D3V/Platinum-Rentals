"use client";

import { MessageCircle, Phone, Send } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import FadeIn from "@/components/FadeIn";

export default function FinalCta() {
  const whatsappMessage = encodeURIComponent(
    "Hello Platinum Rentals, I'd like to enquire about your property management services.",
  );

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="glass-dark-panel overflow-hidden rounded-3xl">
            <div className="grid lg:grid-cols-[1fr_1fr]">
              {/* Left */}
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#e2757f" }}
                >
                  For Inquiry
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  Drop your Contact Number &amp; Get Assistance by Property
                  Experts
                </h2>
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
                    className="btn-neu flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold text-black"
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                </div>
              </div>

              {/* Right — contact form */}
              {/* <div className="flex flex-col justify-center border-t p-8 sm:p-12 lg:border-l lg:border-t-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    const phone = data.get("phone") || "";
                    const msg = encodeURIComponent(
                      `Hello Platinum Rentals, my phone number is ${phone}. I'd like to discuss property management services.`
                    );
                    window.open(
                      `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className="space-y-4"
                >
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Your Phone Number"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none focus:border-[var(--color-accent)]"
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white"
                    style={{
                      background: "linear-gradient(145deg, #c72432, #8f1420)",
                    }}
                  >
                    <Send size={16} />
                    Submit
                  </button>
                </form>
              </div> */}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
