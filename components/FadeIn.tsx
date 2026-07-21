"use client";

import { memo, useEffect, useRef, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("fade-in-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const hiddenClass =
    direction === "up"
      ? "fade-in-hidden-up"
      : direction === "left"
        ? "fade-in-hidden-left"
        : direction === "right"
          ? "fade-in-hidden-right"
          : "fade-in-hidden";

  return (
    <div ref={ref} className={`fade-in ${hiddenClass} ${className}`}>
      {children}
    </div>
  );
}

export default memo(FadeIn);
