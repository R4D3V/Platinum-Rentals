"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, Mail, Shield } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import FadeIn from "@/components/FadeIn";

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
    <main>
      <section className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <ArrowLeft size={16} />
              Back to website
            </Link>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="surface-raised-lg overflow-hidden rounded-3xl">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* Left — Admin Info */}
                <div className="glass-dark-panel flex flex-col justify-between p-10 sm:p-12">
                  <div>
                    <div
                      className="glass-inner-panel mb-10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest"
                      style={{ color: "rgba(255,255,255,0.88)" }}
                    >
                      <Shield size={14} />
                      Admin Access
                    </div>

                    <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                      Admin
                      <br />
                      Portal
                    </h1>
                    <p
                      className="mt-4 max-w-sm text-base leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      Sign in to manage properties, tenants, and listings on
                      Platinum Rentals.
                    </p>
                  </div>

                  <div className="mt-12 hidden lg:block">
                    <Image
                      src="/logo.png"
                      alt="Platinum Rentals"
                      width={168}
                      height={76}
                      className="h-12 w-auto rounded-xl bg-white p-2"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Right — Sign In */}
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                  <div className="mb-8">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Authentication
                    </span>
                    <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                      Sign In
                    </h2>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Access your landlord dashboard.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    suppressHydrationWarning
                  >
                    <div>
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide"
                        style={{ color: "var(--color-ink-faint)" }}
                      >
                        Email
                      </label>
                      <div className="relative">
                        <span
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                          style={{ color: "var(--color-ink-faint)" }}
                        >
                          <Mail size={18} />
                        </span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="input-neu w-full rounded-2xl py-4 pl-12 pr-4 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide"
                        style={{ color: "var(--color-ink-faint)" }}
                      >
                        Password
                      </label>
                      <div className="relative">
                        <span
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                          style={{ color: "var(--color-ink-faint)" }}
                        >
                          <Lock size={18} />
                        </span>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="input-neu w-full rounded-2xl py-4 pl-12 pr-4 text-sm"
                        />
                      </div>
                    </div>

                    {error && (
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-neu-accent mt-2 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold tracking-wide text-white disabled:opacity-60"
                    >
                      {loading ? "Signing in\u2026" : "Sign In"}
                    </button>
                  </form>

                  <p
                    className="mt-6 text-xs leading-relaxed"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    Only admins can create new accounts.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
