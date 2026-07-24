import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SiteImage as Image } from "@/components/ui/SiteImage";
import { CANONICAL_SITE_URL, siteConfig, whatsappUrl } from "@/config/site";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogSource = {
  label: string;
  href: string;
};

export function BlogArticleLayout({
  post,
  lead,
  faqs,
  sources,
  children,
}: {
  post: BlogPost;
  lead: string;
  faqs: readonly BlogFaq[];
  sources: readonly BlogSource[];
  children: ReactNode;
}) {
  const articleUrl = `${CANONICAL_SITE_URL}/blog/${post.slug}`;
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      image: `${CANONICAL_SITE_URL}${post.image}`,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: "tr-TR",
      mainEntityOfPage: articleUrl,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        url: `${CANONICAL_SITE_URL}/gurbuz-govrek`,
      },
      publisher: {
        "@type": "Person",
        name: siteConfig.name,
        url: CANONICAL_SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: `${CANONICAL_SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${CANONICAL_SITE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: articleUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <main id="main-content" className="min-h-screen bg-white pt-20">
        <article>
          <header className="bg-navy text-white">
            <Container className="py-12 sm:py-16 lg:py-20">
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
                  <li className="text-gold-light">{post.category}</li>
                </ol>
              </nav>

              <div className="mt-9 grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
                <div>
                  <p className="eyebrow">{post.category}</p>
                  <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.75rem]">
                    {post.title}
                  </h1>
                  <p className="mt-7 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                    {post.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/58">
                    <Link
                      href="/gurbuz-govrek"
                      className="font-bold text-white underline decoration-gold/55 underline-offset-4 transition hover:decoration-gold"
                    >
                      {siteConfig.name}
                    </Link>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-gold" aria-hidden="true" />
                      {post.publishedAtLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-4 text-gold" aria-hidden="true" />
                      {post.readingTime} okuma
                    </span>
                  </div>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-sm border border-white/12 shadow-2xl">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/25 to-transparent" aria-hidden="true" />
                </div>
              </div>
            </Container>
          </header>

          <Container className="py-14 sm:py-20">
            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
              <div className="blog-article mx-auto w-full max-w-3xl lg:mx-0">
                <p className="blog-lead">{lead}</p>
                {children}

                <section aria-labelledby={`${post.slug}-sss`}>
                  <h2 id={`${post.slug}-sss`}>Sık Sorulan Sorular</h2>
                  <div className="mt-7 divide-y divide-navy/10 border-y border-navy/10">
                    {faqs.map((faq) => (
                      <details key={faq.question} className="group py-5">
                        <summary className="cursor-pointer list-none pr-8 font-bold leading-7 text-navy">
                          {faq.question}
                        </summary>
                        <p className="mt-3 text-[0.96rem] leading-7 text-ink/65">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>

                <section aria-labelledby={`${post.slug}-kaynaklar`}>
                  <h2 id={`${post.slug}-kaynaklar`}>Resmî Kaynaklar</h2>
                  <p>
                    Tercih işlemlerinde ilgili yılın güncel ÖSYM kılavuzu ve resmî program
                    verileri esas alınmalıdır.
                  </p>
                  <ul className="blog-sources">
                    {sources.map((source) => (
                      <li key={source.href}>
                        <a href={source.href} target="_blank" rel="noreferrer">
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby={`${post.slug}-ilgili-yazilar`}>
                  <h2 id={`${post.slug}-ilgili-yazilar`}>İlgili Yazılar</h2>
                  <div className="mt-6 grid gap-3">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="rounded-sm border border-navy/10 bg-cream px-5 py-4 font-bold leading-6 text-blue-deep transition hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        {relatedPost.title}
                      </Link>
                    ))}
                  </div>
                </section>

                <p className="mt-10 border-t border-navy/10 pt-6 text-xs leading-6 text-ink/48">
                  Bu yazı genel bilgilendirme amacı taşır. Tercih hakkı, kontenjanlar,
                  burslar ve özel koşullar için ilgili yılın ÖSYM kılavuzu ile üniversitenin
                  resmî açıklamaları esas alınmalıdır.
                </p>
              </div>

              <aside className="lg:sticky lg:top-28" aria-label="Danışmanlık iletişim bilgileri">
                <div className="rounded-sm bg-navy p-7 text-white shadow-[0_22px_60px_rgba(7,26,51,.18)]">
                  <p className="text-[10px] font-extrabold tracking-[0.17em] text-gold-light uppercase">
                    Kişiye Özel Tercih Görüşmesi
                  </p>
                  <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight">
                    Tercih listenizi birlikte değerlendirelim
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/65">
                    Başarı sıranız, hedefleriniz ve bölüm seçenekleriniz için WhatsApp
                    üzerinden bilgi alabilirsiniz.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    <MessageCircle className="size-5" aria-hidden="true" />
                    WhatsApp’tan Görüş
                  </a>
                  <Link
                    href="/denizli-yks-tercih-danismanligi"
                    className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-white/22 px-5 py-3 text-sm font-bold text-white/82 transition hover:border-gold hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                  >
                    Danışmanlık Sürecini İncele
                  </Link>
                </div>
                <Link
                  href="/blog"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Tüm blog yazıları
                </Link>
              </aside>
            </div>
          </Container>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

export function BlogChecklist({
  items,
  tone = "default",
}: {
  items: readonly string[];
  tone?: "default" | "warning";
}) {
  return (
    <ul className="blog-check-list">
      {items.map((item) => (
        <li key={item}>
          <span
            className={tone === "warning" ? "bg-red-50 text-red-700" : "bg-gold/18 text-blue-deep"}
            aria-hidden="true"
          >
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function BlogSteps({ items }: { items: readonly string[] }) {
  return (
    <ol className="blog-steps">
      {items.map((item, index) => (
        <li key={item}>
          <span aria-hidden="true">{index + 1}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}
