import { Star } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const REVIEWS = [
  {
    name: "Sarah K.",
    role: "Landlord, Kololo",
    text: "Platinum Rentals took over my apartment in Kololo and within two weeks it was tenanted. The monthly statements are clear, and I never have to chase rent anymore. Exactly what I needed as a diaspora owner.",
    source: "Google",
  },
  {
    name: "David M.",
    role: "Landlord, Bugolobi",
    text: "I used to manage my property through a caretaker and it was always a headache. Since switching to Platinum Rentals, everything is documented and professional. The inspection reports give me real peace of mind.",
    source: "WhatsApp",
  },
  {
    name: "Grace N.",
    role: "Landlord, Ntinda",
    text: "The maintenance coordination alone is worth it. When my tenant reported a plumbing issue, it was handled within 24 hours with photos and a cost breakdown. No surprise bills, no drama.",
    source: "Google",
  },
  {
    name: "James O.",
    role: "Landlord, Munyonyo",
    text: "As someone living abroad, I needed a management company I could trust remotely. Platinum Rentals sends my statements on time every month and remits rent without fail. Highly recommended.",
    source: "Facebook",
  },
];

export default function Testimonials() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              Testimonials
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              What Our Clients Say
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.name} delay={i * 100}>
              <div className="surface-raised flex flex-col rounded-2xl p-6">
                <div className="mb-3 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill="var(--color-accent)"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--color-shadow-dark)" }}>
                  <p className="text-sm font-bold">{review.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-ink-faint)" }}>
                    {review.role}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--color-accent)" }}>
                    Via {review.source}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
