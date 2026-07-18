import type { LucideIcon } from "lucide-react";

export default function IconPanel({
  icon: Icon,
  size = "lg",
}: {
  icon: LucideIcon;
  size?: "md" | "lg";
}) {
  const dims = size === "lg" ? "h-56 sm:h-72" : "h-40";
  const iconSize = size === "lg" ? 64 : 40;

  return (
    <div
      className={`surface-raised-lg relative flex ${dims} w-full items-center justify-center overflow-hidden rounded-3xl`}
    >
      {/* ambient decorative ring, echoes the raised-icon language used site-wide */}
      <div
        aria-hidden
        className="absolute h-[70%] w-[70%] rounded-full"
        style={{ boxShadow: "var(--shadow-pressed, inset 6px 6px 12px #c3c9d4, inset -6px -6px 12px #ffffff)" }}
      />
      <div className="icon-chip relative flex h-24 w-24 items-center justify-center rounded-[28px] sm:h-28 sm:w-28">
        <Icon size={iconSize} strokeWidth={1.6} style={{ color: "var(--color-accent)" }} />
      </div>
      {/* corner accent bars, tying back to the logo's growth-bar motif */}
      <div aria-hidden className="absolute bottom-6 left-6 flex items-end gap-2 opacity-40">
        <span className="w-2 rounded-full bg-[var(--color-ink)]" style={{ height: 10 }} />
        <span className="w-2 rounded-full bg-[var(--color-ink)]" style={{ height: 18 }} />
        <span className="w-2 rounded-full bg-[var(--color-accent)]" style={{ height: 26 }} />
      </div>
    </div>
  );
}
