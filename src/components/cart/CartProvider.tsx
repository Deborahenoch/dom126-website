"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/products";

export interface CartItem {
  slug: string;
  qty: number;
}

export interface CartLine {
  slug: string;
  name: string;
  size: string;
  price: number;
  image: string;
  qty: number;
  lineTotal: number;
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** True once the cart has been restored from the customer's device. */
  ready: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "dom126_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Restore persisted cart (survives page reloads / return visits).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((i) => typeof i?.slug === "string" && i.qty > 0));
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setReady(true);
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — cart still works for this session
    }
  }, [items, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, qty: Math.min(99, i.qty + qty) } : i
        );
      }
      return [...prev, { slug, qty: Math.min(99, Math.max(1, qty)) }];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(99, qty) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { lines, subtotal, count } = useMemo(() => {
    const lines: CartLine[] = [];
    let subtotal = 0;
    let count = 0;
    for (const item of items) {
      const product = getProduct(item.slug);
      if (!product) continue;
      lines.push({
        slug: product.slug,
        name: product.name,
        size: product.size,
        price: product.price,
        image: product.image,
        qty: item.qty,
        lineTotal: product.price * item.qty,
      });
      subtotal += product.price * item.qty;
      count += item.qty;
    }
    return { lines, subtotal, count };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      lines,
      count,
      subtotal,
      ready,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      add,
      remove,
      setQty,
      clear,
    }),
    [items, lines, count, subtotal, ready, drawerOpen, add, remove, setQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
