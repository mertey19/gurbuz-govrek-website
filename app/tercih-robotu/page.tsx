import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { runTercihRobot } from "@/app/tercih-robotu/actions";
import { TercihRobot } from "@/components/tercih/TercihRobot";
import { TercihRobotDownload } from "@/components/tercih/TercihRobotDownload";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL } from "@/config/site";
import { EXTRA_REGIONS, PROVINCES } from "@/data/provinces";

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
  // Açılır, veritabanındaki ham değerlerden değil 81 ilin sabit listesinden kurulur;
  // ham değerler üniversite ve ilçe adları içerdiği için doğrudan kullanılamaz.
  const cities = [...PROVINCES, ...EXTRA_REGIONS];

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
        <header
          data-print-hide
          className="relative overflow-hidden bg-navy text-white"
        >
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
            {/* Sayfanın en üstünde: dosyayı doğrudan indirmek isteyenler robotu
                kullanmak zorunda kalmasın. */}
            <div data-print-hide>
              <TercihRobotDownload />
            </div>

            <div className="mt-10">
              <TercihRobot action={runTercihRobot} cities={cities} />
            </div>

            <p className="mt-8 flex items-start gap-3 rounded-sm border border-navy/10 bg-cream/70 px-5 py-4 text-xs leading-6 text-ink/60">
              <Info className="mt-0.5 size-4 shrink-0 text-blue-deep" aria-hidden="true" />
              <span>
                Sonuçlar 2026 tercih dönemi için hazırlanan verilere dayanır ve yol gösterme amaçlıdır.
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

      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
