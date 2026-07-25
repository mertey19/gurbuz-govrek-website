import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SectionRail } from "@/components/layout/SectionRail";
import { MobileCallBar } from "@/components/ui/MobileCallBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CANONICAL_SITE_URL, siteConfig } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${CANONICAL_SITE_URL}/`),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: `${CANONICAL_SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${CANONICAL_SITE_URL}/`,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Gürbüz Gövrek — Doğru Tercih, Mutlu Bir Hayat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  // Search Console ve Bing Webmaster doğrulama kodları ortam değişkeninden gelir;
  // tanımlı değilse ilgili meta etiketi hiç basılmaz.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071A33",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <a href="#main-content" className="skip-link">İçeriğe geç</a>
        <Header />
        <SectionRail />
        {children}
        <Footer />
        <WhatsAppButton />
        <MobileCallBar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
