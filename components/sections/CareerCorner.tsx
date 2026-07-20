"use client";

import { ArrowUpRight, BookOpenCheck, FileText, Search } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { careerResources, type CareerResource } from "@/data/careerResources";

type Category = "TÜMÜ" | CareerResource["category"];

const categories: Category[] = ["TÜMÜ", "TYT", "SÖZ", "SAY", "EA", "DİL"];
const initialLimit = 12;

export function CareerCorner() {
  const [category, setCategory] = useState<Category>("TÜMÜ");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const filteredResources = careerResources.filter((resource) => {
    const matchesCategory = category === "TÜMÜ" || resource.category === category;
    const matchesQuery = !normalizedQuery || resource.title.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });
  const visibleResources = showAll ? filteredResources : filteredResources.slice(0, initialLimit);

  const selectCategory = (nextCategory: Category) => {
    setCategory(nextCategory);
    setShowAll(false);
  };

  return (
    <section id="meslek-kosesi" className="section-space overflow-hidden bg-white">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Meslek Tanıtım Köşesi"
            title="Meslekleri Karar Vermeden Önce Yakından Tanıyın"
            description="Mesleklerin tanımı, görevleri, çalışma alanları ve eğitim süreçleri hakkında hazırlanan kaynakları kategoriye göre filtreleyin veya meslek adıyla arayın."
            align="center"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-bold tracking-[.1em] uppercase">
            <span className="rounded-full border border-navy/10 bg-cream px-4 py-2 text-blue-deep">115 meslek dosyası</span>
            <span className="rounded-full border border-navy/10 bg-cream px-4 py-2 text-blue-deep">5 kategori</span>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-12 rounded-sm border border-navy/10 bg-cream/60 p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Meslek kategorileri">
              {categories.map((item) => {
                const count = item === "TÜMÜ" ? careerResources.length : careerResources.filter((resource) => resource.category === item).length;
                const active = category === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => selectCategory(item)}
                    className={`min-h-10 rounded-full border px-4 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${active ? "border-navy bg-navy text-white" : "border-navy/12 bg-white text-blue-deep hover:border-gold"}`}
                    aria-pressed={active}
                  >
                    {item === "TÜMÜ" ? "Tümü" : item} <span className={active ? "text-gold-light" : "text-ink/40"}>({count})</span>
                  </button>
                );
              })}
            </div>

            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Meslek ara</span>
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink/40" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShowAll(false);
                }}
                placeholder="Meslek adıyla ara..."
                className="h-12 w-full rounded-full border border-navy/12 bg-white pr-4 pl-11 text-sm text-navy outline-none transition placeholder:text-ink/38 focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </label>
          </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-between gap-4 border-b border-navy/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-navy text-gold-light">
              <BookOpenCheck className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-bold tracking-[.16em] text-blue-deep uppercase">{category === "TÜMÜ" ? "Tüm kategoriler" : category}</p>
              <p className="mt-0.5 text-sm text-ink/55">{filteredResources.length} kaynak bulundu</p>
            </div>
          </div>
          <p className="hidden text-xs text-ink/42 sm:block">PDF belgeleri yeni sekmede açılır.</p>
        </div>

        {visibleResources.length > 0 ? (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleResources.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-44 flex-col rounded-sm border border-navy/10 bg-cream/55 p-5 transition hover:-translate-y-1 hover:border-gold/60 hover:bg-white hover:shadow-[0_18px_45px_rgba(7,26,51,.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-navy px-2.5 py-1 text-[9px] font-bold tracking-[.15em] text-gold-light uppercase">{resource.category}</span>
                    <FileText className="size-5 text-blue-deep/55 transition group-hover:text-blue-deep" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg leading-6 font-semibold text-navy">{resource.title}</h3>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-xs font-bold text-blue-deep">
                    PDF&apos;yi İncele
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>

            {filteredResources.length > initialLimit && (
              <div className="mt-9 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((current) => !current)}
                  className="min-h-12 rounded-full border border-navy/15 bg-white px-6 text-sm font-bold text-blue-deep transition hover:border-gold hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  {showAll ? "Daha Az Göster" : `Tümünü Göster (${filteredResources.length})`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 rounded-sm border border-dashed border-navy/20 bg-cream/45 px-6 py-14 text-center">
            <p className="font-serif text-2xl font-semibold text-navy">Aradığınız meslek bulunamadı.</p>
            <p className="mt-2 text-sm text-ink/55">Farklı bir kelime deneyebilir veya başka bir kategori seçebilirsiniz.</p>
          </div>
        )}
      </Container>
    </section>
  );
}
