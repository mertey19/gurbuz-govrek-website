import type { Metadata } from "next";
import Link from "next/link";
import { Info, ShieldCheck } from "lucide-react";
import { runTercihRobot } from "@/app/tercih-robotu/actions";
import { TercihRobot } from "@/components/tercih/TercihRobot";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL } from "@/config/site";
import { GENERAL_FINDINGS, FORECAST_YEAR } from "@/data/tercihTespitleri";

const title = "Tercih Robotu | Başarı Sıranıza Göre Program Sorgulama";
const description =
  "Puan türünüzü ve başarı sıranızı girin; sıralamanıza uygun program sayısını, devlet-vakıf dağılımını ve örnek programları görün. Denizli tercih danışmanlığı desteğiyle.";
const pageUrl = `${CANONICAL_SITE_URL}/tercih-robotu`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    title,
    description,
    images: ["/images/preference-analysis.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/preference-analysis.webp"],
  },
};

export default function TercihRobotuPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Gürbüz Gövrek Tercih Robotu",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: pageUrl,
    inLanguage: "tr-TR",
    description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
    provider: { "@id": `${CANONICAL_SITE_URL}/#person` },
  };

  return (
    <>
      <main id="main-content" className="min-h-screen bg-white pt-20">
        <header className="relative overflow-hidden bg-navy text-white">
          <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
            <div className="absolute -top-28 -right-20 size-[30rem] rounded-full border border-gold" />
          </div>
          <Container className="relative py-14 sm:py-20">
            <nav aria-label="Sayfa yolu" className="text-xs text-white/55">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    Ana Sayfa
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gold-light">Tercih Robotu</li>
              </ol>
            </nav>

            <p className="eyebrow mt-10">Tercih Robotu</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl">
              Başarı Sıranıza Uygun Programları Görün
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Puan türünüzü ve başarı sıranızı girin. Sıralamanıza yakın kaç program
              olduğunu, bunların devlet-vakıf dağılımını ve size en yakın örnekleri hemen
              görebilirsiniz.
            </p>
          </Container>
        </header>

        <section className="py-12 sm:py-16">
          <Container className="max-w-4xl">
            <TercihRobot action={runTercihRobot} />

            <p className="mt-8 flex items-start gap-3 rounded-sm border border-navy/10 bg-cream/70 px-5 py-4 text-xs leading-6 text-ink/60">
              <Info className="mt-0.5 size-4 shrink-0 text-blue-deep" aria-hidden="true" />
              <span>
                Sonuçlar geçen yılın yerleşme verilerine dayanır ve yol gösterme amaçlıdır.
                Kontenjanlar ile taban puanlar her yıl değişir; nihai bilgi için tercih
                döneminde{" "}
                <a href="https://osym.gov.tr/" target="_blank" rel="noreferrer" className="font-bold text-blue-deep underline underline-offset-2">
                  ÖSYM
                </a>{" "}
                ve{" "}
                <a href="https://yokatlas.yok.gov.tr/" target="_blank" rel="noreferrer" className="font-bold text-blue-deep underline underline-offset-2">
                  YÖK Atlas
                </a>{" "}
                kaynaklarını esas alın.
              </span>
            </p>
          </Container>
        </section>

        <section className="section-space bg-cream">
          <Container className="max-w-4xl">
            <p className="eyebrow">{FORECAST_YEAR} Sınavına Dair Tespitler</p>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              Bu yıl sınavda ne oldu?
            </h2>
            <p className="mt-6 text-base leading-8 text-ink/65">
              Tercih listesini kurmadan önce sınavın genel tablosunu bilmek gerekir.
              Aşağıdakiler gerçekleşmiş tespitlerdir.
            </p>
            <ul className="mt-7 grid gap-3">
              {GENERAL_FINDINGS.map((finding) => (
                <li
                  key={finding.slice(0, 30)}
                  className="flex gap-3 rounded-sm border border-navy/10 bg-white px-5 py-4 text-sm leading-7 text-ink/70"
                >
                  <ShieldCheck className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {finding}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
