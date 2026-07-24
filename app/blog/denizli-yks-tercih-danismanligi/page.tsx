import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SiteImage as Image } from "@/components/ui/SiteImage";
import { CANONICAL_SITE_URL, siteConfig, whatsappUrl } from "@/config/site";
import { blogPosts, getBlogPost } from "@/data/blogPosts";

const post = getBlogPost("denizli-yks-tercih-danismanligi");
const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 4);
const articleUrl = `${CANONICAL_SITE_URL}/blog/${post.slug}`;

export const metadata: Metadata = {
  title: `${post.title} | Gürbüz Gövrek`,
  description: post.description,
  keywords: [
    "Denizli YKS tercih danışmanlığı",
    "Denizli üniversite tercih danışmanlığı",
    "YKS tercih danışmanı",
    "üniversite tercih rehberi",
    "başarı sırası",
  ],
  alternates: { canonical: articleUrl },
  authors: [{ name: siteConfig.name, url: `${CANONICAL_SITE_URL}/gurbuz-govrek` }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "tr_TR",
    url: articleUrl,
    title: post.title,
    description: post.description,
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    authors: [siteConfig.name],
    images: [
      {
        url: post.image,
        width: 1280,
        height: 720,
        alt: post.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [post.image],
  },
};

const suitabilityItems = [
  "İlk kez tercih yapacak adaylar",
  "Mezuna kalan öğrenciler",
  "Başarı sırasını doğru yorumlamak isteyenler",
  "Vakıf ve devlet üniversitelerini karşılaştırmak isteyenler",
  "Bölüm seçimi konusunda kararsız kalan adaylar",
];

const commonMistakes = [
  "Sadece puana göre tercih yapmak",
  "Başarı sırasını dikkate almamak",
  "Hayal ve garanti tercihlerini dengelememek",
  "Üniversite yerine yalnızca şehir seçmek",
  "Bölüm içeriklerini araştırmamak",
  "Kariyer hedefini göz ardı etmek",
];

const processSteps = [
  "İlk görüşmede öğrencinin hedefleri belirlenir.",
  "Sınav sonuçları ve başarı sırası ayrıntılı olarak incelenir.",
  "Öğrencinin ilgi alanları ve kariyer beklentileri değerlendirilir.",
  "Riskli, dengeli ve güvenli seçeneklerden oluşan tercih listesi hazırlanır.",
  "Liste, özel koşullar ve güncel verilerle son kez kontrol edilir.",
];

const evaluationItems = [
  "YKS başarı sırası",
  "Güncel kontenjanlar",
  "Üniversitenin akademik yapısı",
  "Bölümün iş olanakları",
  "Şehir tercihleri",
  "Burs imkânları",
  "Eğitim dili",
  "Öğrencinin kariyer hedefi",
];

const trustItems = [
  "Güncel ÖSYM verilerini kullanır.",
  "Başarı sırasını temel alır.",
  "Üniversite ve bölüm analizleri yapar.",
  "Kariyer planlamasını dikkate alır.",
  "Öğrenciyle bire bir görüşme gerçekleştirir.",
];

const faqs = [
  {
    question: "Denizli YKS Tercih Danışmanlığı gerçekten gerekli mi?",
    answer:
      "Tercih dönemi birçok değişken içerir. Uzman desteği, bu değişkenleri birlikte değerlendirmeyi kolaylaştırarak hata ihtimalini azaltabilir. Ancak hiçbir danışman kesin yerleşme garantisi veremez.",
  },
  {
    question: "Tercih danışmanlığı başarı garantisi sağlar mı?",
    answer:
      "Hayır. Yerleştirme sonuçlarını ÖSYM’nin merkezî yerleştirme sistemi belirler. Danışmanlık hizmeti doğru analiz yapmayı ve bilinçli bir liste hazırlamayı kolaylaştırır; kesin sonuç vaat etmez.",
  },
  {
    question: "Başarı sırası mı, puan mı daha önemlidir?",
    answer:
      "Çoğu program için başarı sırası daha belirleyici bir karşılaştırma ölçütüdür. Çünkü puanların dağılımı yıldan yıla değişebilir; yerleştirme ise adayların sıralamasına göre şekillenir.",
  },
  {
    question: "Tercih listesi kaç bölümden oluşmalıdır?",
    answer:
      "ÖSYM, tercih hakkı sayısını her yıl ilgili kılavuzda açıklar. Aday, o yıl tanınan tercih sayısını hedeflerine göre stratejik biçimde değerlendirmeli ve güncel kılavuzu esas almalıdır.",
  },
];

export default function DenizliYksTercihDanismanligiPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      image: `${CANONICAL_SITE_URL}${post.image}`,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: "tr-TR",
      mainEntityOfPage: articleUrl,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        url: `${CANONICAL_SITE_URL}/gurbuz-govrek`,
      },
      publisher: {
        "@type": "Person",
        name: siteConfig.name,
        url: CANONICAL_SITE_URL,
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
          name: "Blog",
          item: `${CANONICAL_SITE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: articleUrl,
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
        <article>
          <header className="bg-navy text-white">
            <Container className="py-12 sm:py-16 lg:py-20">
              <nav aria-label="Sayfa yolu" className="text-xs text-white/55">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="transition hover:text-white">
                      Ana Sayfa
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/blog" className="transition hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-gold-light">YKS Tercih Rehberi</li>
                </ol>
              </nav>

              <div className="mt-9 grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
                <div>
                  <p className="eyebrow">{post.category}</p>
                  <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.75rem]">
                    {post.title}
                  </h1>
                  <p className="mt-7 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                    {post.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/58">
                    <Link
                      href="/gurbuz-govrek"
                      className="font-bold text-white underline decoration-gold/55 underline-offset-4 transition hover:decoration-gold"
                    >
                      {siteConfig.name}
                    </Link>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-gold" aria-hidden="true" />
                      {post.publishedAtLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-4 text-gold" aria-hidden="true" />
                      {post.readingTime} okuma
                    </span>
                  </div>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/12 shadow-2xl">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/25 to-transparent" aria-hidden="true" />
                </div>
              </div>
            </Container>
          </header>

          <Container className="py-14 sm:py-20">
            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
              <div className="blog-article mx-auto w-full max-w-3xl lg:mx-0">
                <p className="blog-lead">
                  YKS sınavı kadar tercih süreci de geleceği belirler. Doğru tercih,
                  öğrenciyi istediği mesleğe taşırken yalnızca puana dayalı kararlar uzun
                  süreli memnuniyetsizliklere yol açabilir. Bu nedenle başarı sırası,
                  kontenjan değişimleri, üniversitenin akademik yapısı ve bölüm beklentileri
                  birlikte değerlendirilmelidir.
                </p>
                <p>
                  Denizli YKS Tercih Danışmanlığı; öğrencinin puanı, başarı sırası,
                  hedefleri ve ilgi alanlarına göre uygun üniversite seçeneklerini
                  değerlendirmeyi amaçlayan kişiye özel bir rehberlik hizmetidir. Sağlıklı
                  analiz, öğrencinin gelecekte memnun olacağı akademik yolu daha bilinçli
                  seçmesine yardımcı olur.
                </p>

                <section aria-labelledby="tercih-danismanligi-nedir">
                  <h2 id="tercih-danismanligi-nedir">
                    Denizli YKS Tercih Danışmanlığı Nedir?
                  </h2>
                  <p>
                    Üniversite tercih döneminde sunulan bu hizmet, yalnızca bir tercih
                    listesi hazırlamaktan ibaret değildir. Öğrencinin kariyer hedefi,
                    ilgi-yetenek profili ve yaşam beklentileri de değerlendirilir.
                  </p>
                  <p>
                    Uzman danışman önce öğrenciyi tanır, ardından başarı sırasını analiz
                    eder ve güncel kontenjanları inceler. Son aşamada gerçekçi, dengeli ve
                    güvenli seçeneklerden oluşan bir liste hazırlanır. Dolayısıyla süreç
                    tamamen kişiye özel ilerler.
                  </p>
                </section>

                <section aria-labelledby="kimler-icin-uygun">
                  <h2 id="kimler-icin-uygun">Tercih Danışmanlığı Kimler İçin Uygundur?</h2>
                  <p>
                    Her öğrencinin ihtiyacı farklıdır. Bazı adaylar hedef bölümünü bilir,
                    bazıları ise bölüm veya üniversite seçimi konusunda kararsız kalır.
                    Özellikle şu öğrenciler destek alabilir:
                  </p>
                  <CheckedList items={suitabilityItems} />
                </section>

                <section aria-labelledby="neden-onemli">
                  <h2 id="neden-onemli">Denizli YKS Tercih Danışmanlığı Neden Önemlidir?</h2>
                  <p>
                    Birçok öğrenci yalnızca puana odaklanır. Oysa üniversite
                    yerleştirmelerinde başarı sırası daha belirleyici bir karşılaştırma
                    ölçütüdür. Kontenjan değişiklikleri ve programların yıllara göre oluşan
                    taban sıraları da sonucu etkiler.
                  </p>
                  <p>
                    Bu nedenle yalnızca eski bir listeye bakarak tercih yapmak risklidir.
                    Geçmiş yılların verileri, güncel eğilimler ve öğrencinin hedefleri
                    birlikte incelendiğinde tercih listesi daha güçlü bir temele oturur.
                  </p>
                </section>

                <section aria-labelledby="tercih-hatalari">
                  <h2 id="tercih-hatalari">En Sık Yapılan Tercih Hataları</h2>
                  <p>Tercih döneminde sık karşılaşılan hatalar şunlardır:</p>
                  <CheckedList items={commonMistakes} tone="warning" />
                  <p>
                    Bu hatalar, adayın kendisine uygun seçenekleri gözden kaçırmasına ve
                    yerleşme ihtimalini doğru değerlendirememesine neden olabilir.
                  </p>
                </section>

                <section aria-labelledby="danismanlik-sureci">
                  <h2 id="danismanlik-sureci">
                    Denizli YKS Tercih Danışmanlığı Sürecinde Neler Yapılır?
                  </h2>
                  <ol className="blog-steps">
                    {processSteps.map((step, index) => (
                      <li key={step}>
                        <span aria-hidden="true">{index + 1}</span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                  <p>
                    Listenin birden fazla aşamada kontrol edilmesi, veri okuma ve tercih
                    sıralaması kaynaklı hata riskini azaltır.
                  </p>
                </section>

                <section aria-labelledby="liste-kriterleri">
                  <h2 id="liste-kriterleri">Tercih Listesi Hazırlanırken Nelere Bakılır?</h2>
                  <p>Uzmanlar, karar verirken birçok veriyi birlikte değerlendirir:</p>
                  <CheckedList items={evaluationItems} />
                  <p>
                    Bu değerlendirme, yalnızca yerleşmeye değil öğrencinin seçtiği programda
                    sürdürülebilir biçimde mutlu olmasına da odaklanır.
                  </p>
                </section>

                <section aria-labelledby="danisman-secerken">
                  <h2 id="danisman-secerken">
                    Tercih Danışmanlığı Alırken Nelere Dikkat Edilmeli?
                  </h2>
                  <p>
                    Her danışmanın deneyimi ve çalışma yöntemi aynı değildir. Danışmanın
                    güncel ÖSYM tercih sistemini bilmesi, önceki tercih dönemlerinde deneyim
                    sahibi olması ve öğrenciye kişisel yaklaşım sunması önemlidir.
                  </p>
                  <p>
                    Hazır listeler yerine bireysel analiz yapılmalı; öğrencinin akademik
                    verileri kadar ilgi alanları ve kariyer hedefleri de dikkate alınmalıdır.
                  </p>

                  <div className="blog-callout">
                    <ShieldCheck className="size-7 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <h3>Güvenilir danışman nasıl anlaşılır?</h3>
                      <ul>
                        {trustItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section aria-labelledby="guncel-veriler">
                  <h2 id="guncel-veriler">Güncel Veriler Neden Önemlidir?</h2>
                  <p>
                    Üniversite kontenjanları ve bölümlerin başarı sıraları her yıl
                    değişebilir. Bu nedenle eski listeler tek başına yeterli değildir.
                    Tercih döneminde güncel ÖSYM verileri ve Yükseköğretim Kurulu tarafından
                    açıklanan program bilgileri esas alınmalıdır.
                  </p>
                  <p>
                    Doğru tercih yalnızca bugünü değil geleceği de şekillendirir. Karar
                    sürecinde profesyonel destek almak, öğrencinin seçeneklerini daha açık
                    görmesine yardımcı olan önemli bir yatırım olabilir.
                  </p>
                </section>

                <section aria-labelledby="sik-sorulan-sorular">
                  <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
                  <div className="mt-7 divide-y divide-navy/10 border-y border-navy/10">
                    {faqs.map((faq) => (
                      <details key={faq.question} className="group py-5">
                        <summary className="cursor-pointer list-none pr-8 font-bold leading-7 text-navy">
                          {faq.question}
                        </summary>
                        <p className="mt-3 text-[0.96rem] leading-7 text-ink/65">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>

                <section aria-labelledby="kaynaklar">
                  <h2 id="kaynaklar">Resmî Kaynaklar</h2>
                  <p>
                    Tercih süreci, başarı sırası ve yerleştirme sistemi hakkında her zaman
                    ilgili yılın güncel kılavuz ve program verileri incelenmelidir.
                  </p>
                  <ul className="blog-sources">
                    <li>
                      <a href="https://www.osym.gov.tr/" target="_blank" rel="noreferrer">
                        ÖSYM — YKS duyuruları ve tercih kılavuzları
                      </a>
                    </li>
                    <li>
                      <a href="https://www.yok.gov.tr/" target="_blank" rel="noreferrer">
                        Yükseköğretim Kurulu — Lisans ve ön lisans program bilgileri
                      </a>
                    </li>
                    <li>
                      <a href="https://yokatlas.yok.gov.tr/" target="_blank" rel="noreferrer">
                        YÖK Atlas — Program ve yerleşme verileri
                      </a>
                    </li>
                  </ul>
                </section>

                <section aria-labelledby="ilgili-yazilar">
                  <h2 id="ilgili-yazilar">İlgili Yazılar</h2>
                  <div className="mt-6 grid gap-3">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="rounded-sm border border-navy/10 bg-cream px-5 py-4 font-bold leading-6 text-blue-deep transition hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        {relatedPost.title}
                      </Link>
                    ))}
                  </div>
                </section>

                <p className="mt-10 border-t border-navy/10 pt-6 text-xs leading-6 text-ink/48">
                  Bu yazı genel bilgilendirme amacı taşır. Tercih hakkı, kontenjanlar ve
                  özel koşullar için ilgili yılın ÖSYM kılavuzu esas alınmalıdır.
                </p>
              </div>

              <aside className="lg:sticky lg:top-28" aria-label="Danışmanlık iletişim bilgileri">
                <div className="rounded-sm bg-navy p-7 text-white shadow-[0_22px_60px_rgba(7,26,51,.18)]">
                  <p className="text-[10px] font-extrabold tracking-[0.17em] text-gold-light uppercase">
                    Kişiye Özel Tercih Görüşmesi
                  </p>
                  <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight">
                    Tercih listenizi birlikte değerlendirelim
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/65">
                    Başarı sıranız, hedefleriniz ve bölüm seçenekleriniz için WhatsApp
                    üzerinden bilgi alabilirsiniz.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    <MessageCircle className="size-5" aria-hidden="true" />
                    WhatsApp’tan Görüş
                  </a>
                  <Link
                    href="/denizli-yks-tercih-danismanligi"
                    className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-white/22 px-5 py-3 text-sm font-bold text-white/82 transition hover:border-gold hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                  >
                    Danışmanlık Sürecini İncele
                  </Link>
                </div>
                <Link
                  href="/blog"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Tüm blog yazıları
                </Link>
              </aside>
            </div>
          </Container>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

function CheckedList({
  items,
  tone = "default",
}: {
  items: readonly string[];
  tone?: "default" | "warning";
}) {
  return (
    <ul className="blog-check-list">
      {items.map((item) => (
        <li key={item}>
          <span
            className={tone === "warning" ? "bg-red-50 text-red-700" : "bg-gold/18 text-blue-deep"}
            aria-hidden="true"
          >
            <Check className="size-4" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
