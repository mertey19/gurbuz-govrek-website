import { Download, FileSpreadsheet } from "lucide-react";

/**
 * Tercih robotu çalışma dosyasının doğrudan indirme bölümü.
 *
 * Dosya site sahibinin kararıyla herkese açık olarak yayımlanır ve `public/`
 * altında durur. Robot arayüzündeki kopyalama engeli ile hız sınırı bu dosya
 * için geçerli değildir; bilinçli bir tercihtir.
 */
/**
 * İndirme, sayacı işleyen `/indir/tercih-robotu` adresinden geçirilir; oradan
 * dosyanın kendisine yönlendirilir. Dosyanın doğrudan adresini açan ziyaretçi
 * sayaca yansımaz, bu yüzden sayı alt sınırdır.
 */
const DOWNLOAD_PATH = "/indir/tercih-robotu";
/** Sayı bu eşiğin altındayken gösterilmez; tek haneli bir sayı güven vermez. */
const DISPLAY_THRESHOLD = 25;
const FILE_LABEL = "2026 Tercih Robotu · Excel";
const FILE_SIZE = "5,6 MB";

export function TercihRobotDownload({
  downloadCount,
}: {
  /** Toplam indirme; okunamadıysa veya eşiğin altındaysa gösterilmez. */
  downloadCount?: number | null;
}) {
  const showCount =
    typeof downloadCount === "number" && downloadCount >= DISPLAY_THRESHOLD;

  return (
    <section
      aria-labelledby="dosya-indir-basligi"
      className="rounded-sm border border-gold/50 bg-cream p-6 sm:p-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex items-start gap-4">
          <span
            className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-navy text-gold-light"
            aria-hidden="true"
          >
            <FileSpreadsheet className="size-6" />
          </span>

          <div className="min-w-0">
            <h2
              id="dosya-indir-basligi"
              className="font-serif text-xl leading-tight font-semibold text-navy sm:text-2xl"
            >
              Tercih robotunu Excel olarak indirin
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-ink/68">
              Program listesinin tamamını, kontenjan ve akademik kadro sütunlarıyla
              birlikte kendi bilgisayarınızda inceleyin. Kayıt gerekmez.
            </p>
          </div>
        </div>

        <a
          href={DOWNLOAD_PATH}
          download
          className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-2.5 rounded-sm bg-navy px-7 text-sm font-bold text-white transition hover:bg-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy"
        >
          <Download
            className="size-4 transition-transform group-hover:translate-y-0.5"
            aria-hidden="true"
          />
          Excel Dosyasını İndir
          <span className="sr-only">
            {FILE_LABEL}, {FILE_SIZE}
          </span>
        </a>
      </div>

      <p className="mt-5 border-t border-navy/10 pt-4 text-xs leading-6 text-ink/55">
        {FILE_LABEL} · {FILE_SIZE}
        {showCount ? ` · ${downloadCount.toLocaleString("tr-TR")} kez indirildi` : ""} ·
        Dosya 2026 tercih dönemi için hazırlanmıştır.
        Kontenjan ve taban puanlar tercih dönemi boyunca değişebilir; nihai bilgi için
        ÖSYM ve YÖK Atlas kaynaklarını esas alın.
      </p>
    </section>
  );
}
