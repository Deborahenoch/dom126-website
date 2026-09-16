import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cormorant, manrope } from "@/lib/fonts";
import { CartProvider } from "@/components/cart/CartProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import Analytics from "@/components/layout/Analytics";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "DOM126 Fragrances | Smell Good. Be Remembered.",
    template: "%s | DOM126 Fragrances",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "DOM126",
    "DOM126 Fragrances",
    "premium fragrance Nigeria",
    "perfume Nigeria",
    "custom perfume",
    "signature scent",
    "Boss Man",
    "Ephata",
    "Sweet Savour",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_NG",
    url: siteConfig.url,
    images: [
      {
        url: "/images/brand/hero-texture.jpg",
        width: 1376,
        height: 768,
        alt: "DOM126 Fragrances — premium Nigerian fragrance house",
      },
    ],
  },
  twitter: {
    // Only the card size is pinned here. Title, description and image fall back
    // to each page's Open Graph values, so a link shared from any page previews
    // that page rather than the homepage.
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#070d1a",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: "DOM126",
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icons/icon-512.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+2349129168474",
    contactType: "customer service",
    areaServed: "NG",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  alternateName: "DOM126",
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en-NG",
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icons/icon-512.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CartProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
