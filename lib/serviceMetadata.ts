import type { Metadata } from "next";
import { CANONICAL_SITE_URL, siteConfig } from "@/config/site";
import type { SeoServicePage } from "@/data/seoServices";

export function createServiceMetadata(page: SeoServicePage): Metadata {
  const url = `${CANONICAL_SITE_URL}${page.path}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    authors: [{ name: siteConfig.name, url: `${CANONICAL_SITE_URL}/gurbuz-govrek` }],
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      images: [
        {
          url: page.image,
          width: 1280,
          height: 720,
          alt: page.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image],
    },
  };
}
