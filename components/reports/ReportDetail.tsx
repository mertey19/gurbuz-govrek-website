import Link from "next/link";
import { BookOpen, Download, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { SiteReport } from "@/data/reports";

/**
 * Bir belgenin tanıtım sayfası.
 *
 * Amaç belgeyi dağıtmak değil, ne olduğunu anlatmak: ziyaretçi 200 sayfalık bir
 * PDF'i açmadan önce içinde ne bulacağını okur. Metinler belgenin kendisinden
 * çıkarılmıştır; sayısal iddia üretilmez.
 */
export function ReportDetail({ report }: { report: SiteReport }) {
  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <header className="border-b border-navy/10 bg-cream py-12 sm:py-16">
        <Container className="max-w-3xl">
          <nav aria-label="Sayfa yolu" className="text-xs text-muted">
            <Link href="/" className="hover:text-navy">
              Ana Sayfa
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <Link href="/raporlar" className="hover:text-navy">
              Raporlar
            </Link>{" "}
            <span aria-hidden="true">/</span> {report.title}
          </nav>

          <h1 className="mt-5 font-serif text-3xl leading-[1.1] font-semibold text-navy sm:text-4xl">
            {report.title}
          </h1>

          <p className="mt-4 text-xs text-muted">
            {report.pages} sayfa · {report.ownWork ? "Hazırlayan" : "Kaynak"}:{" "}
            {report.publisher}
          </p>
        </Container>
      </header>

      <div className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="text-base leading-8 text-ink">{report.intro}</p>

          <section aria-labelledby="icerik" className="mt-10">
            <h2 id="icerik" className="font-serif text-2xl font-semibold text-navy">
              Belgede neler var?
            </h2>

            <dl className="mt-6 grid gap-5">
              {report.highlights.map((item) => (
                <div key={item.title} className="border-l-2 border-gold pl-4">
                  <dt className="text-sm font-bold text-navy">{item.title}</dt>
                  <dd className="mt-1 text-sm leading-6 text-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="belgeye-ulas" className="mt-11 border-t border-navy/10 pt-8">
            <h2 id="belgeye-ulas" className="font-serif text-xl font-semibold text-navy">
              Belgeye ulaşın
            </h2>

            {report.externalNote ? (
              <p className="mt-3 text-sm leading-7 text-muted">{report.externalNote}</p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-4">
              {report.file ? (
                <>
                  <a
                    href={report.file}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-navy px-7 text-sm font-bold text-white transition hover:bg-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy"
                  >
                    <BookOpen className="size-4" aria-hidden="true" />
                    Belgeyi Oku
                    <span className="sr-only">— yeni sekmede açılır</span>
                  </a>

                  <a
                    href={report.file}
                    download
                    className="inline-flex min-h-11 items-center gap-2 text-xs font-bold text-blue-deep underline underline-offset-4 transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                  >
                    <Download className="size-3.5" aria-hidden="true" />
                    Cihazıma indir ({report.sizeLabel})
                  </a>
                </>
              ) : (
                <a
                  href={report.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-sm border border-navy/25 px-7 text-sm font-bold text-navy transition hover:border-navy hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Yayıncının Sitesinde
                  <span className="sr-only">— yeni sekmede açılır</span>
                </a>
              )}
            </div>

            <p className="mt-6 text-xs leading-6 text-muted">
              Belge {report.publisher} tarafından hazırlanmıştır. Kontenjan ve sıralamalar
              tercih dönemi boyunca değişebilir; nihai bilgi için ÖSYM ve YÖK Atlas
              kaynaklarını esas alın.
            </p>
          </section>

          <p className="mt-10">
            <Link
              href="/raporlar"
              className="text-sm font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
            >
              ← Tüm raporlara dön
            </Link>
          </p>
        </Container>
      </div>
    </main>
  );
}
