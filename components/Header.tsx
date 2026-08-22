"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Lock,
  LogOut,
  Sun,
  Moon,
  LayoutDashboard,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Land", href: "/land" },
  // { label: "Services", href: "/services" },
  // { label: "Why Us", href: "/why-us" },
  // { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl surface-raised px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/ninety-nine-logo-full.png"
            alt="Ninety Nine Property Consultants"
            width={168}
            height={76}
            className={`h-10 w-auto sm:h-12 ${dark ? " brightness-0 invert" : ""}`}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex uppercase">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-2 text-sm font-medium text-ink-soft transition hover:text-[var(--color-accent)]"
              style={{ color: "var(--color-ink-soft)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl icon-chip transition-colors hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-ink-soft)" }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl icon-chip px-4 py-2 text-sm font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                <LayoutDashboard
                  size={16}
                  strokeWidth={2.25}
                  style={{ color: "var(--color-accent)" }}
                />
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 rounded-xl icon-chip px-4 py-2 text-sm font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                <LogOut
                  size={16}
                  strokeWidth={2.25}
                  style={{ color: "var(--color-accent)" }}
                />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="flex items-center gap-2 rounded-xl icon-chip px-4 py-2 text-sm font-semibold"
              style={{ color: "var(--color-ink)" }}
            >
              <Lock
                size={16}
                strokeWidth={2.25}
                style={{ color: "var(--color-accent)" }}
              />
              Sign In
            </Link>
          )}
          <Link
            href="/landlord"
            className="btn-neu-accent rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          >
            Landlord
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl icon-chip lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl surface-raised p-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {link.label}
              </Link>
            ))}
            <button
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
              style={{ color: "var(--color-ink-soft)" }}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  <LayoutDashboard
                    size={16}
                    strokeWidth={2.25}
                    style={{ color: "var(--color-accent)" }}
                  />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  <LogOut
                    size={16}
                    strokeWidth={2.25}
                    style={{ color: "var(--color-accent)" }}
                  />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
                style={{ color: "var(--color-ink-soft)" }}
              >
                <Lock
                  size={16}
                  strokeWidth={2.25}
                  style={{ color: "var(--color-accent)" }}
                />
                Sign In
              </Link>
            )}
            <Link
              href="/landlord"
              onClick={() => setOpen(false)}
              className="btn-neu-accent mt-2 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Landlord
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
