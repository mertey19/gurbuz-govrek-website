import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { DOWNLOAD_SLUGS, getDownloadDetail } from "@/lib/downloads/service";

/**
 * İndirme istatistikleri — site sahibi için.
 *
 * Sayfa hiçbir yerden bağlantılı değildir, sitemap'te yer almaz ve robots.txt
 * ile arama motorlarına kapatılmıştır.
 *
 * `STATS_KEY` ortam değişkeni tanımlıysa sayfa yalnızca `?anahtar=` ile açılır;
 * tanımlı değilse bağlantıyı bilen herkes görebilir. Böylece sayfa bugün ek bir
 * ayar gerektirmeden çalışır, istenirse sonradan anahtar eklenerek kilitlenir.
 */
export const metadata: Metadata = {
  title: "İndirme İstatistikleri",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const DOWNLOADS = [
  { slug: DOWNLOAD_SLUGS.tercihRobotuExcel, label: "2026 Tercih Robotu · Excel" },
] as const;

function formatDate(value: Date | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Istanbul",
  }).format(value);
}

export default async function IstatistikPage({
  searchParams,
}: {
  searchParams: Promise<{ anahtar?: string }>;
}) {
  const expectedKey = process.env.STATS_KEY;

  if (expectedKey) {
    const { anahtar } = await searchParams;
    // Anahtar yanlışsa 404 verilir; "yetkisiz" demek sayfanın varlığını ele verirdi.
    if (anahtar !== expectedKey) notFound();
  }

  const rows = await Promise.all(
    DOWNLOADS.map(async (item) => ({
      ...item,
      detail: await getDownloadDetail(item.slug),
    })),
  );

  return (
    <main id="main-content" className="min-h-screen bg-cream pt-32 pb-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">
          İndirme İstatistikleri
        </h1>
        <p className="mt-4 text-sm leading-7 text-ink/64">
          Sitedeki indirme butonundan geçen istekler sayılır. Dosyanın adresini doğrudan
          açan ziyaretçiler sayıya yansımaz; bu yüzden gerçek toplam buradakine eşit ya da
          bundan biraz yüksektir.
        </p>

        <div className="mt-9 grid gap-5">
          {rows.map((row) => (
            <div
              key={row.slug}
              className="rounded-sm border border-navy/10 bg-white p-7 shadow-[0_18px_55px_rgba(7,26,51,.06)]"
            >
              <p className="text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
                {row.label}
              </p>

              {row.detail ? (
                <>
                  <p className="mt-4 font-serif text-5xl font-semibold text-navy">
                    {row.detail.total.toLocaleString("tr-TR")}
                  </p>
                  <p className="mt-2 text-sm text-ink/64">
                    kez indirildi · son indirme: {formatDate(row.detail.updatedAt)}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm text-ink/64">
                  Sayı okunamadı. Veritabanı bağlantısını kontrol edin.
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs leading-6 text-ink/50">
          Bu sayfa arama motorlarına kapalıdır ve site içinde hiçbir yerden bağlantılı
          değildir. Sayı 25’i geçtiğinde tercih robotu sayfasındaki indirme kartında da
          görünmeye başlar.
        </p>
      </Container>
    </main>
  );
}
