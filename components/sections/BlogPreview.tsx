import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SiteImage as Image } from "@/components/ui/SiteImage";
import { blogPosts } from "@/data/blogPosts";

export function BlogPreview() {
  const post = blogPosts[0];

  return (
    <section id="blog" className="section-space bg-white">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <p className="eyebrow">Blog / Tercih Rehberi</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-[1.08] text-navy sm:text-5xl">
              Tercih Sürecinde Doğru Karar İçin Güncel Rehberler
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-ink/62 sm:text-lg">
              Başarı sırasını, kontenjan değişimlerini ve bölüm seçeneklerini daha bilinçli
              değerlendirmek isteyen öğrenciler ve veliler için hazırlanan yazılar.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-sm bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Tüm Blog Yazıları
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <article className="overflow-hidden rounded-sm border border-navy/10 bg-cream shadow-[0_24px_70px_rgba(7,26,51,.12)]">
            <Link
              href={`/blog/${post.slug}`}
              className="group grid md:grid-cols-[0.9fr_1.1fr] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              aria-label={`${post.title} yazısını oku`}
            >
              <div className="relative min-h-64 overflow-hidden md:min-h-full">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" aria-hidden="true" />
              </div>
              <div className="flex flex-col p-7 sm:p-9">
                <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-blue-deep uppercase">
                  <BookOpenText className="size-4 text-gold" aria-hidden="true" />
                  {post.category}
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-navy sm:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink/60">{post.description}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink/48">
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
        </div>
      </Container>
    </section>
  );
}
