"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { findOrder, type StoredOrder } from "@/lib/orders";
import { buildOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { formatDate } from "@/lib/format";
import Price from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import styles from "./ConfirmationView.module.css";

const NEXT_STEPS = [
  {
    title: "We confirm your order",
    copy: "A member of the DOM126 team contacts you using the details you provided.",
  },
  {
    title: "Payment & delivery arranged",
    copy: "Payment is completed with our team, and delivery to your address is scheduled.",
  },
  {
    title: "Your fragrance arrives",
    copy: "Wear it confidently — and make it part of your presence.",
  },
];

export default function ConfirmationView() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [order, setOrder] = useState<StoredOrder | null | undefined>(undefined);

  useEffect(() => {
    setOrder(ref ? (findOrder(ref) ?? null) : null);
  }, [ref]);

  if (order === undefined) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: "center", paddingBlock: "3rem" }}>
          <p style={{ color: "var(--ink-soft)" }}>Retrieving your order…</p>
        </div>
      </section>
    );
  }

  if (order === null) {
    return (
      <section className="section">
        <div className={`container ${styles.missing}`}>
          <h1 className={styles.missingTitle}>Order not found on this device</h1>
          <p className={styles.missingCopy}>
            We couldn&rsquo;t find order {ref ? <strong>{ref}</strong> : ""} on this
            device. If you have placed an order, rest assured — our team will
            contact you using the details you provided. You can also reach us
            through the <Link href="/contact">contact page</Link>.
          </p>
          <ButtonLink href="/shop" variant="outline-dark">
            Back to the Collection
          </ButtonLink>
        </div>
      </section>
    );
  }

  const waLink = buildWhatsAppLink(
    buildOrderMessage({
      ref: order.ref,
      lines: order.lines.map((l) => ({ name: l.name, size: l.size, qty: l.qty, price: l.price })),
      subtotal: order.subtotal,
      customerName: order.customer.name,
    })
  );

  return (
    <section className="section">
      <div className={`container ${styles.wrap}`}>
        <span className={styles.check}>
          <CheckIcon size={30} />
        </span>
        <h1 className={styles.title}>Order request received</h1>
        <p className={styles.ref}>
          Reference <strong>{order.ref}</strong> · {formatDate(order.createdAt)}
        </p>
        <p className={styles.copy}>
          Thank you, {order.customer.name.split(" ")[0]}. A member of the DOM126
          team will contact you shortly to confirm your order and arrange payment
          and delivery.
        </p>

        <div className={styles.details}>
          <div className={styles.detailsCard}>
            <h2 className={styles.cardTitle}>Your items</h2>
            <ul className={styles.items}>
              {order.lines.map((l) => (
                <li key={l.slug} className={styles.item}>
                  <span>
                    {l.name} <span className={styles.itemMeta}>({l.size}) × {l.qty}</span>
                  </span>
                  <Price value={l.price * l.qty} />
                </li>
              ))}
            </ul>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <Price value={order.subtotal} className={styles.total} />
            </div>
            <p className={styles.deliveryNote}>Delivery — confirmed with your order</p>
          </div>

          <div className={styles.detailsCard}>
            <h2 className={styles.cardTitle}>Delivery to</h2>
            <address className={styles.address}>
              {order.customer.name}
              <br />
              {order.customer.address}
              <br />
              {order.customer.city}, {order.customer.state}
              <br />
              {order.customer.phone}
              <br />
              {order.customer.email}
            </address>
            {order.customer.giftNote ? (
              <p className={styles.giftNote}>
                <strong>Gift note:</strong> “{order.customer.giftNote}”
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.nextSteps}>
          <h2 className={styles.cardTitle}>What happens next</h2>
          <ol className={styles.steps}>
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.stepIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong className={styles.stepTitle}>{s.title}</strong>
                  <span className={styles.stepCopy}>{s.copy}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.actions}>
          {waLink && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <WhatsAppIcon size={17} /> Send order via WhatsApp
            </a>
          )}
          <ButtonLink href="/shop" variant="outline-dark">
            Continue Shopping
          </ButtonLink>
        </div>

        <p className={styles.paymentNote}>
          Secure online payment is coming soon — payment for this order is
          arranged personally when our team confirms it.
        </p>
      </div>
    </section>
  );
}
