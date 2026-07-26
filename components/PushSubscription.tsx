"use client";

import { useEffect, useState, useCallback } from "react";
import { Bell, X } from "lucide-react";

export default function PushSubscription() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [busy, setBusy] = useState(false);

  const canNotify =
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window;

  const subscribe = useCallback(async () => {
    if (!canNotify) return;
    try {
      const reg = await navigator.serviceWorker.ready;
      const existing = await reg.pushManager.getSubscription();

      if (existing) {
        await fetch("/api/push/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endpoint: existing.endpoint,
            keys: existing.toJSON().keys,
          }),
        });
        return;
      }

      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        console.warn("[PushSubscription] NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set");
        return;
      }

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: sub.endpoint,
          keys: sub.toJSON().keys,
        }),
      });
    } catch (err) {
      console.error("[PushSubscription] subscription failed:", err);
    }
  }, [canNotify]);

  useEffect(() => {
    if (!canNotify) return;

    const p = Notification.permission;
    setPermission(p);

    if (p === "granted") {
      subscribe();
    }
  }, [canNotify, subscribe]);

  async function handleEnable() {
    setBusy(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === "granted") {
        await subscribe();
      }
      setDismissed(true);
    } finally {
      setBusy(false);
    }
  }

  if (!canNotify) return null;
  if (permission === null) return null;
  if (permission === "granted") return null;
  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div
        className="surface-raised mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:gap-4 sm:px-6 sm:py-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          <Bell size={20} className="shrink-0" style={{ color: "var(--color-accent)" }} />
          <div className="min-w-0">
            <p className="text-sm font-bold">Get notified</p>
            <p className="truncate text-xs" style={{ color: "var(--color-ink-soft)" }}>
              {permission === "denied"
                ? "Notifications are blocked. Enable them in your browser settings."
                : "Enable push notifications to get instant property alerts."}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleEnable}
            disabled={busy}
            className="btn-neu-accent rounded-xl px-4 py-2 text-sm font-bold text-white"
          >
            {busy ? "..." : permission === "denied" ? "Open Settings" : "Enable"}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="icon-chip flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ color: "var(--color-ink-faint)" }}
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    output[i] = rawData.charCodeAt(i);
  }
  return output;
}
