"use client";

import Image from "next/image";
import { ArrowUpRight, BookOpenText, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mediaArticles } from "@/data/mediaArticles";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function Media() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setActiveIndex(null), []);
  useFocusTrap(dialogRef, activeIndex !== null, close);

  return (
    <section id="medya" className="section-space bg-cream">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionTitle eyebrow="Medyada / Eğitim Gündeminde" title="Tercih Sürecini Anlaşılır Kılan Uzman Görüşleri" description="Öğrencilerin ve velilerin en çok merak ettiği başlıkları, karar vermeyi kolaylaştıran kısa ve açık değerlendirmelerle ele alıyoruz." />
            <div className="relative mt-9 aspect-[16/11] overflow-hidden rounded-sm shadow-[0_25px_60px_rgba(7,26,51,.15)]">
              <Image src="/images/expert-opinion.png" alt="Gürbüz Gövrek televizyon stüdyosunda eğitim gündemini değerlendiriyor" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-center" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {mediaArticles.map((article, index) => (
              <article key={article.title} className="group flex min-h-[265px] flex-col rounded-sm border border-navy/9 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">
                <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[0.17em] text-blue-deep uppercase">{article.category}</span><BookOpenText className="size-5 text-gold" aria-hidden="true" /></div>
                <h3 className="mt-6 font-serif text-xl font-semibold leading-7 text-navy">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/58">{article.summary}</p>
                <button type="button" onClick={() => setActiveIndex(index)} className="mt-auto flex min-h-11 items-end gap-2 pt-5 text-left text-sm font-bold text-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Devamını Oku <ArrowUpRight className="size-4" aria-hidden="true" /></button>
              </article>
            ))}
          </div>
        </div>
      </Container>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/88 p-5 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="article-title" className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-sm bg-white p-7 shadow-2xl sm:p-11">
            <button type="button" onClick={close} className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" aria-label="Yazıyı kapat"><X aria-hidden="true" /></button>
            <p className="eyebrow">{mediaArticles[activeIndex].category}</p>
            <h2 id="article-title" className="mt-4 pr-10 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">{mediaArticles[activeIndex].title}</h2>
            <p className="mt-7 text-lg leading-8 text-ink/70">{mediaArticles[activeIndex].content}</p>
            <p className="mt-8 border-t border-navy/10 pt-5 text-xs leading-5 text-ink/45">Bu içerik genel bilgilendirme amacı taşır. Güncel üniversite verileri ve kişisel hedefler görüşme sırasında ayrıca değerlendirilir.</p>
          </div>
        </div>
      )}
    </section>
  );
}
