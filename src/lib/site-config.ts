/**
 * DOM126 Fragrances — central site configuration.
 *
 * This is the single place to update brand-level values.
 * Values marked as empty ("") are intentionally unconfirmed and the UI
 * gracefully degrades (shows honest "coming soon" states) until they are set.
 *
 * Configure runtime values via environment variables — see `.env.example`.
 * Never place secrets or private credentials in frontend code.
 */

export const siteConfig = {
  name: "DOM126 Fragrances",
  shortName: "DOM126",
  tagline: "Smell Good. Be Remembered.",
  description:
    "Discover DOM126 premium fragrances designed to express confidence, individuality and unforgettable presence. Explore our collection and create your custom signature scent.",

  /** Canonical production URL — set via NEXT_PUBLIC_SITE_URL (used for SEO & sitemap). */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dom126-fragrances.example.com",

  currency: "NGN",

  /** Official WhatsApp ordering number (international format, digits only). Empty = coming soon. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",

  /** Public contact email. Empty = not shown. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",

  /**
   * Social profiles. Leave empty until the official handles exist —
   * the footer then renders them as "coming soon" instead of fake links.
   */
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    x: "",
  },
} as const;

export const isWhatsAppOrderingEnabled = siteConfig.whatsappNumber.length >= 10;
