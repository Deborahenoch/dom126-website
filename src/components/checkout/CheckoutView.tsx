"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import PageHero from "@/components/ui/PageHero";
import Price from "@/components/ui/Price";
import Button, { ButtonLink } from "@/components/ui/Button";
import { generateReference } from "@/lib/format";
import { saveOrder } from "@/lib/orders";
import { NIGERIAN_STATES } from "@/lib/nigeria";
import styles from "./CheckoutView.module.css";

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  deliveryNote: string;
  isGift: boolean;
  giftNote: string;
}

const initialForm: CheckoutForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  deliveryNote: "",
  isGift: false,
  giftNote: "",
};

export default function CheckoutView() {
  const { lines, subtotal, count, ready, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof CheckoutForm, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please provide your full name.";
    if (!form.email.trim()) next.email = "Please provide an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Please provide a phone number.";
    if (!form.address.trim()) next.address = "Please provide a delivery address.";
    if (!form.city.trim()) next.city = "Please provide a city or town.";
    if (!form.state) next.state = "Please select a state.";
    if (form.isGift && !form.giftNote.trim())
      next.giftNote = "Please write a short gift note (or untick “This is a gift”).";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return false;
    }
    return true;
  };

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);

    const order = saveOrder({
      ref: generateReference("DOM"),
      createdAt: new Date().toISOString(),
      lines: lines.map((l) => ({
        slug: l.slug,
        name: l.name,
        size: l.size,
        price: l.price,
        qty: l.qty,
      })),
      subtotal,
      customer: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state,
        deliveryNote: form.deliveryNote.trim(),
        giftNote: form.isGift ? form.giftNote.trim() : "",
      },
      status: "request-received",
    });

    clear();
    router.push(`/checkout/confirmation?ref=${encodeURIComponent(order.ref)}`);
  };

  return (
    <>
      <PageHero
        compact
        eyebrow="Checkout"
        title="Almost yours."
        description="Complete your details to place your order. A member of the DOM126 team will then contact you to confirm payment and delivery."
      />

      <section className="section">
        <div className="container">
          {!ready ? null : lines.length === 0 ? (
            <div className={styles.empty}>
              <h2 className={styles.emptyTitle}>Your bag is empty</h2>
              <p className={styles.emptyText}>
                Add a fragrance to your bag before proceeding to checkout.
              </p>
              <ButtonLink href="/shop" variant="primary">
                Explore the Collection
              </ButtonLink>
            </div>
          ) : (
            <form className={styles.grid} onSubmit={placeOrder} noValidate>
              {/* ---------- form column ---------- */}
              <div className={styles.formCol}>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    <span className={styles.legendIndex}>01</span> Contact
                    Information
                  </legend>
                  <div className={styles.fields}>
                    <div className="field">
                      <label htmlFor="co-name">
                        Full name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="co-name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="field-error">{errors.name}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="co-email">
                        Email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="co-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="field-error">{errors.email}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="co-phone">
                        Phone / WhatsApp <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="co-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        aria-invalid={!!errors.phone}
                        placeholder="Your phone number"
                      />
                      {errors.phone && <p className="field-error">{errors.phone}</p>}
                    </div>
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    <span className={styles.legendIndex}>02</span> Delivery Details
                  </legend>
                  <div className={styles.fields}>
                    <div className={`${styles.full} field`}>
                      <label htmlFor="co-address">
                        Delivery address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="co-address"
                        autoComplete="street-address"
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                        aria-invalid={!!errors.address}
                        placeholder="Street address, area, landmark"
                      />
                      {errors.address && <p className="field-error">{errors.address}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="co-city">
                        City / Town <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="co-city"
                        autoComplete="address-level2"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                        aria-invalid={!!errors.city}
                        placeholder="e.g. Lagos"
                      />
                      {errors.city && <p className="field-error">{errors.city}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="co-state">
                        State <span aria-hidden="true">*</span>
                      </label>
                      <select
                        id="co-state"
                        autoComplete="address-level1"
                        value={form.state}
                        onChange={(e) => set("state", e.target.value)}
                        aria-invalid={!!errors.state}
                      >
                        <option value="">Select a state…</option>
                        {NIGERIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.state && <p className="field-error">{errors.state}</p>}
                    </div>
                    <div className={`${styles.full} field`}>
                      <label htmlFor="co-note">Delivery note (optional)</label>
                      <input
                        id="co-note"
                        value={form.deliveryNote}
                        onChange={(e) => set("deliveryNote", e.target.value)}
                        placeholder="Preferred delivery time, directions, etc."
                      />
                    </div>

                    <div className={`${styles.full} ${styles.giftToggle}`}>
                      <input
                        id="co-gift"
                        type="checkbox"
                        checked={form.isGift}
                        onChange={(e) => set("isGift", e.target.checked)}
                        className={styles.giftCheckbox}
                      />
                      <label htmlFor="co-gift" className={styles.giftLabel}>
                        This is a gift — include a gift note
                      </label>
                    </div>

                    {form.isGift && (
                      <div className={`${styles.full} field`}>
                        <label htmlFor="co-giftnote">
                          Gift note <span aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="co-giftnote"
                          value={form.giftNote}
                          onChange={(e) => set("giftNote", e.target.value)}
                          aria-invalid={!!errors.giftNote}
                          placeholder="A short note to accompany the fragrance…"
                        />
                        {errors.giftNote && <p className="field-error">{errors.giftNote}</p>}
                      </div>
                    )}
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    <span className={styles.legendIndex}>03</span> Payment
                  </legend>
                  <div className={styles.paymentOptions}>
                    <div className={styles.paymentOption}>
                      <input
                        type="radio"
                        id="pay-confirm"
                        name="payment"
                        defaultChecked
                        className={styles.paymentRadio}
                      />
                      <label htmlFor="pay-confirm">
                        <span className={styles.paymentName}>Confirm with our team</span>
                        <span className={styles.paymentDesc}>
                          A DOM126 team member contacts you after you place your
                          order to arrange payment and delivery.
                        </span>
                      </label>
                    </div>
                    <div className={`${styles.paymentOption} ${styles.paymentDisabled}`}>
                      <input
                        type="radio"
                        id="pay-online"
                        name="payment"
                        disabled
                        className={styles.paymentRadio}
                      />
                      <label htmlFor="pay-online">
                        <span className={styles.paymentName}>
                          Online payment <span className={styles.soonTag}>Coming soon</span>
                        </span>
                        <span className={styles.paymentDesc}>
                          Secure online checkout (card, transfer, USSD) is being
                          prepared and is not yet available.
                        </span>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* ---------- summary column ---------- */}
              <aside className={styles.summary} aria-label="Order summary">
                <h2 className={styles.summaryTitle}>Your Order</h2>
                <ul className={styles.summaryItems}>
                  {lines.map((l) => (
                    <li key={l.slug} className={styles.summaryItem}>
                      <span className={styles.summaryName}>
                        {l.name}
                        <span className={styles.summaryQty}> × {l.qty}</span>
                      </span>
                      <Price value={l.lineTotal} />
                    </li>
                  ))}
                </ul>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({count} item{count === 1 ? "" : "s"})</span>
                  <Price value={subtotal} className={styles.summaryValue} />
                </div>
                <div className={styles.summaryRowMuted}>
                  <span>Delivery</span>
                  <span>Confirmed with your order</span>
                </div>
                <p className={styles.summaryNote}>
                  Placing this order sends an order request. The DOM126 team will
                  contact you using the details provided to confirm your order
                  and arrange payment and delivery.
                </p>
                <Button type="submit" variant="primary" full arrow disabled={submitting}>
                  {submitting ? "Placing Order…" : "Place Order"}
                </Button>
                <p className={styles.terms}>
                  By placing your order you agree to our{" "}
                  <Link href="/terms">Terms &amp; Conditions</Link> and{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </p>
              </aside>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
