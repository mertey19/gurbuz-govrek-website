import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ExternalLink,
  Info,
  MapPin,
  MessageCircle,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL, siteConfig, whatsappUrl } from "@/config/site";
import {
  ATLAS_CHECKLIST,
  COMMON_MISTAKES,
  PAU_DISTRICT_CAMPUSES,
  PAU_FACTS,
  PAU_FACULTIES,
  STAY_OR_LEAVE_FACTORS,
} from "@/data/pamukkaleUniversitesi";

const title = "Pamukkale Üniversitesi Tercih Rehberi | Denizli'de Üniversite Okumak";
const description =
  "Pamukkale Üniversitesi'nin fakülte yapısı, Kınıklı yerleşkesi ve ilçe meslek yüksekokulları. Taban puan yerine başarı sırasını doğru okuma ve “kendi şehrimde mi okusam?” sorusuna yanıt.";
const pageUrl = `${CANONICAL_SITE_URL}/pamukkale-universitesi`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    locale: "tr_TR",
    url: pageUrl,
    title,
    description,
    images: ["/images/university-guidance.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/university-guidance.webp"],
  },
};

const faqs = [
  {
    question: "Pamukkale Üniversitesi'nde kaç fakülte var?",
    answer: `Üniversitenin resmî sayfasına göre ${PAU_FACTS.facultyCount} fakülte, ${PAU_FACTS.instituteCount} enstitü, ${PAU_FACTS.vocationalSchoolCount} meslek yüksekokulu ve ${PAU_FACTS.researchCenterCount} uygulama ve araştırma merkezi bulunur. Merkez fakülteler ağırlıklı olarak Kınıklı Yerleşkesi'nde yer alır.`,
  },
  {
    question: "Pamukkale Üniversitesi taban puanlarını nereden öğrenebilirim?",
    answer:
      "Taban puan ve başarı sırası verileri her yıl değişir. Güncel ve doğru bilgi yalnızca ÖSYM'nin ilgili yıla ait tercih kılavuzundan ve YÖK Atlas'tan alınmalıdır. Üçüncü sitelerde yayımlanan tablolar çoğu zaman geçmiş yıla aittir.",
  },
  {
    question: "Taban puana mı başarı sırasına mı bakmalıyım?",
    answer:
      "Başarı sırasına bakılmalıdır. Puanlar her yıl sınavın zorluğuna ve katsayılara göre farklı ölçekte oluştuğu için yıllar arası karşılaştırmaya uygun değildir; başarı sırası ise karşılaştırılabilir bir ölçüdür.",
  },
  {
    question: "Kendi şehrimde okumak dezavantaj mı?",
    answer:
      "Tek başına ne avantaj ne dezavantajdır. Belirleyici olan, hedeflediğiniz programın içeriği, akademik kadrosu ve uygulama olanaklarıdır. Aile yanında okumanın sağladığı maliyet avantajı ile programın hedeflerinize uygunluğu birlikte değerlendirilmelidir.",
  },
  {
    question: "İlçelerde de Pamukkale Üniversitesi programları var mı?",
    answer: `Evet. Merkez yerleşkelerin yanında ${PAU_DISTRICT_CAMPUSES.join(", ")} ilçelerinde meslek yüksekokulları bulunur. Bu programlar ön lisans düzeyindedir ve Dikey Geçiş Sınavı ile lisans tamamlama olanağı sunar.`,
  },
];

const officialSources = [
  { label: "Pamukkale Üniversitesi resmî sitesi", href: "https://www.pau.edu.tr/" },
  { label: "YÖK Atlas — program, kontenjan ve yerleşme istatistikleri", href: "https://yokatlas.yok.gov.tr/" },
  { label: "ÖSYM — güncel tercih kılavuzu ve duyurular", href: "https://osym.gov.tr/" },
];

export default function PamukkaleUniversitesiPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      inLanguage: "tr-TR",
      url: pageUrl,
      author: { "@id": `${CANONICAL_SITE_URL}/#person` },
      publisher: { "@id": `${CANONICAL_SITE_URL}/#person` },
      about: {
        "@type": "CollegeOrUniversity",
        name: "Pamukkale Üniversitesi",
        url: "https://www.pau.edu.tr/",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kınıklı Mah. Üniversite Cad. No:11",
          addressLocality: "Pamukkale",
          addressRegion: "Denizli",
          postalCode: "20160",
          addressCountry: "TR",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${CANONICAL_SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Pamukkale Üniversitesi Rehberi", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
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
          </div>
          <Container className="relative py-14 sm:py-20 lg:py-24">
            <nav aria-label="Sayfa yolu" className="text-xs text-white/55">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    Ana Sayfa
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gold-light">Pamukkale Üniversitesi Rehberi</li>
              </ol>
            </nav>

            <p className="eyebrow mt-10">Denizli · Üniversite Rehberi</p>
            <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[3.6rem]">
              Pamukkale Üniversitesi&apos;ni Tercih Etmeden Önce Bilmeniz Gerekenler
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              Denizlili bir öğrencinin en sık sorduğu soru şu: &ldquo;Kendi şehrimde mi okusam,
              başka şehre mi gitsem?&rdquo; Bu sayfa o soruyu, üniversitenin yapısını ve tercih
              verilerini doğru okumayı birlikte ele alıyor.
            </p>

            <div className="mt-9 flex flex-wrap gap-3 text-xs font-bold tracking-[.1em] uppercase">
              <span className="rounded-full border border-white/18 px-4 py-2 text-gold-light">
                {PAU_FACTS.facultyCount} fakülte
              </span>
              <span className="rounded-full border border-white/18 px-4 py-2 text-white/70">
                {PAU_FACTS.vocationalSchoolCount} meslek yüksekokulu
              </span>
              <span className="rounded-full border border-white/18 px-4 py-2 text-white/70">
                {PAU_FACTS.mainCampus}
              </span>
            </div>
          </Container>
        </header>

        {/* Sayısal verilerin neden burada olmadığı açıkça belirtilir. */}
        <section className="border-b border-navy/8 bg-cream">
          <Container className="py-8">
            <p className="flex max-w-4xl items-start gap-3 text-sm leading-7 text-ink/68">
              <Info className="mt-1 size-5 shrink-0 text-blue-deep" aria-hidden="true" />
              <span>
                <strong className="font-bold text-navy">Bu sayfada taban puan tablosu yoktur.</strong>{" "}
                Taban puan, başarı sırası ve kontenjan her yıl değişir; güncel veriler yalnızca{" "}
                <a href="https://yokatlas.yok.gov.tr/" target="_blank" rel="noreferrer" className="font-bold text-blue-deep underline underline-offset-2">
                  YÖK Atlas
                </a>{" "}
                ve{" "}
                <a href="https://osym.gov.tr/" target="_blank" rel="noreferrer" className="font-bold text-blue-deep underline underline-offset-2">
                  ÖSYM
                </a>{" "}
                kaynaklarından alınmalıdır. Burada bu verileri <em>doğru okumayı</em> anlatıyoruz.
              </span>
            </p>
          </Container>
        </section>

        <section className="section-space bg-white">
          <Container className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <p className="eyebrow">Üniversitenin Yapısı</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                Denizli&apos;nin üniversitesi nasıl örgütlenmiş?
              </h2>
              <p className="mt-6 text-base leading-8 text-ink/68">
                Pamukkale Üniversitesi&apos;nin merkez fakülteleri ağırlıklı olarak{" "}
                {PAU_FACTS.mainCampus}&apos;nde toplanır. Sağlık, mühendislik, eğitim ve sosyal
                bilimler alanlarındaki programların büyük bölümü burada yürütülür.
              </p>
              <p className="mt-4 text-base leading-8 text-ink/68">
                Bunun yanında üniversitenin ilçelerde meslek yüksekokulları bulunur. Bu yapı,
                ön lisans düzeyinde yerel bir eğitim ağı oluşturur ve Dikey Geçiş Sınavı ile
                lisans tamamlama yolunu açık tutar.
              </p>

              <div className="mt-8 rounded-sm border border-navy/10 bg-cream/60 p-6">
                <p className="flex items-center gap-2.5 text-xs font-extrabold tracking-[.14em] text-blue-deep uppercase">
                  <MapPin className="size-4 text-gold" aria-hidden="true" />
                  İlçe meslek yüksekokulları
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {PAU_DISTRICT_CAMPUSES.map((district) => (
                    <li
                      key={district}
                      className="rounded-full border border-navy/12 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy"
                    >
                      {district}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-sm border border-navy/10 bg-cream/55 p-7 sm:p-8">
              <p className="flex items-center gap-2.5 text-xs font-extrabold tracking-[.14em] text-blue-deep uppercase">
                <Building2 className="size-4 text-gold" aria-hidden="true" />
                Fakülteler
              </p>
              <ul className="mt-5 grid gap-2">
                {PAU_FACULTIES.map((faculty) => (
                  <li key={faculty} className="flex items-start gap-2.5 text-sm leading-6 text-ink/70">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {faculty}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-6 text-ink/50">
                Kaynak: pau.edu.tr. Program açılış ve kapanışları yıllara göre değişebilir;
                tercih öncesinde güncel ÖSYM kılavuzundan doğrulayın.
              </p>
            </div>
          </Container>
        </section>

        <section className="section-space bg-cream">
          <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">Veriyi Doğru Okumak</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                YÖK Atlas&apos;ta neye, hangi sırayla bakılır?
              </h2>
              <p className="mt-6 text-base leading-8 text-ink/65">
                Tercih döneminde en sık yapılan hata, geçen yılın taban puanına bakıp karar
                vermek. Puan her yıl farklı bir ölçekte oluşur; karşılaştırılabilir olan
                başarı sırasıdır.
              </p>
              <a
                href="https://yokatlas.yok.gov.tr/"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-deep underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                YÖK Atlas&apos;ı aç
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>

            <ol className="grid gap-4">
              {ATLAS_CHECKLIST.map((item, index) => (
                <li
                  key={item.slice(0, 30)}
                  className="grid gap-4 rounded-sm border border-navy/9 bg-white p-6 shadow-[0_14px_40px_rgba(7,26,51,.05)] sm:grid-cols-[3rem_1fr]"
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-gold/55 bg-cream font-serif font-semibold text-navy">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-ink/70">{item}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="section-space bg-white">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow justify-center">Asıl Soru</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                Kendi şehrimde mi okusam, başka şehre mi gitsem?
              </h2>
              <p className="mt-6 text-base leading-8 text-ink/65">
                Bu sorunun tek bir doğru cevabı yok. Ama kararı duygusal değil, karşılaştırılabilir
                dört başlık üzerinden vermek mümkün.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {STAY_OR_LEAVE_FACTORS.map((factor) => (
                <article
                  key={factor.title}
                  className="rounded-sm border border-navy/10 bg-cream/55 p-7 sm:p-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-sm bg-navy text-gold-light">
                    <CheckCircle2 className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold leading-tight text-navy">
                    {factor.title}
                  </h3>
                  <p className="mt-3.5 text-sm leading-7 text-ink/64">{factor.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="section-space bg-cream">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Dikkat</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                PAÜ tercihinde sık yapılan hatalar
              </h2>
              <ul className="mt-7 grid gap-3">
                {COMMON_MISTAKES.map((mistake) => (
                  <li
                    key={mistake.slice(0, 30)}
                    className="flex gap-3 rounded-sm border border-navy/9 bg-white px-5 py-4 text-sm leading-7 text-ink/70"
                  >
                    <TriangleAlert className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Sık Sorulan Sorular</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                Merak edilenler
              </h2>
              <div className="mt-7 divide-y divide-navy/10 border-y border-navy/10">
                {faqs.map((faq, index) => (
                  <details key={faq.question} className="group py-5" open={index === 0}>
                    <summary className="cursor-pointer list-none pr-8 font-bold leading-7 text-navy">
                      {faq.question}
                    </summary>
                    <p className="mt-3 pr-4 text-sm leading-7 text-ink/64">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-navy py-16 text-white sm:py-20">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow">Tercih Danışmanlığı</p>
                <h2 className="mt-5 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  Listenizi başarı sıranıza göre birlikte kuralım
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                  Pamukkale Üniversitesi&apos;ni ve diğer seçenekleri kendi sıralamanız, ilgi
                  alanlarınız ve bütçenizle birlikte değerlendirelim. Görüşmeler randevu ile
                  planlanır; Denizli&apos;de yüz yüze veya online yapılabilir.
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
            <p className="flex items-center gap-2.5 text-xs font-extrabold tracking-[.17em] text-blue-deep uppercase">
              <BookOpenCheck className="size-4 text-gold" aria-hidden="true" />
              Resmî Kaynaklar
            </p>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {officialSources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full items-start gap-3 rounded-sm border border-navy/10 bg-white px-5 py-4 text-sm font-semibold text-navy transition hover:border-gold/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                  >
                    <ExternalLink className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-xs font-extrabold tracking-[.17em] text-blue-deep uppercase">
              İlgili Sayfalar
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  href: "/universite-bolum-analizi",
                  label: "Üniversite ve Bölüm Analizi",
                  description: "Programları verilerle karşılaştırmalı inceleyin.",
                },
                {
                  href: "/denizli-tercih-danismanligi",
                  label: `${siteConfig.name} ile Tercih Danışmanlığı`,
                  description: "Tercih listenizi birlikte kurun.",
                },
                {
                  href: "/meslekler",
                  label: "Meslek Tanıtım Köşesi",
                  description: "Bölümün götürdüğü mesleği yakından tanıyın.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-sm border border-navy/10 bg-white p-6 transition hover:-translate-y-1 hover:border-gold/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                >
                  <span className="flex items-center justify-between gap-4 font-serif text-lg font-semibold text-navy">
                    {item.label}
                    <ArrowRight className="size-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-ink/58">{item.description}</span>
                </Link>
              ))}
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
