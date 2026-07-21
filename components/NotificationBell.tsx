"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { Bell } from "lucide-react";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  link: string | null;
  read: string;
  createdAt: string;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { data: notifications = [], mutate } = useSWR<NotificationItem[]>(
    open ? "/api/notifications" : null,
    fetcher,
    { refreshInterval: 30000 },
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const unread = notifications.filter((n) => n.read === "false").length;

  async function markRead(id: string) {
    await fetch(`/api/notifications/${id}`, { method: "PUT" });
    mutate((prev) => prev?.map((n) => (n.id === id ? { ...n, read: "true" } : n)), false);
  }

  async function markAllRead() {
    await fetch("/api/notifications/read-all", { method: "POST" });
    mutate((prev) => prev?.map((n) => ({ ...n, read: "true" })), false);
  }

  return (
    <div ref={panelRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl icon-chip transition hover:opacity-80"
        style={{ color: "var(--color-ink-soft)" }}
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold leading-none text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="surface-raised absolute right-0 top-10 z-50 w-80 rounded-2xl border shadow-lg"
          style={{ borderColor: "var(--color-border, #e5e7eb)" }}
        >
          <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--color-border, #e5e7eb)" }}>
            <p className="text-sm font-bold">Notifications</p>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="text-[11px] font-semibold hover:opacity-70"
                style={{ color: "var(--color-accent)" }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs" style={{ color: "var(--color-ink-faint)" }}>
                No notifications yet.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`border-b px-4 py-3 transition hover:opacity-80 ${
                    n.read === "false" ? "bg-[var(--color-accent-soft)]/30" : ""
                  }`}
                  style={{ borderColor: "var(--color-border, #e5e7eb)" }}
                >
                  {n.link ? (
                    <Link
                      href={n.link}
                      onClick={() => markRead(n.id)}
                      className="block"
                    >
                      <p className="text-sm font-semibold">{n.title}</p>
                      <p className="mt-0.5 text-xs" style={{ color: "var(--color-ink-soft)" }}>
                        {n.message}
                      </p>
                      <p className="mt-1 text-[10px]" style={{ color: "var(--color-ink-faint)" }}>
                        {formatTime(n.createdAt)}
                      </p>
                    </Link>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold">{n.title}</p>
                      <p className="mt-0.5 text-xs" style={{ color: "var(--color-ink-soft)" }}>
                        {n.message}
                      </p>
                      <p className="mt-1 text-[10px]" style={{ color: "var(--color-ink-faint)" }}>
                        {formatTime(n.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString("en-UG", { month: "short", day: "numeric" });
}
