"use client";

import { useState, type FormEvent } from "react";
import { generateReference } from "@/lib/format";
import { saveInquiry } from "@/lib/orders";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import styles from "./InquiryForm.module.css";

type InquiryType = "custom-signature" | "contact";

const PERSONALITY_OPTIONS = [
  "Bold & confident",
  "Refined & understated",
  "Warm & expressive",
  "Distinctive & unforgettable",
  "Not sure yet — help me decide",
];

const OCCASION_OPTIONS = [
  "Everyday signature",
  "Special occasions",
  "A gift for someone",
  "Something else",
];

const TOPIC_OPTIONS = [
  "General enquiry",
  "About my order",
  "Custom Signature Perfume",
  "Gifting",
  "Business / press",
];

interface Props {
  type: InquiryType;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  contactPreference: string;
  personality: string;
  occasion: string;
  topic: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  contactPreference: "WhatsApp",
  personality: "",
  occasion: "",
  topic: TOPIC_OPTIONS[0],
  message: "",
};

export default function InquiryForm({ type }: Props) {
  const isSignature = type === "custom-signature";
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState<{ ref: string } | null>(null);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) next.email = "Please provide an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!isSignature && !form.message.trim())
      next.message = "Please write a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const details: Record<string, string> = isSignature
      ? {
          "Fragrance personality": form.personality || "To be discussed",
          Occasion: form.occasion || "To be discussed",
          "Additional notes": form.message || "—",
          "Preferred contact": form.contactPreference,
        }
      : { Topic: form.topic, Message: form.message };

    const inquiry = saveInquiry({
      ref: generateReference(isSignature ? "DOM-SIG" : "DOM-MSG"),
      createdAt: new Date().toISOString(),
      type,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      details,
    });

    setSubmitted({ ref: inquiry.ref });
  };

  const waMessage = submitted
    ? [
        `Hello DOM126! This is ${form.name}.`,
        isSignature
          ? `I have submitted a Custom Signature Perfume request (ref ${submitted.ref}).`
          : `I have sent a message through your website (ref ${submitted.ref}).`,
        isSignature && form.personality ? `Fragrance personality: ${form.personality}.` : "",
        isSignature && form.occasion ? `Occasion: ${form.occasion}.` : "",
        !isSignature ? `Topic: ${form.topic}.` : "",
        form.message ? `Notes: ${form.message}` : "",
        "",
        `Email: ${form.email}`,
        form.phone ? `Phone: ${form.phone}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  const waLink = buildWhatsAppLink(waMessage);

  /* ---------- confirmation ---------- */
  if (submitted) {
    return (
      <div className={styles.confirmation} role="status">
        <span className={styles.confirmIcon}>
          <CheckIcon size={26} />
        </span>
        <h2 className={styles.confirmTitle}>
          {isSignature ? "Your request has been received" : "Your message has been recorded"}
        </h2>
        <p className={styles.confirmRef}>
          Reference <strong>{submitted.ref}</strong>
        </p>
        <p className={styles.confirmCopy}>
          {isSignature
            ? "Thank you. A member of the DOM126 team will contact you personally to begin your signature perfume experience."
            : "Thank you for reaching out. A member of the DOM126 team will get back to you."}
        </p>
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn--primary ${styles.confirmWa}`}
          >
            <WhatsAppIcon size={17} /> Continue on WhatsApp
          </a>
        )}
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            setForm(initialState);
            setSubmitted(null);
          }}
        >
          {isSignature ? "Submit another request" : "Send another message"}
        </button>
      </div>
    );
  }

  /* ---------- form ---------- */
  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <div className="field">
          <label htmlFor={`${type}-name`}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${type}-name`}
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${type}-name-error` : undefined}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="field-error" id={`${type}-name-error`}>
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor={`${type}-email`}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${type}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${type}-email-error` : undefined}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="field-error" id={`${type}-email-error`}>
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor={`${type}-phone`}>Phone / WhatsApp (optional)</label>
          <input
            id={`${type}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="Your phone number"
          />
        </div>

        {isSignature ? (
          <>
            <div className="field">
              <label htmlFor={`${type}-contact`}>Preferred contact method</label>
              <select
                id={`${type}-contact`}
                name="contactPreference"
                value={form.contactPreference}
                onChange={(e) => set("contactPreference", e.target.value)}
              >
                <option>WhatsApp</option>
                <option>Email</option>
                <option>Phone call</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor={`${type}-personality`}>
                Your fragrance personality
              </label>
              <select
                id={`${type}-personality`}
                name="personality"
                value={form.personality}
                onChange={(e) => set("personality", e.target.value)}
              >
                <option value="">Select the closest fit…</option>
                {PERSONALITY_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor={`${type}-occasion`}>What is it for?</label>
              <select
                id={`${type}-occasion`}
                name="occasion"
                value={form.occasion}
                onChange={(e) => set("occasion", e.target.value)}
              >
                <option value="">Select an occasion…</option>
                {OCCASION_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <div className="field">
            <label htmlFor={`${type}-topic`}>Topic</label>
            <select
              id={`${type}-topic`}
              name="topic"
              value={form.topic}
              onChange={(e) => set("topic", e.target.value)}
            >
              {TOPIC_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        )}

        <div className={`${styles.full} field`}>
          <label htmlFor={`${type}-message`}>
            {isSignature ? "Anything else we should know? (optional)" : "Message"}{" "}
            {!isSignature && <span aria-hidden="true">*</span>}
          </label>
          <textarea
            id={`${type}-message`}
            name="message"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `${type}-message-error` : undefined}
            placeholder={
              isSignature
                ? "Scents you love, memories you want to capture, moments you dress for…"
                : "How can we help?"
            }
          />
          {errors.message && (
            <p className="field-error" id={`${type}-message-error`}>
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className={styles.submitRow}>
        <Button type="submit" variant="primary" arrow>
          {isSignature ? "Request Your Signature Perfume" : "Send Message"}
        </Button>
        <p className={styles.privacy}>
          Your details are used only to respond to your{" "}
          {isSignature ? "request" : "message"} — see our{" "}
          <a href="/privacy">privacy policy</a>.
        </p>
      </div>
    </form>
  );
}
