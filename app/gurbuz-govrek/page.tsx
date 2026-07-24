import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  GraduationCap,
  MessageCircle,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SiteImage as Image } from "@/components/ui/SiteImage";
import { CANONICAL_SITE_URL, siteConfig, whatsappUrl } from "@/config/site";

const pageUrl = `${CANONICAL_SITE_URL}/gurbuz-govrek`;
const title = "Gürbüz Gövrek Kimdir? | Matematik Öğretmeni ve Tercih Uzmanı";
const description =
  "Gürbüz Gövrek’in eğitim yolculuğu, matematik öğretmenliği, öğrenci rehberliği yaklaşımı, çalışma alanları ve basına yansıyan eğitim çalışmaları.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  authors: [{ name: siteConfig.name, url: pageUrl }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    locale: "tr_TR",
    url: pageUrl,
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: "/images/guidance-introduction.png",
        width: 1280,
        height: 720,
        alt: "Matematik öğretmeni ve tercih uzmanı Gürbüz Gövrek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/guidance-introduction.png"],
  },
};

const educationJourney = [
  { institution: "Hacıhamzalı Köyü", field: "Eğitim yolculuğunun ilk durağı" },
  { institution: "Cengiz Topel Lisesi", field: "Ortaöğretim" },
  { institution: "Tarsus Endüstri Meslek Lisesi", field: "Teknik eğitim" },
  { institution: "Yıldız Teknik Üniversitesi", field: "Elektrik Mühendisliği" },
  { institution: "Pamukkale Üniversitesi", field: "Eğitim Fakültesi" },
  { institution: "Çukurova Üniversitesi", field: "Hukuk Fakültesi" },
] as const;

const expertise = [
  {
    title: "Matematik Eğitimi",
    text: "Konu eksiğini belirleyen, neden-sonuç ilişkisini kuran ve öğrencinin düşünme sürecini görünür kılan anlatım.",
    href: "/matematik-ozel-ders",
  },
  {
    title: "YKS Tercih Danışmanlığı",
    text: "Başarı sırası, program verileri ve öğrencinin kişisel hedeflerini aynı karar planında buluşturan yaklaşım.",
    href: "/denizli-yks-tercih-danismanligi",
  },
  {
    title: "Öğrenci Koçluğu",
    text: "Gerçekçi hedef, sürdürülebilir çalışma düzeni, düzenli takip ve açık geri bildirim.",
    href: "/denizli-ogrenci-koclugu",
  },
  {
    title: "Üniversite ve Bölüm Analizi",
    text: "Ders planı, akademik yapı, kontenjan, kampüs ve kariyer olanaklarını karşılaştırmalı değerlendirme.",
    href: "/universite-bolum-analizi",
  },
] as const;

const pressArchive = [
  {
    source: "Haber3",
    date: "20 Nisan 2012",
    title: "YGS’de Gazipaşa birincisi Körfez’den",
    description:
      "Gazipaşa’daki YGS başarısına ilişkin haberde Gürbüz Gövrek’in eğitim yöneticisi olarak değerlendirmelerine yer verildi.",
    href: "https://www.haber3.com/guncel/ygsde-gazipasa-birincisi-korfezden-haberi-1257476",
  },
  {
    source: "Haberin Adresi",
    date: "17 Temmuz 2014",
    title: "LYS’de ilk bine girenlere plaket",
    description:
      "Isparta’daki öğrenci başarılarının aktarıldığı haberde Gürbüz Gövrek’in eğitim koordinatörü olarak görüşleri yayımlandı.",
    href: "https://www.haberinadresi.com/diger/lysde-ilk-bine-girenlere-plaket-h7321-189326h",
  },
] as const;

