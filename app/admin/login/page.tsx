"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Back to home */}
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

        {/* Login Card */}
        <FadeIn delay={100}>
          <div className="surface-raised-lg overflow-hidden rounded-3xl">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              {/* Left — Branding */}
              <div className="glass-dark-panel flex flex-col justify-between p-10 sm:p-12">
                <div>
                  <div className="glass-inner-panel mb-10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.88)" }}
                  >
                    <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_0_4px_rgba(74,222,128,0.15)]" />
                    Protected Access
                  </div>

                  <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                    Admin
                    <br />
                    Sign In
                  </h1>
                  <p className="mt-4 max-w-sm text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Secure access for Platinum Rentals operations, property management, and reporting tools.
                  </p>
                </div>

                <div className="mt-12 hidden lg:block">
                  <Image
                    src="/logo/platinum-rentals-logo-full.svg"
                    alt="Platinum Rentals"
                    width={168}
                    height={76}
                    className="h-12 w-auto rounded-xl bg-white p-2"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Right — Form */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
                    Welcome Back
                  </span>
                  <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                    Continue to dashboard
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
                    Use your admin credentials to access property management and reporting controls.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label
                      className="mb-2 block text-xs font-bold uppercase tracking-wide"
                      style={{ color: "var(--color-ink-faint)" }}
                    >
                      Login Name
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--color-ink-faint)" }}>
                        <User size={18} />
                      </span>
                      <input
                        type="text"
                        required
                        autoComplete="username"
                        placeholder="Enter your login name"
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
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--color-ink-faint)" }}>
                        <Lock size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="input-neu w-full rounded-2xl py-4 pl-12 pr-12 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:opacity-70"
                        style={{ color: "var(--color-ink-faint)" }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-neu-accent mt-2 w-full rounded-2xl py-4 text-sm font-bold tracking-wide text-white"
                  >
                    Sign In
                  </button>
                </form>

                <p className="mt-6 text-xs leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
                  Session cookies are locked to the browser, login attempts are rate-limited, and legacy passwords are upgraded to a stronger hash after a successful sign in.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
