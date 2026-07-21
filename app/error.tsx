"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-extrabold">Something went wrong</h1>
      <p className="text-sm" style={{ color: "var(--color-ink-faint)" }}>
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="btn-neu-accent rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
