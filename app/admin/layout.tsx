"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Building2,
  Users,
  LogOut,
  ArrowLeft,
  Loader2,
  ShieldCheck,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Properties", href: "/admin/properties", icon: Building2 },
  { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session) router.push("/sign-in");
    else if ((session.user as { role?: string }).role !== "admin") router.push("/dashboard");
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4">
        <Loader2 size={24} className="animate-spin" style={{ color: "var(--color-ink-faint)" }} />
      </main>
    );
  }

  if ((session.user as { role?: string }).role !== "admin") return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color: "var(--color-ink-faint)" }}
      >
        <ArrowLeft size={16} />
        Back to website
      </Link>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 shrink-0 flex-col gap-2 lg:flex">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="surface-raised flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition hover:opacity-80"
              style={{ color: "var(--color-ink-soft)" }}
            >
              <link.icon size={18} style={{ color: "var(--color-accent)" }} />
              {link.label}
            </Link>
          ))}
          <div className="mt-auto flex flex-col gap-2 pt-4">
            <div
              className="surface-raised flex items-center gap-2 rounded-2xl px-4 py-2 text-xs"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <ShieldCheck size={14} style={{ color: "var(--color-accent)" }} />
              {session.user.email}
            </div>
            <button
              onClick={async () => {
                const { signOut } = await import("@/lib/auth-client");
                await signOut();
                router.push("/sign-in");
              }}
              className="surface-raised flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition hover:opacity-80"
              style={{ color: "var(--color-ink-faint)" }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Mobile nav tabs */}
          <nav className="mb-4 flex gap-2 overflow-x-auto lg:hidden">
            {SIDEBAR_LINKS.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    isActive
                      ? "bg-[var(--color-accent)] text-white"
                      : "surface-raised"
                  }`}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="surface-raised-lg rounded-3xl p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
