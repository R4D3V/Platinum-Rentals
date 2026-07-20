import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold" style={{ color: "var(--color-accent)" }}>
        404
      </h1>
      <p className="mt-2 text-lg font-semibold">Page not found</p>
      <p className="mt-1 text-sm" style={{ color: "var(--color-ink-soft)" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="btn-neu-accent mt-6 rounded-xl px-6 py-3 text-sm font-bold text-white"
      >
        Go Home
      </Link>
    </main>
  );
}
