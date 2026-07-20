"use client";

import { X } from "lucide-react";

interface FilterTabsProps {
  label: string;
  options: string[];
  optionLabels?: string[];
  active: string | null;
  onSelect: (value: string | null) => void;
}

export default function FilterTabs({ label, options, optionLabels, active, onSelect }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={active ?? ""}
        onChange={(e) => onSelect(e.target.value || null)}
        className="input-neu rounded-xl px-3 py-2 text-xs font-semibold appearance-none cursor-pointer min-w-[100px]"
        style={{ color: active ? "var(--color-accent)" : "var(--color-ink-faint)" }}
      >
        <option value="">All {label}</option>
        {options.map((opt, i) => (
          <option key={opt} value={opt}>
            {optionLabels ? optionLabels[i] : opt}
          </option>
        ))}
      </select>
      {active && (
        <button
          onClick={() => onSelect(null)}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold transition hover:opacity-70"
          style={{ color: "var(--color-ink-faint)" }}
        >
          <X size={12} strokeWidth={3} />
          Clear
        </button>
      )}
    </div>
  );
}
