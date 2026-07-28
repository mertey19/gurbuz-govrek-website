import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { CANONICAL_SITE_URL } from "@/config/site";
import { getManagedPost, type ManagedPost } from "@/lib/posts/service";

/**
 * Panelden yayımlanan blog yazısı.
 *
 * Koddaki 13 yazının kendi klasörleri var ve açık segment dinamik segmentten
 * önce eşleşir; bu sayfa yalnızca panelden gelen adreslere düşer. API de
 * koddaki adreslerin yeniden kullanılmasını engelliyor, yani iki kaynak
 * çakışmaz.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getManagedPost(slug);

  if (!post) {
    return { title: "Yazı bulunamadı", robots: { index: false, follow: false } };
  }

  const pageUrl = `${CANONICAL_SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: pageUrl,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt.toISOString(),
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

/**
 * Düz metni bloklara ayırır.
 *
 * Panelde zengin metin düzenleyici yok; yazı boş satırla ayrılmış paragraflardan
 * oluşur ve `## ` ile başlayan satır ara başlık sayılır. HTML kabul edilmez —
 * panele yapıştırılan biçimlendirme bu yüzden metin olarak basılır, betik
 * çalıştırılamaz.
 */
type Block = { kind: "heading" | "paragraph"; text: string };

function parseBody(body: string): Block[] {
  return body
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith("## ")
        ? { kind: "heading" as const, text: chunk.slice(3).trim() }
        : { kind: "paragraph" as const, text: chunk },
    );
}

function slugifyHeading(text: string, index: number) {
  return `bolum-${index + 1}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24)}`;
}

function ArticleBody({ post }: { post: ManagedPost }) {
  const blocks = parseBody(post.body);

  return (
    <div className="mt-10 grid gap-6">
      {blocks.map((block, index) =>
        block.kind === "heading" ? (
          <h2
            key={index}
            id={slugifyHeading(block.text, index)}
            className="mt-4 font-serif text-2xl font-semibold text-navy sm:text-3xl"
          >
            {block.text}
          </h2>
        ) : (
          <p key={index} className="text-base leading-8 text-ink">
            {block.text}
          </p>
        ),
      )}
    </div>
  );
}

export default async function ManagedBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getManagedPost(slug);

  if (!post) notFound();

  const published = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeZone: "Europe/Istanbul",
  }).format(post.publishedAt);

  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <article>
        <header className="border-b border-navy/10 bg-cream py-12 sm:py-16">
          <Container className="max-w-3xl">
            <nav aria-label="Sayfa yolu" className="text-xs text-muted">
              <Link href="/" className="hover:text-navy">
                Ana Sayfa
              </Link>{" "}
              <span aria-hidden="true">/</span>{" "}
              <Link href="/blog" className="hover:text-navy">
                Blog
              </Link>
            </nav>

            <p className="mt-5 text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
              {post.category}
            </p>

            <h1 className="mt-3 font-serif text-3xl leading-[1.12] font-semibold text-navy sm:text-4xl">
              {post.title}
            </h1>

            <p className="mt-4 text-xs text-muted">
              <time dateTime={post.publishedAt.toISOString()}>{published}</time> ·{" "}
              {post.readingTime} okuma
            </p>

            {post.description ? (
              <p className="mt-5 text-base leading-8 text-ink">{post.description}</p>
            ) : null}
          </Container>
        </header>

        <Container className="max-w-3xl">
          <div className="mt-10 overflow-hidden rounded-sm border border-navy/10">
            <SiteImage
              src={post.image}
              alt={post.imageAlt}
              width={1280}
              height={720}
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              className="h-auto w-full"
            />
          </div>

          <ArticleBody post={post} />

          <p className="mt-12 border-t border-navy/10 pt-6">
            <Link
              href="/blog"
              className="text-sm font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
            >
              ← Tüm yazılara dön
            </Link>
          </p>
        </Container>
      </article>
    </main>
  );
}
