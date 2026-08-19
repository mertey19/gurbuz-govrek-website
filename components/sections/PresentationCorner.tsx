"use client";

import { SiteImage as Image } from "@/components/ui/SiteImage";
import { ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  presentationCollections,
  type PresentationCollection,
} from "@/data/presentationCollections";
import { useFocusTrap } from "@/hooks/useFocusTrap";

/**
 * Sunum köşesi.
 *
 * Seriler iki kaynaktan gelir: koddakiler ve panelden yayımlananlar. Panel
 * serileri sunucuda okunup buraya geçirilir; bileşen istemci tarafında olduğu
 * için veritabanına kendisi erişemez.
 *
 * Seriler YKS istatistikleri, meslek slaytları ve genel sunumlar olarak üç
 * bölüme ayrılır. Her bölümde tek bir seri seçicisi kullanılır; kırk üzeri
 * başlığın aynı anda ekrana yığılması önlenir.
 */
export function PresentationCorner({
  extraCollections = [],
}: {
  extraCollections?: readonly PresentationCollection[];
}) {
  const collections = Array.from(
    new Map(
      [...extraCollections, ...presentationCollections].map((collection) => [
        collection.id,
        collection,
      ]),
    ).values(),
  );
  const slideCount = collections.reduce(
    (total, item) => total + item.slides.length,
    0,
  );

  // Panelden eklenen seriler grup taşımıyor; genel Sunumlar bölümünde listelenir.
  const meslekSerileri = collections.filter(
    (collection) => collection.group === "meslek",
  );
  const istatistikSerileri = collections.filter(
    (collection) => collection.group === "istatistik",
  );
  const sunumSerileri = collections.filter(
    (collection) => (collection.group ?? "sunum") === "sunum",
  );

  return (
    <section id="sunum-kosesi" className="section-space overflow-hidden bg-navy">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <SectionTitle
              eyebrow="Sunum ve Seminer Köşesi"
              title="Meslekleri ve Tercih Sürecini Görsellerle Keşfedin"
              description="YKS istatistikleri, meslek slaytları ve sunumlar ayrı bölümlerde toplandı; bir seri seçip dilediğiniz görseli büyütün."
              tone="light"
            />
            <div className="rounded-sm border border-white/12 bg-white/[.055] p-5 text-white">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold text-navy">
                  <Images className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-2xl font-semibold">{slideCount} özgün görsel</p>
                  <p className="mt-0.5 text-xs text-white/52">{collections.length} ayrı içerik serisi</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <PresentationGroupBlock
          anchor="sunum-istatistik"
          eyebrow="YKS ve Tercih Verileri"
          heading="YKS İstatistikleri"
          collections={istatistikSerileri}
        />

        <PresentationGroupBlock
          anchor="sunum-meslek"
          eyebrow="Meslek Tanıtımları"
          heading="Meslek Slaytları"
          collections={meslekSerileri}
        />

        <PresentationGroupBlock
          anchor="sunumlar"
          eyebrow="Rehber ve Seminerler"
          heading="Sunumlar"
          collections={sunumSerileri}
        />
      </Container>
    </section>
  );
}

/**
 * Tek bir grubun sekme şeridi, ızgarası ve büyütme penceresi. Gruplar birbirinden
 * bağımsız: birinde seri değiştirmek diğerini etkilemiyor.
 */
function PresentationGroupBlock({
  anchor,
  eyebrow,
  heading,
  collections,
}: {
  anchor: string;
  eyebrow: string;
  heading: string;
  collections: readonly PresentationCollection[];
}) {
  const [category, setCategory] = useState<string>(collections[0]?.id ?? "");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const activeCollection =
    collections.find((collection) => collection.id === category) ?? collections[0];

  const close = useCallback(() => setActiveIndex(null), []);
  const slideTotal = activeCollection?.slides.length ?? 0;
  const previous = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null || slideTotal === 0
          ? null
          : (current - 1 + slideTotal) % slideTotal,
      ),
    [slideTotal],
  );
  const next = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null || slideTotal === 0 ? null : (current + 1) % slideTotal,
      ),
    [slideTotal],
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

  if (!activeCollection) return null;

  const selectCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    setActiveIndex(null);
  };

  const activeSlide =
    activeIndex === null ? null : activeCollection.slides[activeIndex];

  return (
    <div id={anchor} className="scroll-mt-24 pt-14 first-of-type:pt-10">
      <Reveal>
        <div className="border-t border-white/12 pt-10">
          <p className="text-[10px] font-bold tracking-[.18em] text-gold-light uppercase">
            {eyebrow}
          </p>
          <h3 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            {heading}
          </h3>
          <p className="mt-3 text-sm text-white/52">
            {collections.length} seri ·{" "}
            {collections.reduce((total, item) => total + item.slides.length, 0)} görsel
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mt-8">
        <label className="block" htmlFor={`${anchor}-secim`}>
          <span className="mb-2 block text-[10px] font-bold tracking-[.18em] text-gold-light uppercase">İçerik serisini seçin</span>
          <select
            id={`${anchor}-secim`}
            value={category}
            onChange={(event) => selectCategory(event.target.value)}
            className="h-14 w-full rounded-sm border border-white/15 bg-white px-4 text-sm font-bold text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
          >
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.label} · {collection.slides.length} görsel
              </option>
            ))}
          </select>
        </label>
      </Reveal>

      <div
        id={`${anchor}-panel`}
        role="tabpanel"
        aria-label={activeCollection.label}
        className="mt-9"
      >
        <div className="flex flex-col gap-2 border-b border-white/12 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[.18em] text-gold-light uppercase">Seçili seri</p>
            <h4 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
              {activeCollection.label}
            </h4>
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
                src={slide.thumb}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className={`transition duration-500 group-hover:scale-[1.025] ${
                  activeCollection.thumbnailFit === "contain"
                    ? "object-contain p-1"
                    : "object-cover"
                }`}
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
            aria-labelledby={`${anchor}-dialog-title`}
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
              <p className="eyebrow">{eyebrow}</p>
              <h2 id={`${anchor}-dialog-title`} className="mt-3 font-serif text-3xl font-semibold">
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
    </div>
  );
}
