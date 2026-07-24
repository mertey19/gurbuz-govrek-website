import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SiteImage as Image } from "@/components/ui/SiteImage";
import { CANONICAL_SITE_URL, siteConfig, whatsappUrl } from "@/config/site";
import type { SeoServicePage } from "@/data/seoServices";

const audienceIcons = [Target, SearchCheck, UsersRound] as const;

export function ServiceLandingPage({ page }: { page: SeoServicePage }) {
  const pageUrl = `${CANONICAL_SITE_URL}${page.path}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.serviceName,
      description: page.description,
      url: pageUrl,
      areaServed: [
        { "@type": "City", name: "Denizli" },
        { "@type": "Country", name: "Türkiye" },
      ],
      availableChannel: [
        {
          "@type": "ServiceChannel",
          serviceUrl: pageUrl,
          servicePhone: siteConfig.contact.phone,
        },
      ],
      provider: {
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: "Matematik Öğretmeni ve Tercih Uzmanı",
        url: `${CANONICAL_SITE_URL}/gurbuz-govrek`,
        telephone: siteConfig.contact.phone,
        sameAs: [siteConfig.contact.instagram],
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
          name: page.serviceName,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
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
        <header className="relative overflow-hidden bg-navy text-white">
          <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
            <div className="absolute -top-28 -right-20 size-[30rem] rounded-full border border-gold" />
            <div className="absolute right-48 -bottom-36 size-80 rounded-full border border-white" />
          </div>
          <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-24">
            <div>
              <nav aria-label="Sayfa yolu" className="text-xs text-white/55">
                <ol className="flex items-center gap-2">
                  <li>
                    <Link href="/" className="transition hover:text-white">
                      Ana Sayfa
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-gold-light">{page.serviceName}</li>
                </ol>
              </nav>
              <p className="eyebrow mt-10">{page.eyebrow}</p>
              <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[4rem]">
                {page.heading}
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                {page.lead}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={whatsappUrl} external variant="whatsapp">
                  <MessageCircle className="size-5" aria-hidden="true" />
                  WhatsApp&apos;tan Bilgi Al
                </Button>
                <Button href="/gurbuz-govrek" variant="outline">
                  Gürbüz Gövrek&apos;i Tanıyın
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/12 shadow-2xl">
                <Image
                  src={page.image}
                  alt={page.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-5 left-5 border-l-2 border-gold bg-white px-5 py-4 text-navy shadow-xl sm:left-8">
                <p className="text-[10px] font-extrabold tracking-[.17em] text-blue-deep/60 uppercase">
                  Çalışma biçimi
                </p>
                <p className="mt-1 font-serif text-lg font-semibold">Randevu ile · Yüz yüze ve online</p>
              </div>
            </div>
          </Container>
        </header>

        <section className="border-b border-navy/8 bg-cream">
          <Container className="grid gap-px bg-navy/8 md:grid-cols-3">
            {page.highlights.map((item) => (
              <div key={item.label} className="bg-cream px-6 py-7 text-center">
                <p className="font-serif text-2xl font-semibold text-navy">{item.value}</p>
                <p className="mt-1 text-xs font-bold tracking-[.12em] text-blue-deep/55 uppercase">
                  {item.label}
                </p>
              </div>
            ))}
          </Container>
        </section>

        <section className="section-space bg-white">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">İhtiyaca Göre Planlanan Süreç</p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                {page.audienceTitle}
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/65">{page.audienceIntro}</p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {page.audience.map((item, index) => {
                const Icon = audienceIcons[index] ?? ShieldCheck;
                return (
                  <article
                    key={item.title}
                    className="rounded-sm border border-navy/10 bg-cream/60 p-7 shadow-[0_16px_40px_rgba(7,26,51,.055)] sm:p-8"
                  >
                    <span className="flex size-12 items-center justify-center rounded-sm bg-navy text-gold-light">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-ink/64">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="section-space bg-cream">
          <Container className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">Adım Adım</p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                {page.processTitle}
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/65">{page.processIntro}</p>
            </div>
            <ol className="grid gap-4">
              {page.process.map((item, index) => (
                <li
                  key={item.title}
                  className="grid gap-4 rounded-sm border border-navy/9 bg-white p-6 shadow-[0_14px_40px_rgba(7,26,51,.055)] sm:grid-cols-[3.5rem_1fr] sm:p-7"
                >
                  <span className="flex size-12 items-center justify-center rounded-full border border-gold/55 bg-cream font-serif font-semibold text-navy">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-navy">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink/62">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="section-space bg-white">
          <Container className="grid items-start gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <div>
              <p className="eyebrow">Çalışmanın Kapsamı</p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                {page.benefitsTitle}
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/65">{page.benefitsIntro}</p>
            </div>
            <ul className="grid gap-4">
              {page.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-4 rounded-sm border border-navy/9 bg-cream/55 px-5 py-4 text-sm leading-7 text-ink/72"
                >
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="section-space bg-cream">
          <Container className="grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
            <div>
              <p className="eyebrow">Sık Sorulan Sorular</p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                {page.serviceName} Hakkında
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/65">
                Süreçle ilgili farklı bir sorunuz varsa WhatsApp üzerinden doğrudan paylaşabilirsiniz.
              </p>
            </div>
            <div className="divide-y divide-navy/10 border-y border-navy/10">
              {page.faqs.map((faq, index) => (
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
                <p className="eyebrow">İlk Görüşme</p>
                <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                  İhtiyacınızı konuşarak uygun çalışma yolunu birlikte belirleyelim
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                  Görüşmeler randevu ile planlanır. Denizli’de yüz yüze veya bulunduğunuz şehre göre online iletişim kurulabilir.
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
              İlgili Sayfalar
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {page.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-sm border border-navy/10 bg-white p-6 transition hover:-translate-y-1 hover:border-gold/55 hover:shadow-[0_16px_40px_rgba(7,26,51,.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                >
                  <span className="flex items-center justify-between gap-4 font-serif text-xl font-semibold text-navy">
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
