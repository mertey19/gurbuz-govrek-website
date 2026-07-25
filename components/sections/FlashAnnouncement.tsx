import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { flashAnnouncement } from "@/data/flashAnnouncement";

/**
 * Hero'nun hemen altında duran, dikkat çekici tek satırlık duyuru şeridi.
 * Sayfanın geri kalanı krem/beyaz olduğu için altın zemin burada bilinçli
 * bir kesinti oluşturur; tercih döneminde göz ilk buraya gider.
 */
export function FlashAnnouncement() {
  if (!flashAnnouncement.isActive) return null;

  return (
    <section
      aria-labelledby="flas-duyuru-basligi"
      className="border-y border-gold/45 bg-gold-light/95"
    >
      <Container className="py-5 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-start gap-4">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-gold-light"
              aria-hidden="true"
            >
              <Sparkles className="size-5" />
            </span>

            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-navy px-2.5 py-1 text-[10px] font-extrabold tracking-[.14em] text-gold-light uppercase">
                  {flashAnnouncement.badge}
                </span>
                <span
                  id="flas-duyuru-basligi"
                  className="font-serif text-xl leading-tight font-semibold text-navy sm:text-2xl"
                >
                  {flashAnnouncement.title}
                </span>
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-navy/72">
                {flashAnnouncement.description}
              </p>
            </div>
          </div>

          <Link
            href={flashAnnouncement.ctaHref}
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-navy px-6 text-sm font-bold text-white transition hover:bg-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy"
          >
            {flashAnnouncement.ctaLabel}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