export default function GurbuzGovrekPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: title,
      description,
      url: pageUrl,
      mainEntity: {
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: "Matematik Öğretmeni ve Tercih Uzmanı",
        url: pageUrl,
        image: `${CANONICAL_SITE_URL}/images/guidance-introduction.png`,
        description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        sameAs: [siteConfig.contact.instagram],
        knowsAbout: [
          "Matematik Eğitimi",
          "YKS Tercih Danışmanlığı",
          "Üniversite ve Bölüm Analizi",
          "Öğrenci Koçluğu",
          "Kariyer Rehberliği",
        ],
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
          name: "Gürbüz Gövrek",
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <>
      <main id="main-content" className="min-h-screen bg-white pt-20">
        <header className="relative overflow-hidden bg-navy text-white">
          <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
            <div className="absolute -top-24 -left-28 size-[28rem] rounded-full border border-gold" />
            <div className="absolute top-20 right-10 size-72 rounded-full border border-white" />
          </div>
          <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[.92fr_1.08fr] lg:gap-20 lg:py-24">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] max-h-[650px] overflow-hidden rounded-sm border border-white/12 shadow-2xl">
                <Image
                  src="/images/guidance-introduction.png"
                  alt="Matematik öğretmeni ve tercih uzmanı Gürbüz Gövrek çalışma masasında"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-[62%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/38 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute -right-3 -bottom-5 max-w-[260px] border-l-2 border-gold bg-white p-5 text-navy shadow-xl sm:-right-7 sm:p-6">
                <p className="font-serif text-lg leading-7">
                  “Doğru tercih, öğrenciyi tanımakla başlar.”
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <nav aria-label="Sayfa yolu" className="text-xs text-white/55">
                <ol className="flex items-center gap-2">
                  <li>
                    <Link href="/" className="transition hover:text-white">
                      Ana Sayfa
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-gold-light">Gürbüz Gövrek</li>
                </ol>
              </nav>
              <p className="eyebrow mt-10">Matematik Öğretmeni · Tercih Uzmanı</p>
              <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[4rem]">
                Matematik Öğretmenliği ile Tercih Rehberliğini Buluşturan Eğitimci
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                Gürbüz Gövrek; matematik eğitimi, öğrenci takibi, üniversite ve bölüm
                analizi ile tercih danışmanlığını öğrencinin bütün gelişimini gözeten
                tek bir yaklaşım içinde ele alır.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={whatsappUrl} external variant="whatsapp">
                  <MessageCircle className="size-5" aria-hidden="true" />
                  WhatsApp&apos;tan Görüş
                </Button>
                <Button href="/blog" variant="outline">
                  Uzman Yazılarını İncele
                </Button>
              </div>
            </div>
          </Container>
        </header>

        <section id="egitim-yolculugu" className="section-space scroll-mt-24 bg-cream">
          <Container className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">Eğitim Yolculuğu</p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                Tarsus’tan Başlayan Çok Yönlü Öğrenme Serüveni
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/65">
                Teknik disiplin, eğitim ve hukuk alanlarıyla şekillenen öğrenme yolculuğu;
                öğrencilere sunulan analitik ve bütüncül rehberlik yaklaşımının temelini oluşturuyor.
              </p>
            </div>
            <ol className="grid gap-4">
              {educationJourney.map((item, index) => (
                <li
                  key={item.institution}
                  className="grid gap-4 rounded-sm border border-navy/9 bg-white p-6 shadow-[0_14px_40px_rgba(7,26,51,.055)] sm:grid-cols-[3.5rem_1fr] sm:p-7"
                >
                  <span className="flex size-12 items-center justify-center rounded-full border border-gold/55 bg-cream font-serif text-sm font-semibold text-navy">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[10px] font-extrabold tracking-[.17em] text-blue-deep/50 uppercase">
                      Eğitim Durağı
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-navy">
                      {item.institution}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-ink/58">{item.field}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="section-space bg-white">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Uzmanlık Alanları</p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                Öğrenciyi Tek Bir Sonuçtan İbaret Görmeyen Yaklaşım
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/65">
                Akademik temel, çalışma düzeni ve gelecek kararı birbirini etkiler. Bu nedenle
                her alan öğrencinin kişisel ihtiyaçlarıyla birlikte değerlendirilir.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {expertise.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-sm border border-navy/10 bg-cream/60 p-7 transition hover:-translate-y-1 hover:border-gold/55 hover:bg-white hover:shadow-[0_18px_50px_rgba(7,26,51,.09)] sm:p-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-sm bg-navy text-gold-light">
                    {index === 0 ? (
                      <BookOpenText className="size-6" aria-hidden="true" />
                    ) : index === 1 ? (
                      <GraduationCap className="size-6" aria-hidden="true" />
                    ) : (
                      <ShieldCheck className="size-6" aria-hidden="true" />
                    )}
                  </span>
                  <span className="mt-6 flex items-center justify-between gap-4 font-serif text-2xl font-semibold text-navy">
                    {item.title}
                    <ArrowUpRight className="size-5 text-gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="mt-4 block text-sm leading-7 text-ink/62">{item.text}</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section id="basinda" className="section-space scroll-mt-24 bg-cream">
          <Container>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_.75fr]">
              <div>
                <p className="eyebrow">Basında Gürbüz Gövrek</p>
                <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                  Basına Yansıyan Eğitim Çalışmaları
                </h2>
              </div>
              <p className="text-base leading-8 text-ink/62">
                Aşağıdaki bağlantılar, bağımsız haber kuruluşlarında yayımlanmış arşiv
                içerikleridir. Kaynak başlığı ve yayın tarihiyle birlikte sunulmuştur.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {pressArchive.map((item) => (
                <article
                  key={item.href}
                  className="rounded-sm border border-navy/10 bg-white p-7 shadow-[0_16px_45px_rgba(7,26,51,.06)] sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-sm bg-navy text-gold-light">
                      <Newspaper className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-extrabold tracking-[.13em] text-blue-deep uppercase">
                        {item.source}
                      </p>
                      <p className="mt-1 text-xs text-ink/45">{item.date}</p>
                    </div>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-ink/62">{item.description}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                  >
                    Haberi kaynağında aç
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-navy py-16 text-white sm:py-20">
          <Container className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">İletişim</p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                Öğrencinin ihtiyacını konuşarak doğru çalışma yolunu belirleyelim
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                Matematik eğitimi, öğrenci koçluğu veya tercih danışmanlığı hakkında bilgi
                almak için WhatsApp üzerinden iletişime geçebilirsiniz.
              </p>
            </div>
            <Button href={whatsappUrl} external variant="whatsapp" className="w-full lg:w-auto">
              <MessageCircle className="size-5" aria-hidden="true" />
              WhatsApp&apos;tan Görüş
            </Button>
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
