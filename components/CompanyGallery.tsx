"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const SLIDES = [
  {
    src: "/images/company/land%20surveying.jpeg",
    label: "Land Surveying",
    alt: "Surveyor carrying out professional land surveying work",
  },
  {
    src: "/images/company/land%20surveying2.jpeg",
    label: "Boundary Demarcation",
    alt: "Team demarcating plot boundaries on site",
  },
  {
    src: "/images/company/land%20surveying3.jpeg",
    label: "Site Verification",
    alt: "On-site inspection during land verification exercise",
  },
  {
    src: "/images/company/land%20tittles.jpeg",
    label: "Title Processing",
    alt: "Land title documents being processed",
  },
];

const AUTOPLAY_MS = 5000;

export default function CompanyGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => setIndex((i + SLIDES.length) % SLIDES.length),
    []
  );
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span
                className="inline-flex h-px w-8 shrink-0 rounded-full"
                style={{ background: "#35c6e8" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#35c6e8" }}
              >
                Our Work
              </span>
              <span
                className="inline-flex h-px w-8 shrink-0 rounded-full"
                style={{ background: "#35c6e8" }}
              />
            </div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Inside{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #2fe0b0, #35c6e8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Our Company
              </span>
            </h2>
            <p
              className="mt-3 mx-auto max-w-md text-sm leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              From surveying to title processing — a glimpse of our team at
              work on the ground.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
              setPaused(true);
            }}
            onTouchEnd={(e) => {
              const start = touchStartX.current;
              if (start !== null) {
                const delta = e.changedTouches[0].clientX - start;
                if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
              }
              touchStartX.current = null;
              setPaused(false);
            }}
          >
            {/* Slide track */}
            <div className="surface-raised overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {SLIDES.map(({ src, label, alt }) => (
                  <div key={src} className="relative w-full shrink-0">
                    <div className="relative aspect-[16/10] sm:aspect-[16/7]">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(min-width: 1152px) 1152px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-5 pt-14">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <button
                type="button"
                aria-label="Previous image"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-white transition hover:bg-white/30 sm:p-2.5"
                style={{ background: "rgba(0, 0, 0, 0.35)", backdropFilter: "blur(4px)" }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-white transition hover:bg-white/30 sm:p-2.5"
                style={{ background: "rgba(0, 0, 0, 0.35)", backdropFilter: "blur(4px)" }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {SLIDES.map(({ src }, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? 24 : 8,
                    background:
                      i === index
                        ? "linear-gradient(135deg, #2fe0b0, #35c6e8)"
                        : "var(--color-ink-faint)",
                    opacity: i === index ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
