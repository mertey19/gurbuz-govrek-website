import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/config/site";
import { blogPosts } from "@/data/blogPosts";
import { careerCategories } from "@/data/careerCategories";

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
      url: `${CANONICAL_SITE_URL}/denizli-tercih-danismanligi`,
      lastModified: new Date("2026-07-24"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${CANONICAL_SITE_URL}/denizli-tercih-danismani`,
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
    {
      url: `${CANONICAL_SITE_URL}/meslekler`,
      lastModified: new Date("2026-07-25"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${CANONICAL_SITE_URL}/tercih-robotu`,
      lastModified: new Date("2026-07-25"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${CANONICAL_SITE_URL}/2026-kontenjan-degisimi`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${CANONICAL_SITE_URL}/raporlar`,
      lastModified: new Date("2026-07-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_SITE_URL}/raporlar/yks-tercih-kilavuzu-2026`,
      lastModified: new Date("2026-07-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_SITE_URL}/raporlar/universite-raporu-2025-2026`,
      lastModified: new Date("2026-07-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_SITE_URL}/raporlar/tip-fakulteleri`,
      lastModified: new Date("2026-07-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_SITE_URL}/raporlar/tuma-2025-2026`,
      lastModified: new Date("2026-07-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_SITE_URL}/raporlar/urap-2025-2026`,
      lastModified: new Date("2026-07-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_SITE_URL}/pamukkale-universitesi`,
      lastModified: new Date("2026-07-25"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  return [
    ...staticRoutes,
    ...careerCategories.map((category) => ({
      url: `${CANONICAL_SITE_URL}/meslekler/${category.slug}`,
      lastModified: new Date("2026-07-25"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${CANONICAL_SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
