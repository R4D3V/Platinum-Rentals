"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signIn.email({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="surface-raised-lg rounded-3xl p-8">
        <h1 className="text-2xl font-extrabold">Sign in</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--color-ink-soft)" }}>
          Access your landlord dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" suppressHydrationWarning>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Email
            <div className="input-neu flex items-center gap-2 rounded-xl px-4 py-3">
              <Mail size={16} style={{ color: "var(--color-ink-faint)" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="you@example.com"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Password
            <div className="input-neu flex items-center gap-2 rounded-xl px-4 py-3">
              <Lock size={16} style={{ color: "var(--color-ink-faint)" }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="••••••••"
              />
            </div>
          </label>

          {error && (
            <p className="text-sm font-medium" style={{ color: "var(--color-accent)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-neu-accent mt-2 rounded-xl py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {loading ? "Signing in\u2026" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--color-ink-soft)" }}>
          Only admins can create new accounts.
        </p>
      </div>
    </main>
  );
}
