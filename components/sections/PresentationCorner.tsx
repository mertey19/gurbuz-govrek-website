"use client";

import { SiteImage as Image } from "@/components/ui/SiteImage";
import { ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  presentationCollections,
  presentationSlideCount,
  type PresentationCategory,
} from "@/data/presentationCollections";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function PresentationCorner() {
  const [category, setCategory] = useState<PresentationCategory>("seminer");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const activeCollection =
    presentationCollections.find((collection) => collection.id === category) ??
    presentationCollections[0];
  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null
          ? null
          : (current - 1 + activeCollection.slides.length) %
            activeCollection.slides.length,
      ),
    [activeCollection.slides.length],
  );
  const next = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null
          ? null
          : (current + 1) % activeCollection.slides.length,
      ),
    [activeCollection.slides.length],
  );

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

  const selectCategory = (nextCategory: PresentationCategory) => {
    setCategory(nextCategory);
    setActiveIndex(null);
  };

  const activeSlide =
    activeIndex === null ? null : activeCollection.slides[activeIndex];

  return (
    <section id="sunum-kosesi" className="section-space overflow-hidden bg-navy">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <SectionTitle
              eyebrow="Sunum ve Seminer Köşesi"
              title="Meslekleri ve Tercih Sürecini Görsellerle Keşfedin"
              description="Hazırlanan slayt serilerini konu başlığına göre inceleyin; ayrıntıları okumak için dilediğiniz görseli büyütün."
              tone="light"
            />
            <div className="rounded-sm border border-white/12 bg-white/[.055] p-5 text-white">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold text-navy">
                  <Images className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-2xl font-semibold">{presentationSlideCount} özgün görsel</p>
                  <p className="mt-0.5 text-xs text-white/52">{presentationCollections.length} ayrı içerik serisi</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <label className="block md:hidden" htmlFor="sunum-serisi">
            <span className="mb-2 block text-[10px] font-bold tracking-[.18em] text-gold-light uppercase">İçerik serisini seçin</span>
            <select
              id="sunum-serisi"
              value={category}
              onChange={(event) => selectCategory(event.target.value as PresentationCategory)}
              className="h-14 w-full rounded-sm border border-white/15 bg-white px-4 text-sm font-bold text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
            >
              {presentationCollections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.label} · {collection.slides.length} görsel
                </option>
              ))}
            </select>
          </label>
          <div
            className="hidden gap-2 rounded-sm border border-white/10 bg-white/[.045] p-2 md:grid md:grid-cols-3 xl:grid-cols-4"
            role="tablist"
            aria-label="Sunum kategorileri"
          >
            {presentationCollections.map((collection) => {
              const active = collection.id === category;
              return (
                <button
                  key={collection.id}
                  id={`sunum-tab-${collection.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="sunum-panel"
                  onClick={() => selectCategory(collection.id)}
                  className={`min-h-14 rounded-sm px-4 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    active
                      ? "bg-gold text-navy shadow-lg"
                      : "text-white/68 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <span className="hidden xl:inline">{collection.label}</span>
                  <span className="xl:hidden">{collection.shortLabel}</span>
                  <span className={active ? "text-navy/55" : "text-gold-light/72"}> · {collection.slides.length}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="sunum-panel"
          role="tabpanel"
          aria-label={activeCollection.label}
          className="mt-9"
        >
          <div className="flex flex-col gap-2 border-b border-white/12 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <p className="text-[10px] font-bold tracking-[.18em] text-gold-light uppercase">Seçili seri</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
                {activeCollection.label}
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/55">
              {activeCollection.description}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {activeCollection.slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-white text-left shadow-[0_14px_35px_rgba(0,0,0,.16)] transition hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_20px_45px_rgba(0,0,0,.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                aria-label={`${slide.title} görselini büyüt`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                />
                <span className="absolute top-3 left-3 rounded-full bg-navy/88 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur">
                  {index + 1} / {activeCollection.slides.length}
                </span>
                <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-navy/85 text-gold-light opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>

      {activeSlide && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center overflow-y-auto bg-[#020a14]/96 p-3 sm:p-6"
          role="presentation"
          onMouseDown={(event) => event.target === event.currentTarget && close()}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sunum-dialog-title"
            className="landscape-dialog relative block max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl overflow-y-auto rounded-sm bg-navy shadow-2xl sm:max-h-[calc(100dvh-3rem)] lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:overflow-hidden"
          >
            <div className="landscape-dialog-media relative aspect-square min-h-0 bg-white lg:h-[min(84vh,860px)]">
              <Image
                src={activeSlide.src}
                alt={activeSlide.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 78vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={previous}
                className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy/88 text-white shadow-lg backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:size-12"
                aria-label="Önceki slayt"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy/88 text-white shadow-lg backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:size-12"
                aria-label="Sonraki slayt"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>

            <div className="landscape-dialog-copy relative flex min-h-52 flex-col justify-end p-7 text-white lg:p-9">
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                aria-label="Sunumu kapat"
              >
                <X aria-hidden="true" />
              </button>
              <p className="eyebrow">Sunum köşesi</p>
              <h2 id="sunum-dialog-title" className="mt-3 font-serif text-3xl font-semibold">
                {activeCollection.label}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/58">
                {activeCollection.description}
              </p>
              <p className="mt-7 text-xs font-bold tracking-[.16em] text-gold-light uppercase">
                Slayt {activeIndex + 1} / {activeCollection.slides.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
