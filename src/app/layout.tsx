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
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "DOM126 Fragrances | Smell Good. Be Remembered.",
    description: siteConfig.description,
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
    card: "summary_large_image",
    title: "DOM126 Fragrances | Smell Good. Be Remembered.",
    description: siteConfig.description,
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
  logo: `${siteConfig.url}/icon.svg`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
