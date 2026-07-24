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
