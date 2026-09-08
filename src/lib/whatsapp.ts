/**
 * WhatsApp ordering integration.
 *
 * The official DOM126 WhatsApp number is configured via the
 * NEXT_PUBLIC_WHATSAPP_NUMBER environment variable (see `.env.example`).
 * Until it is set, all WhatsApp surfaces render as an honest "coming soon"
 * state — no number is invented.
 *
 * Future enhancement: replace `buildWhatsAppLink` with a server-side
 * endpoint that also records the order before handing off to WhatsApp.
 */
import { isWhatsAppOrderingEnabled, siteConfig } from "./site-config";

export function buildWhatsAppLink(message: string): string | null {
  if (!isWhatsAppOrderingEnabled) return null;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Build an order-summary message a customer can send straight to DOM126. */
export function buildOrderMessage(opts: {
  ref: string;
  lines: { name: string; size: string; qty: number; price: number }[];
  subtotal: number;
  customerName: string;
}): string {
  const items = opts.lines
    .map((l) => `• ${l.name} (${l.size}) × ${l.qty} — ₦${(l.price * l.qty).toLocaleString("en-NG")}`)
    .join("\n");
  return [
    `Hello DOM126! I would like to place an order.`,
    ``,
    `Order reference: ${opts.ref}`,
    items,
    ``,
    `Subtotal: ₦${opts.subtotal.toLocaleString("en-NG")}`,
    `Name: ${opts.customerName}`,
  ].join("\n");
}
