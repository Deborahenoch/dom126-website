/**
 * DOM126 Fragrances — central site configuration.
 *
 * This is the single place to update brand-level values.
 * The URL and WhatsApp number below are the official live values supplied by
 * DOM126 (public business information). Environment variables can override
 * them if ever needed — see `.env.example`.
 *
 * Never place secrets or private credentials in frontend code.
 */

export const siteConfig = {
  name: "DOM126 Fragrances",
  shortName: "DOM126",
  tagline: "Smell Good. Be Remembered.",
  description:
    "Discover DOM126 premium fragrances designed to express confidence, individuality and unforgettable presence. Create your custom signature scent.",

  /** Canonical production URL (used for SEO, Open Graph and the sitemap). */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dom126fragrance.store",

  currency: "NGN",

  /** Official DOM126 WhatsApp ordering number — +234 912 916 8474. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2349129168474",

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
