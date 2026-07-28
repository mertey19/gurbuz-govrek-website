import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /istatistik site sahibine ait; bağlantısız ve aramaya kapalı tutulur.
    rules: { userAgent: "*", allow: "/", disallow: ["/istatistik", "/video-yonetimi", "/yorum-yonetimi"] },
    sitemap: `${CANONICAL_SITE_URL}/sitemap.xml`,
  };
}
