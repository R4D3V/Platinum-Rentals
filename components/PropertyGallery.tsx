"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  gradient: string;
  type: string;
  totalImages?: number;
}

export default function PropertyGallery({
  gradient,
  type,
  totalImages = 6,
}: PropertyGalleryProps) {
  const [active, setActive] = useState(0);

  const thumbnails = Array.from({ length: totalImages }, (_, i) => i);

  return (
    <div className="min-w-0 w-full space-y-3">
      {/* Main image */}
      <div className="relative min-w-0 overflow-hidden rounded-none sm:rounded-3xl">
        <div
          className="flex aspect-[4/3] w-full items-center justify-center sm:aspect-auto sm:h-[28rem]"
          style={{
            background: gradient,
            opacity: 1 - active * 0.08,
          }}
        >
          <span className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {type}
          </span>
        </div>

        {/* Nav arrows */}
        {totalImages > 1 && (
          <>
            <button
              onClick={() => setActive(active === 0 ? totalImages - 1 : active - 1)}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-3 sm:h-9 sm:w-9"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActive(active === totalImages - 1 ? 0 : active + 1)}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-3 sm:h-9 sm:w-9"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {active + 1} / {totalImages}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 sm:px-0">
        {thumbnails.map((i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-16 w-20 shrink-0 snap-start overflow-hidden rounded-xl transition-all duration-200 sm:h-20 sm:w-24"
            style={{
              background: gradient,
              opacity: active === i ? 1 : 0.4 + i * 0.05,
              boxShadow:
                active === i
                  ? "0 0 0 2px var(--color-accent)"
                  : "none",
            }}
            aria-label={`View image ${i + 1}`}
          >
            <span className="text-[10px] font-medium text-white/70">
              {i + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
