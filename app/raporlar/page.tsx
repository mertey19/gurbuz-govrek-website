import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Download, ExternalLink, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL } from "@/config/site";
import { reports } from "@/data/reports";

const title = "Tercih Raporları ve Kılavuzlar";
const description =
  "2026 YKS tercih kılavuzu, üniversite raporu, tıp fakülteleri karşılaştırması, TÜMA memnuniyet araştırması ve URAP sıralaması — tercih döneminde başvurulacak belgeler.";
const pageUrl = `${CANONICAL_SITE_URL}/raporlar`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "website", locale: "tr_TR", url: pageUrl, title, description },
};

export default function RaporlarPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <header className="border-b border-navy/10 bg-cream py-12 sm:py-16">
        <Container>
          <nav aria-label="Sayfa yolu" className="text-xs text-muted">
            <Link href="/" className="hover:text-navy">
              Ana Sayfa
            </Link>{" "}
            <span aria-hidden="true">/</span> Raporlar
          </nav>
          <h1 className="mt-5 max-w-3xl font-serif text-3xl leading-[1.1] font-semibold text-navy sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Tercih kararını veriye dayandırmak isteyenler için hazırlanmış kapsamlı
            belgeler. Hepsi tarayıcınızda doğrudan okunur; indirmek zorunda değilsiniz.
            Kayıt ya da üyelik istenmez.
          </p>
        </Container>
      </header>

      <section aria-labelledby="rapor-listesi" className="py-12 sm:py-16">
        <Container>
          <h2 id="rapor-listesi" className="sr-only">
            Rapor listesi
          </h2>

          <ul className="depth-grid grid gap-5">
            {reports.map((report) => (
              <li
                key={report.slug}
                className="depth-card rounded-sm border border-navy/10 bg-white p-6 hover:border-gold sm:p-7"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="flex min-w-0 items-start gap-4">
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-navy text-gold-light"
                      aria-hidden="true"
                    >
                      <FileText className="size-5" />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-serif text-lg leading-tight font-semibold text-navy sm:text-xl">
                        <Link
                          href={`/raporlar/${report.slug}`}
                          className="transition hover:text-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                        >
                          {report.title}
                        </Link>
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                        {report.description}
                      </p>
                      <p className="mt-3 text-xs text-muted">
                        {report.pages} sayfa ·{" "}
                        {report.ownWork ? "Hazırlayan" : "Kaynak"}: {report.publisher}
                      </p>

                      {report.externalNote ? (
                        <p className="mt-3 border-l-2 border-gold pl-3 text-xs leading-6 text-muted">
                          {report.externalNote}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/*
                    Birincil eylem okumaktır: bağlantıda `download` yoktur, bu yüzden
                    tarayıcı belgeyi kendi görüntüleyicisinde açar. İndirme ikincil
                    kalır; belgeyi tanıtmak dosyayı dağıtmaktan önce gelir.
                  */}
                  <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                    {report.file ? (
                      <>
                        <a
                          href={report.file}
                          target="_blank"
                          rel="noopener"
                          className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm bg-navy px-6 text-sm font-bold text-white transition hover:bg-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy"
                        >
                          <BookOpen className="size-4" aria-hidden="true" />
                          Belgeyi Oku
                          <span className="sr-only">
                            — {report.title}, yeni sekmede açılır
                          </span>
                        </a>

                        <a
                          href={report.file}
                          download
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-3 text-xs font-bold text-blue-deep underline underline-offset-4 transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
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
                        className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm border border-navy/25 px-6 text-sm font-bold text-navy transition hover:border-navy hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy"
                      >
                        <ExternalLink className="size-4" aria-hidden="true" />
                        Yayıncının Sitesinde
                        <span className="sr-only">
                          — {report.title}, yeni sekmede açılır
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-navy/10 pt-6">
            <p className="text-xs leading-6 text-muted">
              Bir kısmı üçüncü kurumlara aittir ve her belgenin kaynağı kendi kartında
              belirtilmiştir. Büyük dosyalar mobil veriyle açılabilmesi için yeniden
              kodlanarak küçültülmüştür; bu sürümlerde metin araması çalışmayabilir.
              Kontenjan ve sıralamalar tercih dönemi boyunca değişebilir, nihai bilgi için
              ÖSYM ve YÖK Atlas kaynaklarını esas alın.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
