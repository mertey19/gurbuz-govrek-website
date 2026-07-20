"use client";

import { SiteImage as Image } from "@/components/ui/SiteImage";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { galleryItems } from "@/data/gallery";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => setActiveIndex((current) => current === null ? null : (current - 1 + galleryItems.length) % galleryItems.length), []);
  const next = useCallback(() => setActiveIndex((current) => current === null ? null : (current + 1) % galleryItems.length), []);
  useFocusTrap(dialogRef, activeIndex !== null, close);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, next, previous]);

  return (
    <section id="galeri" className="section-space bg-white">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow="Görsel Galeri" title="Eğitim Yolculuğundan Kareler" description="Danışmanlık, matematik eğitimi, kampüs buluşmaları ve seminerleri destekleyen seçili görseller." />
          <p className="max-w-sm text-sm leading-6 text-ink/52">Bir görseli büyütmek ve galeri içinde ilerlemek için üzerine tıklayın.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <button key={item.src} type="button" onClick={() => setActiveIndex(index)} className={`group relative overflow-hidden rounded-sm bg-navy text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${index % 5 === 0 ? "aspect-[16/11] sm:col-span-2" : "aspect-[16/12]"}`} aria-label={`${item.title} görselini büyüt`}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" style={{ objectPosition: item.position }} />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,26,51,.88),transparent_58%)] opacity-80 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white"><div><p className="text-[10px] font-bold tracking-[0.17em] text-gold-light uppercase">{item.category}</p><h3 className="mt-1 font-serif text-xl font-semibold">{item.title}</h3></div><span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-navy/35"><Expand className="size-4" aria-hidden="true" /></span></div>
            </button>
          ))}
        </div>
      </Container>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#020a14]/96 p-3 sm:p-7" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="gallery-title" className="relative grid max-h-[94vh] w-full max-w-6xl overflow-hidden rounded-sm bg-navy shadow-2xl lg:grid-cols-[1fr_330px]">
            <div className="relative min-h-[45vh] bg-black lg:min-h-[72vh]">
              <Image src={galleryItems[activeIndex].src} alt={galleryItems[activeIndex].alt} fill sizes="(max-width: 1024px) 100vw, 75vw" className="object-contain" />
              <button type="button" onClick={previous} className="absolute top-1/2 left-3 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy/75 text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" aria-label="Önceki görsel"><ChevronLeft aria-hidden="true" /></button>
              <button type="button" onClick={next} className="absolute top-1/2 right-3 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy/75 text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" aria-label="Sonraki görsel"><ChevronRight aria-hidden="true" /></button>
            </div>
            <div className="relative flex flex-col justify-end p-7 text-white lg:p-9">
              <button type="button" onClick={close} className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" aria-label="Galeriyi kapat"><X aria-hidden="true" /></button>
              <p className="eyebrow">{galleryItems[activeIndex].category}</p>
              <h2 id="gallery-title" className="mt-3 font-serif text-3xl font-semibold">{galleryItems[activeIndex].title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/60">{galleryItems[activeIndex].description}</p>
              <p className="mt-8 text-xs tracking-wider text-white/35">{activeIndex + 1} / {galleryItems.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
