import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SiteImage as Image } from "@/components/ui/SiteImage";
import { CANONICAL_SITE_URL } from "@/config/site";
import { blogPosts } from "@/data/blogPosts";

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
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function BlogPage() {
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

          <div className="grid gap-8 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-sm border border-navy/10 bg-white shadow-[0_18px_55px_rgba(7,26,51,.09)]"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" aria-hidden="true" />
                  </div>
                  <div className="p-7 sm:p-9">
                    <p className="text-[10px] font-extrabold tracking-[0.16em] text-blue-deep uppercase">
                      {post.category}
                    </p>
                    <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight text-navy sm:text-3xl">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-ink/60">{post.description}</p>
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/48">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-4 text-gold" aria-hidden="true" />
                        {post.publishedAtLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="size-4 text-gold" aria-hidden="true" />
                        {post.readingTime}
                      </span>
                    </div>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-deep">
                      Yazıyı Oku
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
