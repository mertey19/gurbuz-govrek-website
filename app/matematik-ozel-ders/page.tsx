import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  BrainCircuit,
  CalendarCheck2,
  Check,
  ClipboardCheck,
  Gauge,
  MessageCircle,
  NotebookPen,
  Target,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SiteImage as Image } from "@/components/ui/SiteImage";
import { CANONICAL_SITE_URL, siteConfig, whatsappUrl } from "@/config/site";

const pageUrl = `${CANONICAL_SITE_URL}/matematik-ozel-ders`;
const title = "Denizli Matematik Özel Ders | Gürbüz Gövrek";
const description =
  "Ortaokul, lise ve TYT-AYT hazırlığında öğrenci seviyesine uygun konu anlatımı, soru çözüm stratejileri, çalışma planı ve düzenli akademik takip.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  authors: [{ name: siteConfig.name, url: `${CANONICAL_SITE_URL}/gurbuz-govrek` }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    title,
    description,
    images: [
      {
        url: "/images/mathematics-education.png",
        width: 1280,
        height: 720,
        alt: "Gürbüz Gövrek ile bire bir matematik özel ders çalışması",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/mathematics-education.png"],
  },
};

const learningAreas = [
  {
    icon: BookOpenCheck,
    title: "Okula Destek",
    description:
      "Güncel konuların anlaşılması, eksik kazanımların tamamlanması ve yazılılara planlı hazırlık.",
  },
  {
    icon: Target,
    title: "TYT–AYT Hazırlığı",
    description:
      "Sınav hedefiyle uyumlu konu sıralaması, soru seçimi, hız ve doğruluk geliştirme çalışmaları.",
  },
  {
    icon: BrainCircuit,
    title: "Sağlam Matematik Temeli",
    description:
      "Ezber yerine neden–sonuç ilişkisini kuran anlatım ve yeni sorulara aktarılabilen düşünme becerisi.",
  },
  {
    icon: TrendingUp,
    title: "Akademik Takip",
    description:
      "Ders içi gözlem, soru çözüm performansı ve çalışma düzenine göre planın düzenli güncellenmesi.",
  },
];

const processSteps = [
  {
    icon: Gauge,
    number: "01",
    title: "Seviye ve İhtiyaç Analizi",
    description:
      "Öğrencinin konu bilgisi, soru çözüm alışkanlığı, hedefi ve zorlandığı noktalar belirlenir.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Kişisel Ders Planı",
    description:
      "Konu sırası, ders sıklığı ve çalışma yükü öğrencinin okul veya sınav takvimine göre planlanır.",
  },
  {
    icon: NotebookPen,
    number: "03",
    title: "Anlatım ve Uygulama",
    description:
      "Konu anlaşılır adımlarla işlenir; kolaydan zora seçilen sorularla düşünme süreci güçlendirilir.",
  },
  {
    icon: CalendarCheck2,
    number: "04",
    title: "Takip ve Geri Bildirim",
    description:
      "İlerleme, tekrar ihtiyacı ve çalışma düzeni değerlendirilerek sonraki derslerin odağı belirlenir.",
  },
];

const benefits = [
  "Öğrencinin seviyesine ve öğrenme hızına uygun anlatım",
  "Konu eksiklerinin sıralı ve ölçülebilir biçimde tamamlanması",
  "İşlem hatası, dikkat ve süre yönetimi üzerine çalışma",
  "Farklı soru tiplerine yaklaşım ve çözüm stratejileri",
  "Düzenli tekrar ve soru çözüm planı",
  "Öğrenci ve veliyle açık, anlaşılır geri bildirim",
];

