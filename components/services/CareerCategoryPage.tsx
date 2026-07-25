import Link from "next/link";
import { ArrowRight, Info, Lightbulb, MessageCircle } from "lucide-react";
import { CareerResourceList } from "@/components/services/CareerResourceList";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL, siteConfig, whatsappUrl } from "@/config/site";
import type { CareerCategory } from "@/data/careerCategories";
import { careerCategories } from "@/data/careerCategories";
import { careerResources } from "@/data/careerResources";

export function CareerCategoryPage({ category }: { category: CareerCategory }) {
  const pageUrl = `${CANONICAL_SITE_URL}/meslekler/${category.slug}`;
  const resources = careerResources.filter((resource) => resource.category === category.key);
  const otherCategories = careerCategories.filter((item) => item.slug !== category.slug);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": pageUrl,
      name: category.heading,
      description: category.description,
      url: pageUrl,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${CANONICAL_SITE_URL}/#website` },
      about: { "@type": "Thing", name: category.label },
      mainEntity: {
        "@type": "ItemList",
        name: category.label,
        numberOfItems: resources.length,
        itemListElement: resources.map((resource, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: resource.title,
          url: `${CANONICAL_SITE_URL}${resource.href}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${CANONICAL_SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Meslek Tanıtım Köşesi",
          item: `${CANONICAL_SITE_URL}/meslekler`,
        },
        { "@type": "ListItem", position: 3, name: category.label, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: category.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <main id="main-content" className="min-h-screen bg-white pt-20">
        <header className="relative overflow-hidden bg-navy text-white">
          <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
            <div className="absolute -top-28 -right-20 size-[30rem] rounded-full border border-gold" />
            <div className="absolute right-48 -bottom-36 size-80 rounded-full border border-white" />
          </div>
          <Container className="relative py-14 sm:py-20 lg:py-24">
            <nav aria-label="Sayfa yolu" className="text-xs text-white/55">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    Ana Sayfa
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/meslekler" className="transition hover:text-white">
                    Meslek Tanıtım Köşesi
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gold-light">{category.shortLabel}</li>
              </ol>
            </nav>
            <p className="eyebrow mt-10">{category.eyebrow}</p>
            <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[3.75rem]">
              {category.heading}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              {category.lead}
            </p>
            <div className="mt-9 flex flex-wrap gap-3 text-xs font-bold tracking-[.1em] uppercase">
              <span className="rounded-full border border-white/18 px-4 py-2 text-gold-light">
                {resources.length} meslek dosyası
              </span>
              <span className="rounded-full border border-white/18 px-4 py-2 text-white/70">
                PDF · ücretsiz
              </span>
            </div>
          </Container>
        </header>

        <section className="section-space bg-white">
          <Container className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <div>
              <p className="eyebrow">Bu Alan Ne Anlama Geliyor?</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                {category.shortLabel} alanını tanıyalım
              </h2>
              <div className="mt-6 grid gap-5">
                {category.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-base leading-8 text-ink/68">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
              {category.considerations.map((item) => (
                <article
                  key={item.title}
                  className="rounded-sm border border-navy/10 bg-cream/60 p-6 shadow-[0_14px_40px_rgba(7,26,51,.05)]"
                >
                  <span className="flex size-10 items-center justify-center rounded-sm bg-navy text-gold-light">
                    <Lightbulb className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold leading-tight text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink/64">{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="section-space bg-cream">
          <Container>
            <p className="eyebrow">Meslek Dosyaları</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              {category.label} tanıtım dosyaları
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink/65">
              Her dosyada mesleğin tanımı, görevleri, gerektirdiği özellikler, çalışma ortamı,
              eğitim süreci ve iş bulma olanakları yer alır. Dosyalar yeni sekmede açılır.
            </p>

            <div className="mt-10">
              <CareerResourceList resources={resources} categoryLabel={category.label} />
            </div>

            <p className="mt-10 flex max-w-3xl items-start gap-3 rounded-sm border border-navy/10 bg-white px-5 py-4 text-xs leading-6 text-ink/58">
              <Info className="mt-0.5 size-4 shrink-0 text-blue-deep/60" aria-hidden="true" />
              <span>
                Meslek tanıtım dosyaları Türkiye İş Kurumu (İŞKUR) tarafından hazırlanan resmî
                yayınlardır ve kaynak gösterilerek paylaşılmaktadır. Kontenjan, taban puan ve
                başarı sırası gibi yıldan yıla değişen veriler için tercih döneminde ÖSYM ve
                YÖK Atlas kaynaklarını esas alınız.
              </span>
            </p>
          </Container>
        </section>

        <section className="section-space bg-white">
          <Container className="grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
            <div>
              <p className="eyebrow">Sık Sorulan Sorular</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                {category.shortLabel} alanı hakkında
              </h2>
              <p className="mt-6 text-base leading-8 text-ink/65">
                Aklınıza takılan başka bir soru varsa WhatsApp üzerinden doğrudan paylaşabilirsiniz.
              </p>
            </div>
            <div className="divide-y divide-navy/10 border-y border-navy/10">
              {category.faqs.map((faq, index) => (
                <details key={faq.question} className="group py-5" open={index === 0}>
                  <summary className="cursor-pointer list-none pr-8 font-bold leading-7 text-navy">
                    {faq.question}
                  </summary>
                  <p className="mt-3 pr-4 text-sm leading-7 text-ink/64">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-navy py-16 text-white sm:py-20">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow">Meslek Seçimi</p>
                <h2 className="mt-5 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  Dosyaları okudunuz; şimdi kendi profilinizle eşleştirelim
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                  Meslekleri tanımak ilk adım. Hangisinin sizin ilgi alanınıza, başarı sıranıza ve
                  yaşam planınıza uyduğunu birlikte değerlendirebiliriz.
                </p>
              </div>
              <Button href={whatsappUrl} external variant="whatsapp" className="w-full lg:w-auto">
                <MessageCircle className="size-5" aria-hidden="true" />
                WhatsApp&apos;tan Görüş
              </Button>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-18">
          <Container>
            <p className="text-xs font-extrabold tracking-[.17em] text-blue-deep/55 uppercase">
              Diğer Puan Türleri
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherCategories.map((item) => (
                <Link
                  key={item.slug}
                  href={`/meslekler/${item.slug}`}
                  className="group rounded-sm border border-navy/10 bg-white p-6 transition hover:-translate-y-1 hover:border-gold/55 hover:shadow-[0_16px_40px_rgba(7,26,51,.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                >
                  <span className="flex items-center justify-between gap-4 font-serif text-lg font-semibold text-navy">
                    {item.shortLabel}
                    <ArrowRight
                      className="size-4 shrink-0 text-gold transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-ink/58">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Link
                href="/universite-bolum-analizi"
                className="group rounded-sm border border-navy/10 bg-cream/50 p-6 transition hover:border-gold/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
              >
                <span className="font-serif text-xl font-semibold text-navy">
                  Üniversite ve Bölüm Analizi
                </span>
                <span className="mt-3 block text-sm leading-6 text-ink/58">
                  Seçtiğiniz mesleğe götüren programları verilerle karşılaştırın.
                </span>
              </Link>
              <Link
                href="/denizli-tercih-danismanligi"
                className="group rounded-sm border border-navy/10 bg-cream/50 p-6 transition hover:border-gold/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
              >
                <span className="font-serif text-xl font-semibold text-navy">
                  {siteConfig.name} ile Tercih Danışmanlığı
                </span>
                <span className="mt-3 block text-sm leading-6 text-ink/58">
                  Meslek seçiminden tercih listesine uzanan süreci birlikte planlayalım.
                </span>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
