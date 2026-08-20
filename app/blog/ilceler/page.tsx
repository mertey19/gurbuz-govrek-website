import type { Metadata } from "next";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL } from "@/config/site";
import { districtBlogPosts } from "@/data/blogPosts";

/**
 * İlçe yazılarının ayrı listesi.
 *
 * Yazılar `/blog/<slug>` adreslerinde kalıyor; bu sayfa yalnızca ayrı bir giriş
 * noktası. Açık segment dinamik segmentten önce eşleştiği için `/blog/ilceler`
 * panelden gelen yazılara düşmez.
 */
const title = "Denizli İlçe Rehberleri | Gürbüz Gövrek";
const description =
  "Merkezefendi ve Pamukkale başta olmak üzere Denizli ilçelerinde matematik özel ders ve eğitim desteği için hazırlanan yazılar.";
const pageUrl = `${CANONICAL_SITE_URL}/blog/ilceler`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  // Sayfa site içi gezinmede listelenmiyor; taramaya açık olduğu açıkça yazılıyor.
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    title,
    description,
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export default function DistrictBlogPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream pt-20">
      <section className="border-b border-white/10 bg-navy py-20 text-white sm:py-24">
        <Container>
          <nav aria-label="Sayfa yolu" className="text-xs text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold-light">İlçe Rehberleri</li>
            </ol>
          </nav>

          <p className="eyebrow mt-7">İlçe Rehberleri</p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Denizli İlçelerinde Eğitim Desteği
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            Merkezefendi ve Pamukkale başta olmak üzere ilçelere özel hazırlanan yazılarda
            birebir çalışma, konu eksiklerini kapatma ve sınav hazırlığı ele alınıyor.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mb-9 flex items-center gap-3">
            <MapPin className="size-5 text-gold" aria-hidden="true" />
            <h2 className="text-sm font-extrabold tracking-[0.16em] text-blue-deep uppercase">
              İlçe Yazıları
            </h2>
          </div>

          <div className="depth-grid grid gap-8 lg:grid-cols-2">
            {districtBlogPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>

          <p className="mt-12 border-t border-navy/10 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Tüm blog yazıları
            </Link>
          </p>
        </Container>
      </section>
    </main>
  );
}
