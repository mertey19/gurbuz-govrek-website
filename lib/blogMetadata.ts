import type { Metadata } from "next";
import { CANONICAL_SITE_URL, siteConfig } from "@/config/site";
import type { BlogPost } from "@/data/blogPosts";

export function createBlogMetadata(post: BlogPost): Metadata {
  const articleUrl = `${CANONICAL_SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | Gürbüz Gövrek`,
    description: post.description,
    alternates: { canonical: articleUrl },
    authors: [{ name: siteConfig.name, url: CANONICAL_SITE_URL }],
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: articleUrl,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [siteConfig.name],
      images: [
        {
          url: post.image,
          width: 1280,
          height: 720,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}