const faqs = [
  {
    question: "Matematik özel ders kimler için uygundur?",
    answer:
      "Konu eksiklerini tamamlamak, okul başarısını geliştirmek, matematik temelini güçlendirmek veya TYT–AYT hazırlığını daha planlı yürütmek isteyen öğrenciler için uygundur. Çalışmanın içeriği öğrencinin mevcut seviyesine göre belirlenir.",
  },
  {
    question: "Dersler yüz yüze mi, online mı yapılır?",
    answer:
      "Yüz yüze ve online çalışma seçenekleri değerlendirilebilir. Öğrencinin konumu, ihtiyacı ve uygun saatler ilk görüşmede netleştirilir.",
  },
  {
    question: "Ders süresi ve haftalık ders sayısı nasıl belirlenir?",
    answer:
      "Süre ve sıklık; öğrencinin seviyesi, hedefi, okul programı ve sınava kalan zamana göre planlanır. Her öğrenciye aynı program uygulanmaz.",
  },
  {
    question: "Özel ders ücreti nedir?",
    answer:
      "Dersin biçimi, süresi ve çalışma planına göre bilgi verilir. Güncel ücret ve uygunluk için WhatsApp üzerinden iletişime geçebilirsiniz.",
  },
  {
    question: "İlk görüşmede neler değerlendirilir?",
    answer:
      "Öğrencinin sınıf düzeyi, hedefi, zorlandığı konular, mevcut çalışma düzeni ve uygun ders saatleri konuşulur. Ardından izlenebilecek çalışma yolu açıklanır.",
  },
];

