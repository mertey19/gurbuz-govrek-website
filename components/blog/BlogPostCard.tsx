import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";
import { SiteImage as Image } from "@/components/ui/SiteImage";

/**
 * Blog listesi kartı.
 *
 * Hem tüm yazıların listesi hem de ilçe listesi aynı kartı basıyor; işaretleme
 * iki sayfada ayrı ayrı durursa zamanla birbirinden kayıyor.
 */
export type BlogPostCardData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  publishedAtLabel: string;
};

export function BlogPostCard({ post }: { post: BlogPostCardData }) {
  return (
    <article className="depth-card overflow-hidden rounded-sm border border-navy/10 bg-white shadow-[0_18px_55px_rgba(7,26,51,.09)]">
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
  );
}
