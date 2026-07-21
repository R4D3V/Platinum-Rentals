import { eq } from "drizzle-orm";
import { db } from "./db";
import { pushSubscription, notification } from "./db-schema";
import webpush from "web-push";

let vapidInitialized = false;
function ensureVapid() {
  if (vapidInitialized) return;
  if (
    !process.env.VAPID_SUBJECT ||
    !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    !process.env.VAPID_PRIVATE_KEY
  ) {
    console.warn("[notifications] VAPID env vars not set; skipping push");
    vapidInitialized = true;
    return;
  }
  vapidInitialized = true;
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
  );
}

export async function sendPushNotifications(
  title: string,
  body: string,
  link: string,
) {
  try {
    ensureVapid();
    const subs = await db().select().from(pushSubscription);
    const payload = JSON.stringify({ title, body, link });

    for (const sub of subs) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: JSON.parse(sub.keys) },
          payload,
        );
      } catch (err) {
        console.error("[notifications] send failed, removing sub:", err);
        await db().delete(pushSubscription).where(eq(pushSubscription.id, sub.id));
      }
    }
  } catch (err) {
    console.error("[notifications] sendPushNotifications error:", err);
  }
}
