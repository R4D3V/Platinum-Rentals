import { Star, Quote } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const REVIEWS = [
  {
    name: "Sarah K.",
    initials: "SK",
    role: "Landlord, Kololo",
    text: "Ninety Nine Property Consultants took over my apartment in Kololo and within two weeks it was tenanted. The monthly statements are clear, and I never have to chase rent anymore. Exactly what I needed as a diaspora owner.",
    source: "Google",
  },
  {
    name: "David M.",
    initials: "DM",
    role: "Landlord, Bugolobi",
    text: "I used to manage my property through a caretaker and it was always a headache. Since switching to Ninety Nine Property Consultants, everything is documented and professional. The inspection reports give me real peace of mind.",
    source: "WhatsApp",
  },
  {
    name: "Grace N.",
    initials: "GN",
    role: "Landlord, Ntinda",
    text: "The maintenance coordination alone is worth it. When my tenant reported a plumbing issue, it was handled within 24 hours with photos and a cost breakdown. No surprise bills, no drama.",
    source: "Google",
  },
  {
    name: "James O.",
    initials: "JO",
    role: "Landlord, Munyonyo",
    text: "As someone living abroad, I needed a management company I could trust remotely. Ninety Nine Property Consultants sends my statements on time every month and remits rent without fail. Highly recommended.",
    source: "Facebook",
  },
];

const AVATAR_COLORS = [
  "linear-gradient(135deg, #7c6bf0, #35c6e8)",
  "linear-gradient(135deg, var(--color-accent), #ff5b71)",
  "linear-gradient(135deg, #2fe0b0, #35c6e8)",
  "linear-gradient(135deg, #ff5f9e, #ffb648)",
];

export default function Testimonials() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span
                className="inline-flex h-px w-8 shrink-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                Client Stories
              </span>
              <span
                className="inline-flex h-px w-8 shrink-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
            </div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              What Our{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), #ff5b71)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Clients Say
              </span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.name} delay={i * 100}>
              <div className="surface-raised group flex flex-col rounded-3xl p-6 transition-transform duration-200 hover:scale-[1.02]">
                {/* Quote icon */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        fill="var(--color-accent)"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <Quote
                    size={20}
                    style={{ color: "var(--color-accent)", opacity: 0.3 }}
                  />
                </div>

                {/* Review text */}
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer */}
                <div
                  className="mt-5 flex items-center gap-3 border-t pt-4"
                  style={{ borderColor: "var(--glass-border-soft)" }}
                >
                  {/* Avatar */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
                    style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  >
                    {review.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{review.name}</p>
                    <p
                      className="truncate text-xs"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      {review.role}
                    </p>
                  </div>
                  <span
                    className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                    style={{
                      background: "var(--color-accent-soft)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {review.source}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
