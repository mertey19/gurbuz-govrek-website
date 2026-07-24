import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/config/site";
import { blogPosts } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
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
      url: `${CANONICAL_SITE_URL}/matematik-ozel-ders`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_SITE_URL}/denizli-yks-tercih-danismanligi`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${CANONICAL_SITE_URL}/denizli-ogrenci-koclugu`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${CANONICAL_SITE_URL}/universite-bolum-analizi`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${CANONICAL_SITE_URL}/gurbuz-govrek`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  return [
    ...staticRoutes,
    ...blogPosts.map((post) => ({
      url: `${CANONICAL_SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
