"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  type: string;
}

function Placeholder({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-200 ${className ?? ""}`}
    >
      <div className="flex flex-col items-center gap-2 opacity-50">
        <ImageIcon size={32} className="text-slate-400" />
        <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
          {type}
        </span>
      </div>
    </div>
  );
}

export default function PropertyGallery({
  images,
  type,
}: PropertyGalleryProps) {
  const [active, setActive] = useState(0);
  const totalImages = Math.max(images.length, 1);
  const thumbnails = Array.from({ length: totalImages }, (_, i) => i);

  return (
    <div className="min-w-0 w-full space-y-3">
      {/* Main image */}
      <div className="relative min-w-0 overflow-hidden rounded-3xl sm:rounded-3xl px-4 sm:px-0">
        {images[active] ? (
          <Image
            src={images[active]}
            alt={`${type} - Image ${active + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 75vw"
            className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:h-[28rem] sm:rounded-3xl"
          />
        ) : (
          <Placeholder
            type={type}
            className="aspect-[4/3] w-full sm:aspect-auto sm:h-[28rem] sm:rounded-3xl"
          />
        )}

        {/* Nav arrows */}
        {totalImages > 1 && (
          <>
            <button
              onClick={() =>
                setActive(active === 0 ? totalImages - 1 : active - 1)
              }
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-3 sm:h-9 sm:w-9"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() =>
                setActive(active === totalImages - 1 ? 0 : active + 1)
              }
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
              boxShadow:
                active === i ? "0 0 0 2px var(--color-accent)" : "none",
            }}
            aria-label={`View image ${i + 1}`}
          >
            {images[i] ? (
              <Image
                src={images[i]}
                alt={`${type} thumbnail ${i + 1}`}
                fill
                sizes="96px"
                className="object-cover"
                style={{ opacity: active === i ? 1 : 0.5 }}
              />
            ) : (
              <Placeholder type={type} className="h-full w-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