export default function MatematikOzelDersPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Matematik Özel Ders",
      description,
      url: pageUrl,
      areaServed: {
        "@type": "City",
        name: "Denizli",
      },
      provider: {
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: "Matematik Öğretmeni",
        url: `${CANONICAL_SITE_URL}/gurbuz-govrek`,
        telephone: siteConfig.contact.phone,
      },
      serviceType: [
        "Matematik Özel Ders",
        "Ortaokul Matematik Dersi",
        "Lise Matematik Dersi",
        "TYT Matematik Hazırlığı",
        "AYT Matematik Hazırlığı",
      ],
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
          name: "Matematik Özel Ders",
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <main id="main-content" className="min-h-screen bg-white pt-20">
        <section className="relative overflow-hidden bg-navy text-white">
          <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
            <div className="absolute -top-24 -right-20 size-96 rounded-full border border-gold" />
            <div className="absolute right-40 bottom-0 size-64 rounded-full border border-white" />
          </div>
          <Container className="relative grid items-center gap-11 py-14 sm:py-18 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:py-22">
            <div>
              <nav aria-label="Sayfa yolu" className="text-xs text-white/55">
                <ol className="flex items-center gap-2">
                  <li>
                    <Link href="/" className="transition hover:text-white">
                      Ana Sayfa
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-gold-light">Matematik Özel Ders</li>
                </ol>
              </nav>
              <p className="eyebrow mt-9">Denizli · Yüz Yüze ve Online</p>
              <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[4rem]">
                Matematikte Ezber Değil, Anlama ve Uygulama
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Ortaokul, lise ve TYT–AYT hazırlığında; öğrencinin seviyesine göre
                şekillenen bire bir anlatım, soru çözüm stratejileri ve düzenli akademik
                takip.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  Özel Ders İçin Bilgi Al
                </a>
                <a
                  href="#calisma-sistemi"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-sm border border-white/35 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  Çalışma Sistemini İncele
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/62">
                {["Bire bir çalışma", "Kişisel ders planı", "Düzenli takip"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="size-4 text-gold" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/12 shadow-[0_28px_80px_rgba(0,0,0,.3)]">
              <Image
                src="/images/mathematics-education.png"
                alt="Gürbüz Gövrek dijital tahtada bire bir matematik dersi anlatıyor"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" aria-hidden="true" />
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-24" aria-labelledby="ders-kapsami">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow justify-center">Ders Kapsamı</p>
              <h2 id="ders-kapsami" className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                Her Öğrenci İçin Aynı Ders Değil, Doğru Ders
              </h2>
              <p className="mt-6 text-base leading-8 text-ink/62 sm:text-lg">
                Dersin içeriği öğrencinin sınıf düzeyine, konu eksiklerine, öğrenme hızına
                ve akademik hedefine göre planlanır.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {learningAreas.map(({ icon: Icon, title: itemTitle, description: itemDescription }) => (
                <article
                  key={itemTitle}
                  className="rounded-sm border border-navy/10 bg-cream p-6 transition hover:-translate-y-1 hover:border-gold/45 hover:bg-white hover:shadow-[0_18px_45px_rgba(7,26,51,.09)]"
                >
                  <span className="flex size-12 items-center justify-center rounded-sm bg-navy text-gold-light">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">{itemTitle}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/60">{itemDescription}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="calisma-sistemi" className="scroll-mt-24 bg-cream py-16 sm:py-24" aria-labelledby="calisma-sistemi-baslik">
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow">Çalışma Sistemi</p>
                <h2 id="calisma-sistemi-baslik" className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                  Planlı ve İzlenebilir Bir Ders Süreci
                </h2>
                <p className="mt-6 text-base leading-8 text-ink/62">
                  Amaç yalnızca o günkü soruyu çözmek değil; öğrencinin benzer sorular
                  karşısında kendi düşünme yolunu kurmasını sağlamaktır.
                </p>
              </div>
              <ol className="grid gap-4">
                {processSteps.map(({ icon: Icon, number, title: itemTitle, description: itemDescription }) => (
                  <li key={number} className="grid gap-5 rounded-sm border border-navy/9 bg-white p-6 sm:grid-cols-[4rem_minmax(0,1fr)] sm:p-7">
                    <div className="flex size-14 items-center justify-center rounded-full bg-navy text-gold-light">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold tracking-[0.18em] text-gold uppercase">Adım {number}</p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold text-navy">{itemTitle}</h3>
                      <p className="mt-3 text-sm leading-7 text-ink/60">{itemDescription}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-24" aria-labelledby="ozel-ders-kazanimlari">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="relative aspect-[16/11] overflow-hidden rounded-sm shadow-[0_25px_70px_rgba(7,26,51,.15)]">
                <Image
                  src="/images/one-to-one-consulting.png"
                  alt="Öğrencinin seviyesine göre hazırlanan bire bir matematik çalışma planı"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="eyebrow">Bire Bir Dersin Odağı</p>
                <h2 id="ozel-ders-kazanimlari" className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                  Konuyu Anlamak, Soruyu Yorumlamak, Süreci Yönetmek
                </h2>
                <ul className="mt-8 grid gap-3">
                  {benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-sm border border-navy/8 bg-cream px-4 py-3.5 text-sm font-medium leading-6 text-ink/72">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/18 text-blue-deep">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-navy py-16 text-white sm:py-20" aria-labelledby="ders-formati">
          <Container>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: UserRoundCheck,
                  title: "Bire Bir Odak",
                  text: "Dersin temposu ve örnekleri öğrencinin ihtiyaçlarına göre uyarlanır.",
                },
                {
                  icon: CalendarCheck2,
                  title: "Randevu ile",
                  text: "Ders günü ve saati öğrenci programı ve uygunluk durumuna göre belirlenir.",
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp İletişimi",
                  text: "Ders biçimi, uygunluk ve güncel ücret bilgisi doğrudan paylaşılır.",
                },
              ].map(({ icon: Icon, title: itemTitle, text }) => (
                <article key={itemTitle} className="rounded-sm border border-white/12 bg-white/5 p-6 sm:p-7">
                  <Icon className="size-7 text-gold-light" aria-hidden="true" />
                  <h2 id={itemTitle === "Bire Bir Odak" ? "ders-formati" : undefined} className="mt-5 font-serif text-2xl font-semibold">
                    {itemTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/62">{text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-24" aria-labelledby="matematik-sss">
          <Container className="max-w-4xl">
            <div className="text-center">
              <p className="eyebrow justify-center">Merak Edilenler</p>
              <h2 id="matematik-sss" className="mt-5 font-serif text-4xl font-semibold text-navy sm:text-5xl">
                Matematik Özel Ders Hakkında
              </h2>
            </div>
            <div className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 font-bold leading-7 text-navy">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-[0.96rem] leading-7 text-ink/65">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-cream py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-4xl rounded-sm bg-navy px-6 py-10 text-center text-white shadow-[0_22px_65px_rgba(7,26,51,.2)] sm:px-12 sm:py-14">
              <p className="eyebrow justify-center">Matematik Özel Ders</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                Öğrencinin ihtiyacına uygun çalışma yolunu birlikte belirleyelim
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                Sınıf düzeyi, hedef, zorlanılan konular ve uygun saatler için WhatsApp
                üzerinden bilgi alabilirsiniz.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-auto"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  WhatsApp’tan Bilgi Al
                </a>
                <Link
                  href="/"
                  className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-sm border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-auto"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Ana Sayfaya Dön
                </Link>
              </div>
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
