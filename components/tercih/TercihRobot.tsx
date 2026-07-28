"use client";

import { useActionState, useState } from "react";
import { flushSync } from "react-dom";
import {
  Building2,
  FileDown,
  Landmark,
  Lightbulb,
  Loader2,
  MapPin,
  MessageCircle,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { CityPicker } from "@/components/tercih/CityPicker";
import { whatsappUrl } from "@/config/site";
import { getForecast, FORECAST_YEAR } from "@/data/tercihTespitleri";
import {
  INSTITUTION_KINDS,
  isRobotScoreType,
  PDF_ROW_LIMIT,
  QUOTA_YEARS,
  RANK_YEARS,
  RENDER_BATCH_SIZE,
  SCORE_TYPES,
  quotaForYear,
  rankForYear,
} from "@/lib/tercih/types";
import type { RobotState } from "@/app/tercih-robotu/actions";

const SCORE_TYPE_LABELS: Record<string, string> = {
  SAY: "Sayısal",
  EA: "Eşit Ağırlık",
  SÖZ: "Sözel",
  DİL: "Dil",
  TYT: "TYT (2 yıllık)",
};

const FIELD =
  "mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/38 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold";

function formatNumber(value: number) {
  return value.toLocaleString("tr-TR");
}

function orDash(value: string | number | null) {
  if (value === null || value === "") return "—";
  return typeof value === "number" ? formatNumber(value) : value;
}

export function TercihRobot({
  action,
  cities,
}: {
  action: (state: RobotState, formData: FormData) => Promise<RobotState>;
  /** Şehir çoklu seçimini dolduran 81 il ve ek bölgeler. */
  cities: readonly string[];
}) {
  const [state, formAction, isPending] = useActionState<RobotState, FormData>(action, {
    status: "idle",
  });
  const [visibleCount, setVisibleCount] = useState(RENDER_BATCH_SIZE);
  const [renderedState, setRenderedState] = useState(state);

  // Yeni sorgu geldiğinde liste baştan başlar. Effect yerine render sırasında
  // ayarlanır; effect içinde setState çağırmak zincirleme render üretirdi.
  if (renderedState !== state) {
    setRenderedState(state);
    setVisibleCount(RENDER_BATCH_SIZE);
  }

  const forecast =
    state.status === "success" && isRobotScoreType(state.scoreType)
      ? getForecast(state.scoreType)
      : undefined;

  // 2026 kontenjanının 2023'e göre yönü; özet cümlesinde kullanılır.
  const quotaDelta =
    state.status === "success"
      ? (state.result.quotaTrend[0]?.total ?? 0) -
        (state.result.quotaTrend[state.result.quotaTrend.length - 1]?.total ?? 0)
      : 0;

  const matchedCount = state.status === "success" ? state.result.programs.length : 0;
  const printableCount = Math.min(matchedCount, PDF_ROW_LIMIT);

  /**
   * PDF çıktısı tarayıcının kendi yazdırma motoruyla alınır: Türkçe karakterler
   * sorunsuz çıkar, ek bir kitaplık yüklenmez ve masaüstünde de mobilde de
   * "PDF olarak kaydet" seçeneği mevcuttur.
   *
   * Tablo yalnızca ekranda görünen satırları basar; bu yüzden yazdırmadan önce
   * satır sayısı `flushSync` ile eşzamanlı olarak genişletilir, aksi hâlde
   * `print()` eski DOM üzerinde çalışırdı.
   */
  function handlePrint() {
    flushSync(() => {
      setVisibleCount((current) => Math.max(current, printableCount));
    });
    window.print();
  }

  return (
    <div className="grid gap-8">
      <form
        action={formAction}
        data-print-hide
        className="grid gap-5 rounded-sm border border-navy/10 bg-white p-6 shadow-[0_18px_55px_rgba(7,26,51,.08)] sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          <div>
            <label htmlFor="scoreType" className="block text-sm font-bold text-navy">
              Puan türü
            </label>
            <select id="scoreType" name="scoreType" defaultValue="SAY" className={FIELD}>
              {SCORE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {SCORE_TYPE_LABELS[type] ?? type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rankFrom" className="block text-sm font-bold text-navy">
              Sıralama — başlangıç
            </label>
            <input
              id="rankFrom"
              name="rankFrom"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Örnek: 40000"
              className={FIELD}
            />
          </div>

          <div>
            <label htmlFor="rankTo" className="block text-sm font-bold text-navy">
              Sıralama — bitiş
              <span className="ml-1.5 text-xs font-medium text-ink/45">(isteğe bağlı)</span>
            </label>
            <input
              id="rankTo"
              name="rankTo"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Örnek: 60000"
              className={FIELD}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-navy px-7 text-sm font-bold text-white transition hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Aranıyor…
              </>
            ) : (
              <>
                <Search className="size-4" aria-hidden="true" />
                Sorgula
              </>
            )}
          </button>
        </div>

        <fieldset className="grid gap-5 border-t border-navy/10 pt-5 lg:grid-cols-3">
          <legend className="px-1 text-xs font-extrabold tracking-[.14em] text-blue-deep uppercase">
            Daralt (isteğe bağlı, birden fazla seçilebilir)
          </legend>

          <CityPicker cities={cities} />

          <div>
            <span className="block text-sm font-bold text-navy">Kurum türü</span>
            <div className="mt-2 grid gap-2 rounded-sm border border-navy/15 bg-white p-4">
              {INSTITUTION_KINDS.map((item) => (
                <label
                  key={item.value}
                  htmlFor={`kind-${item.value}`}
                  className="flex items-center gap-2.5 text-sm text-navy"
                >
                  <input
                    id={`kind-${item.value}`}
                    type="checkbox"
                    name="kind"
                    value={item.value}
                    className="size-4 accent-[color:var(--color-gold)]"
                  />
                  {item.label}
                </label>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-ink/45">Hiçbiri seçilmezse tümü gelir.</p>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-bold text-navy">
              Bölüm / meslek
            </label>
            <input
              id="department"
              name="department"
              autoComplete="off"
              placeholder="hemşirelik, fizyoterapi"
              className={FIELD}
            />
            <p className="mt-1.5 text-xs text-ink/45">
              Virgülle ayırarak birden fazla bölüm yazabilirsiniz.
            </p>
          </div>
        </fieldset>

        <p className="text-xs leading-6 text-ink/50">
          Bitiş sıralamasını boş bırakırsanız başlangıç sırasının biraz üstü ve altı
          otomatik taranır. Kişisel bilgi istenmez.
        </p>
      </form>

      {state.status === "error" ? (
        <p
          role="alert"
          className="rounded-sm border border-[#b3261e]/25 bg-[#fdf1f0] px-5 py-4 text-sm font-semibold text-[#b3261e]"
        >
          {state.message}
        </p>
      ) : null}

      {state.status === "success" ? (
        /*
          Kopyalamayı caydırma katmanı (site sahibinin talebi). Kapsam yalnızca
          sonuç alanıdır; form ve sitenin geri kalanı seçilebilir kalır. Sayfa
          kaynağını, geliştirici araçlarını veya ekran görüntüsünü engellemez.
        */
        <div
          className="grid gap-6 select-none"
          style={{ WebkitTouchCallout: "none" }}
          aria-live="polite"
          onContextMenu={(event) => event.preventDefault()}
          onCopy={(event) => event.preventDefault()}
          onCut={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
        >
          <div
            data-print-hide
            className="rounded-sm border border-gold/40 bg-cream p-7 sm:p-9"
          >
            <p className="text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
              {SCORE_TYPE_LABELS[state.scoreType] ?? state.scoreType} ·{" "}
              {formatNumber(state.rankFrom)}
              {state.rankTo ? ` – ${formatNumber(state.rankTo)}` : ""}. sıra
            </p>
            <p className="mt-4 font-serif text-4xl font-semibold text-navy sm:text-5xl">
              {formatNumber(state.result.totalMatches)} program
            </p>
            <p className="mt-3 text-sm leading-7 text-ink/64">
              {formatNumber(state.result.windowFrom)} –{" "}
              {formatNumber(state.result.windowTo)} sıralama aralığında, 2026 tercih
              dönemi verilerine göre değerlendirilebilecek program sayısı.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-sm border border-navy/10 bg-white px-5 py-4">
                <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-deep uppercase">
                  <Landmark className="size-4 text-gold" aria-hidden="true" />
                  Devlet
                </span>
                <p className="mt-2 font-serif text-2xl font-semibold text-navy">
                  {formatNumber(state.result.stateCount)}
                </p>
              </div>
              <div className="rounded-sm border border-navy/10 bg-white px-5 py-4">
                <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-deep uppercase">
                  <Building2 className="size-4 text-gold" aria-hidden="true" />
                  Vakıf
                </span>
                <p className="mt-2 font-serif text-2xl font-semibold text-navy">
                  {formatNumber(state.result.foundationCount)}
                </p>
              </div>
              <div className="rounded-sm border border-navy/10 bg-white px-5 py-4">
                <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-deep uppercase">
                  <MapPin className="size-4 text-gold" aria-hidden="true" />
                  Öne çıkan şehirler
                </span>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  {state.result.topCities.length > 0
                    ? state.result.topCities.map((item) => item.city).join(", ")
                    : "—"}
                </p>
              </div>
            </div>

            {state.result.otherCount > 0 ? (
              <p className="mt-4 text-xs leading-6 text-ink/55">
                Kalan {formatNumber(state.result.otherCount)} program KKTC ve yurt dışı
                yükseköğretim kurumlarına aittir.
              </p>
            ) : null}
          </div>

          {/* Seçilen programların yıllara göre toplam kontenjanı. */}
          {state.result.totalMatches > 0 ? (
            <div
              data-print-hide
              className="rounded-sm border border-navy/10 bg-white p-6 sm:p-7"
            >
              <p className="flex items-center gap-2.5 text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
                {quotaDelta >= 0 ? (
                  <TrendingUp className="size-4 text-gold" aria-hidden="true" />
                ) : (
                  <TrendingDown className="size-4 text-gold" aria-hidden="true" />
                )}
                Bu seçimdeki kontenjan değişimi
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {state.result.quotaTrend.map((point) => (
                  <div
                    key={point.year}
                    className="rounded-sm border border-navy/10 bg-cream/60 px-5 py-4"
                  >
                    <p className="text-xs font-bold tracking-wider text-blue-deep uppercase">
                      {point.year}
                    </p>
                    <p className="mt-1.5 font-serif text-2xl font-semibold text-navy">
                      {formatNumber(point.total)}
                    </p>
                    <p className="mt-1 text-xs text-ink/50">
                      {formatNumber(point.programCount)} programda veri
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-6 text-ink/55">
                Yıllar arası fark kısmen o yıl verisi bulunmayan programlardan
                kaynaklanır; her kutuda kaç programın verisi olduğu ayrıca yazılıdır.
                Sonradan açılan programların geçmiş yıl kaydı yoktur.
              </p>
            </div>
          ) : null}

          {forecast ? (
            <div
              data-print-hide
              className="rounded-sm border border-navy/10 bg-white p-6 sm:p-7"
            >
              <p className="flex items-center gap-2.5 text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
                <Lightbulb className="size-4 text-gold" aria-hidden="true" />
                Gürbüz Gövrek&apos;in {FORECAST_YEAR} öngörüsü
              </p>
              <p className="mt-4 font-serif text-xl font-semibold text-navy">
                {forecast.headline}
              </p>
              <ul className="mt-4 grid gap-2.5">
                {forecast.notes.map((note) => (
                  <li key={note.slice(0, 30)} className="flex gap-3 text-sm leading-7 text-ink/68">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {note}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-sm bg-cream px-4 py-3 text-xs leading-6 text-ink/58">
                Bu değerlendirmeler Gürbüz Gövrek&apos;in kendi öngörüleridir; kesin sonuç
                değildir. Nihai kontenjan ve taban puanlar tercih dönemi sonunda ÖSYM
                tarafından açıklanır.
              </p>
            </div>
          ) : null}

          {state.result.programs.length > 0 ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
                <p className="text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
                  Eşleşen programların tamamı
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-xs text-ink/55">
                    {formatNumber(Math.min(visibleCount, state.result.programs.length))} /{" "}
                    {formatNumber(state.result.programs.length)} gösteriliyor
                  </p>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-navy/20 bg-white px-4 text-xs font-bold text-navy transition hover:border-navy hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                  >
                    <FileDown className="size-4" aria-hidden="true" />
                    PDF olarak indir
                    <span className="sr-only">
                      — {formatNumber(printableCount)} program yazdırma penceresinde
                      açılır, hedef olarak “PDF olarak kaydet” seçin
                    </span>
                  </button>
                </div>
              </div>

              {matchedCount > PDF_ROW_LIMIT ? (
                <p className="mt-2 text-xs leading-6 text-ink/55 print:hidden">
                  PDF çıktısına ilk {formatNumber(PDF_ROW_LIMIT)} program alınır.
                  Listenin tamamı için sayfanın üstündeki Excel dosyasını indirin.
                </p>
              ) : null}

              {/* Yalnızca çıktıda görünen künye; ekranda aynı bilgi üst kartta duruyor. */}
              <div className="hidden print:mb-4 print:block">
                <p className="font-serif text-2xl font-semibold text-navy">
                  Tercih Robotu · Sıralamanıza Uyan Programlar
                </p>
                <p className="mt-1 text-sm text-navy">
                  {SCORE_TYPE_LABELS[state.scoreType] ?? state.scoreType} ·{" "}
                  {formatNumber(state.rankFrom)}
                  {state.rankTo ? ` – ${formatNumber(state.rankTo)}` : ""}. sıra ·
                  Toplam {formatNumber(state.result.totalMatches)} program
                  {matchedCount > PDF_ROW_LIMIT
                    ? ` (bu listede ilk ${formatNumber(PDF_ROW_LIMIT)} program)`
                    : ""}
                </p>
                <p className="mt-1 text-xs text-ink/70">
                  Gürbüz Gövrek · Tercih Uzmanı ve Matematik Öğretmeni ·
                  gürbüzgövrek.com.tr
                </p>
              </div>

              {/* Mobilde kart, geniş ekranda tablo. */}
              <ul className="mt-4 grid gap-3 lg:hidden print:hidden">
                {state.result.programs.slice(0, visibleCount).map((program) => (
                  <li
                    key={`${program.programCode ?? program.department}-${program.rank}-m`}
                    className="rounded-sm border border-navy/10 bg-white p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-serif text-lg leading-tight font-semibold text-navy">
                        {program.department}
                      </p>
                      <span className="shrink-0 rounded-full bg-cream px-3 py-1 text-xs font-bold text-blue-deep">
                        {formatNumber(program.rank)}.
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-ink/68">{program.university}</p>
                    {program.faculty ? (
                      <p className="mt-0.5 text-xs leading-5 text-ink/48">{program.faculty}</p>
                    ) : null}

                    <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs text-ink/60">
                      <span>{program.city}</span>
                      <span aria-hidden="true">·</span>
                      <span>{program.kind}</span>
                      {program.duration ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{program.duration} yıl</span>
                        </>
                      ) : null}
                    </p>

                    <div className="mt-4 grid gap-3 border-t border-navy/8 pt-3 text-xs">
                      <div>
                        <p className="font-bold tracking-wide text-blue-deep/70 uppercase">
                          Sıralama
                        </p>
                        <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-ink/72">
                          {RANK_YEARS.map((year) => (
                            <span key={year}>
                              {year}: {orDash(rankForYear(program, year))}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold tracking-wide text-blue-deep/70 uppercase">
                          Kontenjan
                        </p>
                        <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-ink/72">
                          {QUOTA_YEARS.map((year) => (
                            <span key={year}>
                              {year}: {orDash(quotaForYear(program, year))}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-navy/8 pt-3 text-xs sm:grid-cols-3">
                      {(
                        [
                          ["Puan", program.score === null ? "—" : program.score.toFixed(2)],
                          ["Prof.", orDash(program.prof)],
                          ["Dr. Öğr.", orDash(program.doctor)],
                          ["Öğr. Gör.", orDash(program.lecturers)],
                          ["Akredite", orDash(program.accredited)],
                          ["TUS", orDash(program.tus)],
                          ["DUS", orDash(program.dus)],
                        ] as const
                      )
                        .filter(([, value]) => value !== "—")
                        .map(([label, value]) => (
                          <div key={label}>
                            <dt className="font-bold tracking-wide text-blue-deep/70 uppercase">
                              {label}
                            </dt>
                            <dd className="mt-0.5 text-ink/72">{value}</dd>
                          </div>
                        ))}
                    </dl>
                  </li>
                ))}
              </ul>

              <div className="mt-4 hidden overflow-x-auto rounded-sm border border-navy/10 lg:block print:mt-0 print:block print:overflow-visible print:border-0">
                <table className="w-full min-w-[78rem] border-collapse bg-white text-sm print:min-w-0 print:text-[9px]">
                  <caption className="sr-only">
                    Sıralamanıza uyan programlar, yıllara göre sıralama ve kontenjan
                    değişimi ile akademik veriler
                  </caption>
                  <thead>
                    <tr className="bg-cream text-left text-xs font-bold tracking-wider text-blue-deep uppercase">
                      <th scope="col" className="px-4 py-3">Üniversite</th>
                      <th scope="col" className="px-4 py-3">Bölüm</th>
                      <th scope="col" className="px-4 py-3">Şehir</th>
                      <th scope="col" className="px-4 py-3">Tür</th>
                      {RANK_YEARS.map((year) => (
                        <th key={`r-${year}`} scope="col" className="px-3 py-3 whitespace-nowrap">
                          {year} sıra
                        </th>
                      ))}
                      {QUOTA_YEARS.map((year) => (
                        <th key={`q-${year}`} scope="col" className="px-3 py-3 whitespace-nowrap">
                          {year} kont.
                        </th>
                      ))}
                      <th scope="col" className="px-3 py-3">Prof.</th>
                      <th scope="col" className="px-3 py-3">Dr. Öğr.</th>
                      <th scope="col" className="px-3 py-3">Akredite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.result.programs.slice(0, visibleCount).map((program) => (
                      <tr
                        key={`${program.programCode ?? program.department}-${program.rank}`}
                        className="border-t border-navy/8 align-top"
                      >
                        <td className="px-4 py-3 text-navy">{program.university}</td>
                        <td className="px-4 py-3 font-semibold text-navy">
                          {program.department}
                          {program.faculty ? (
                            <span className="mt-0.5 block text-xs font-normal text-ink/50">
                              {program.faculty}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-ink/70">{program.city}</td>
                        <td className="px-4 py-3 text-ink/70">{program.kind}</td>
                        {RANK_YEARS.map((year) => (
                          <td
                            key={`r-${year}`}
                            className={`px-3 py-3 whitespace-nowrap ${
                              year === 2025 ? "font-bold text-blue-deep" : "text-ink/60"
                            }`}
                          >
                            {orDash(rankForYear(program, year))}
                          </td>
                        ))}
                        {QUOTA_YEARS.map((year) => (
                          <td
                            key={`q-${year}`}
                            className={`px-3 py-3 whitespace-nowrap ${
                              year === 2026 ? "font-bold text-blue-deep" : "text-ink/60"
                            }`}
                          >
                            {orDash(quotaForYear(program, year))}
                          </td>
                        ))}
                        <td className="px-3 py-3 text-ink/70">{orDash(program.prof)}</td>
                        <td className="px-3 py-3 text-ink/70">{orDash(program.doctor)}</td>
                        <td className="px-3 py-3 text-ink/70">{orDash(program.accredited)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {visibleCount < state.result.programs.length ? (
                <div data-print-hide className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((current) => current + RENDER_BATCH_SIZE)}
                    className="min-h-12 rounded-full border border-navy/15 bg-white px-7 text-sm font-bold text-blue-deep transition hover:border-gold hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    Daha Fazla Göster (
                    {formatNumber(state.result.programs.length - visibleCount)} kaldı)
                  </button>
                </div>
              ) : null}

              <p className="mt-5 text-xs leading-6 text-ink/50 print:mt-3 print:text-[8px]">
                Kalın yazılan sütunlar tercihte esas alınan değerlerdir: 2025 yerleşme
                sırası ve 2026 kontenjanı. Boş hücreler o yıla ait veri bulunmadığı
                anlamına gelir.
              </p>

              {/* Çıktının altına düşen sorumluluk notu; ekranda sayfanın sonunda duruyor. */}
              <p className="hidden text-[8px] leading-5 text-ink/70 print:mt-2 print:block">
                Kontenjan ve sıralamalar 2026 tercih dönemi boyunca değişebilir. Nihai
                bilgi için ÖSYM ve YÖK Atlas kaynaklarını esas alın. Bu liste
                gürbüzgövrek.com.tr adresindeki tercih robotundan alınmıştır.
              </p>
            </div>
          ) : (
            <div className="rounded-sm border border-navy/10 bg-cream/70 px-6 py-8 text-center">
              <p className="font-serif text-xl font-semibold text-navy">
                Bu seçimle program bulunamadı
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink/64">
                Sıralama aralığını genişletebilir ya da şehir, kurum türü ve bölüm
                filtrelerinden bazılarını kaldırabilirsiniz.
              </p>
            </div>
          )}

          <div
            data-print-hide
            className="rounded-sm border border-navy/12 bg-navy p-7 text-white sm:p-9"
          >
            <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
              Liste elinizde. Sıralamayı birlikte kuralım.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
              Hangi programların sıranıza uyduğunu artık görüyorsunuz. Asıl zor kısım
              bundan sonrası: bu {formatNumber(state.result.totalMatches)} program arasından
              hangisinin size uyduğuna karar vermek ve listeyi riskli–güvenli dengesiyle
              sıraya koymak.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-sm bg-[#25D366] px-7 text-sm font-bold text-white transition hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Tercih Listesi İçin Görüşme Talep Et
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
