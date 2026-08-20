import type { Metadata } from "next";
import { BookOpenText } from "lucide-react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL } from "@/config/site";
import { publicBlogPosts } from "@/data/blogPosts";
import { listManagedPosts } from "@/lib/posts/service";

const title = "YKS Tercih Rehberi ve Eğitim Blogu | Gürbüz Gövrek";
const description =
  "YKS tercih süreci, başarı sırası, üniversite ve bölüm seçimi hakkında öğrenciler ve veliler için hazırlanan güncel rehberler.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${CANONICAL_SITE_URL}/blog` },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${CANONICAL_SITE_URL}/blog`,
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

/**
 * Liste iki kaynaktan beslenir: koddaki yazılar ve panelden yayımlananlar.
 * Kart işaretlemesi ortak olsun diye ikisi de aynı şekle dönüştürülür.
 */
type ListedPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  publishedAt: string;
  publishedAtLabel: string;
};

const DATE_LABEL = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeZone: "Europe/Istanbul",
});

// Panel yazıları da her istekte okunur; yayımlanan yazı beklemeden listeye düşer.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const managed = await listManagedPosts();

  const posts: ListedPost[] = [
    ...publicBlogPosts.map((post) => ({ ...post }) as ListedPost),
    ...managed.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      image: post.image,
      imageAlt: post.imageAlt,
      readingTime: post.readingTime,
      publishedAt: post.publishedAt.toISOString(),
      publishedAtLabel: DATE_LABEL.format(post.publishedAt),
    })),
  ].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <main id="main-content" className="min-h-screen bg-cream pt-20">
      <section className="border-b border-white/10 bg-navy py-20 text-white sm:py-24">
        <Container>
          <p className="eyebrow">Gürbüz Gövrek Blog</p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Üniversite Tercihinde Bilinçli Kararlar İçin Rehberler
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            YKS başarı sırasından bölüm analizine kadar tercih döneminde ihtiyaç duyulan
            bilgileri anlaşılır ve uygulanabilir yazılarla ele alıyoruz.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mb-9 flex items-center gap-3">
            <BookOpenText className="size-5 text-gold" aria-hidden="true" />
            <h2 className="text-sm font-extrabold tracking-[0.16em] text-blue-deep uppercase">
              Son Yazılar
            </h2>
          </div>

          <div className="depth-grid grid gap-8 lg:grid-cols-2">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
