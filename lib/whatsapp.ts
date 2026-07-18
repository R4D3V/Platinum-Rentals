import type { FormEvent } from "react";

export const WHATSAPP_NUMBER = "256785175160"; // international format, no leading +

/**
 * Builds a wa.me deep link that opens WhatsApp with a pre-filled message.
 * Used by every form on the site so enquiries land directly in WhatsApp
 * instead of a backend inbox.
 */
export function buildWhatsAppUrl(message: string, number: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function submitFormToWhatsApp(
  e: FormEvent<HTMLFormElement>,
  buildMessage: (data: FormData) => string
) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const message = buildMessage(data);
  const url = buildWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}
