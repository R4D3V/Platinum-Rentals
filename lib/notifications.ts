import { eq } from "drizzle-orm";
import { db } from "./db";
import { pushSubscription, notification } from "./db-schema";
import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function createInAppNotification(
  title: string,
  message: string,
  link?: string,
) {
  const row = await db()
    .insert(notification)
    .values({
      id: crypto.randomUUID(),
      title,
      message,
      link: link ?? null,
      read: "false",
    })
    .returning();
  return row[0];
}

export async function sendPushNotifications(
  title: string,
  body: string,
  link: string,
) {
  const subs = await db().select().from(pushSubscription);
  const payload = JSON.stringify({ title, body, link });

  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: JSON.parse(sub.keys) },
        payload,
      );
    } catch {
      await db().delete(pushSubscription).where(eq(pushSubscription.id, sub.id));
    }
  }
}
