/**
 * Local order & inquiry storage.
 *
 * Foundation notes: today the site is backend-free, so order requests and
 * signature/contact inquiries are persisted on the customer's device
 * (localStorage) and given a reference code. This keeps the checkout and
 * request flows genuinely functional without faking a server.
 *
 * INTEGRATION POINT: when a backend is added, replace `saveOrder` /
 * `saveInquiry` with API calls (e.g. POST /api/orders) and keep the same
 * data shapes. Nothing else in the UI needs to change.
 */

export interface OrderLine {
  slug: string;
  name: string;
  size: string;
  price: number;
  qty: number;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  deliveryNote: string;
  giftNote: string;
}

export interface StoredOrder {
  ref: string;
  createdAt: string;
  lines: OrderLine[];
  subtotal: number;
  customer: OrderCustomer;
  status: "request-received";
}

export interface StoredInquiry {
  ref: string;
  createdAt: string;
  type: "custom-signature" | "contact";
  name: string;
  email: string;
  phone: string;
  details: Record<string, string>;
}

const ORDERS_KEY = "dom126_orders_v1";
const INQUIRIES_KEY = "dom126_inquiries_v1";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode etc.) — the UI still works, we just
    // cannot persist on this device.
  }
}

export function saveOrder(order: StoredOrder): StoredOrder {
  const all = read<StoredOrder>(ORDERS_KEY);
  all.unshift(order);
  write(ORDERS_KEY, all.slice(0, 50));
  return order;
}

export function findOrder(ref: string): StoredOrder | undefined {
  return read<StoredOrder>(ORDERS_KEY).find((o) => o.ref === ref);
}

export function saveInquiry(inquiry: StoredInquiry): StoredInquiry {
  const all = read<StoredInquiry>(INQUIRIES_KEY);
  all.unshift(inquiry);
  write(INQUIRIES_KEY, all.slice(0, 100));
  return inquiry;
}
