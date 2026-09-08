/** Shared formatting helpers. */

/** Format a whole-Naira amount, e.g. 54000 → "₦54,000". */
export function formatPrice(amount: number, currency = "₦"): string {
  return `${currency}${amount.toLocaleString("en-NG")}`;
}

/** Generate a short, readable reference code, e.g. "DOM-4F2K9A". */
export function generateReference(prefix = "DOM"): string {
  const time = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `${prefix}-${time}${rand}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
