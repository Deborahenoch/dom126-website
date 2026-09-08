/**
 * WhatsApp ordering integration.
 *
 * The official DOM126 WhatsApp number (+234 912 916 8474) is configured in
 * src/lib/site-config.ts and can be overridden with NEXT_PUBLIC_WHATSAPP_NUMBER.
 * If the number is ever absent, WhatsApp surfaces fall back to an honest
 * "coming soon" state — no number is invented.
 *
 * Future enhancement: replace `buildWhatsAppLink` with a server-side
 * endpoint that also records the order before handing off to WhatsApp.
 */
import { isWhatsAppOrderingEnabled, siteConfig } from "./site-config";

export function buildWhatsAppLink(message: string): string | null {
  if (!isWhatsAppOrderingEnabled) return null;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface WhatsAppOrderLine {
  name: string;
  size: string;
  qty: number;
  price: number;
}

/** Build an order-summary message a customer can send straight to DOM126. */
export function buildOrderMessage(opts: {
  ref?: string;
  lines: WhatsAppOrderLine[];
  subtotal: number;
  /** Optional — omitted when ordering straight from the bag. */
  customerName?: string;
}): string {
  const items = opts.lines
    .map((l) => `• ${l.name} (${l.size}) × ${l.qty} — ₦${(l.price * l.qty).toLocaleString("en-NG")}`)
    .join("\n");
  return [
    `Hello DOM126! I would like to place an order.`,
    ``,
    opts.ref ? `Order reference: ${opts.ref}` : null,
    items,
    ``,
    `Subtotal: ₦${opts.subtotal.toLocaleString("en-NG")}`,
    opts.customerName ? `Name: ${opts.customerName}` : null,
  ]
    .filter((part) => part !== null)
    .join("\n");
}
