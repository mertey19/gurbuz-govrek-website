import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${CANONICAL_SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${CANONICAL_SITE_URL}/blog`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/blog/denizli-yks-tercih-danismanligi`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
