const CACHE = "ninety-nine-property-consultants-v1";

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/pwa-icons/icon-72x72.png",
  "/pwa-icons/icon-96x96.png",
  "/pwa-icons/icon-128x128.png",
  "/pwa-icons/icon-144x144.png",
  "/pwa-icons/icon-152x152.png",
  "/pwa-icons/icon-192x192.png",
  "/pwa-icons/icon-384x384.png",
  "/pwa-icons/icon-512x512.png",
  "/pwa-icons/icon-maskable-192x192.png",
  "/pwa-icons/icon-maskable-512x512.png",
  "/pwa-icons/apple-touch-icon.png",
  "/pwa-icons/apple-touch-icon-180x180.png",
  "/favicons/favicon.ico",
  "/favicons/favicon-16x16.png",
  "/favicons/favicon-32x32.png",
  "/favicons/favicon-48x48.png",
  "/logo/ninety-nine-logo-full.png",
  "/logo/ninety-nine-icon-mark.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.includes("-json") ||
    url.searchParams.has("__rsc")
  ) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});

self.addEventListener("push", (event) => {
  let title = "Ninety Nine Property Consultants";
  let body = "A new property has been listed.";
  let link = "/properties";

  if (event.data) {
    try {
      const payload = event.data.json();
      if (payload.title) title = payload.title;
      if (payload.body) body = payload.body;
      if (payload.link) link = payload.link;
    } catch {
      // use defaults
    }
  }

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/pwa-icons/icon-192x192.png",
      badge: "/pwa-icons/icon-72x72.png",
      data: { link },
      vibrate: [100, 50, 100],
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const link = event.notification.data?.link || "/properties";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      const matching = windowClients.find((c) => {
        const url = new URL(c.url);
        return url.origin === self.location.origin;
      });
      if (matching) {
        matching.focus();
        matching.navigate(link);
      } else {
        clients.openWindow(link);
      }
    }),
  );
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("Offline", { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response("Offline", { status: 503 });
  }
}
