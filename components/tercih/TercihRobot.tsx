"use client";

import { useActionState, useState } from "react";
import {
  Building2,
  Landmark,
  Lightbulb,
  Loader2,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { getForecast, FORECAST_YEAR } from "@/data/tercihTespitleri";
import {
  INSTITUTION_KINDS,
  isRobotScoreType,
  RENDER_BATCH_SIZE,
  SCORE_TYPES,
} from "@/lib/tercih/types";
import type { RobotState } from "@/app/tercih-robotu/actions";

const SCORE_TYPE_LABELS: Record<string, string> = {
  SAY: "Sayısal",
  EA: "Eşit Ağırlık",
  SÖZ: "Sözel",
  DİL: "Dil",
  TYT: "TYT (2 yıllık)",
};

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
  /** Şehir açılırını dolduran liste; veritabanından sunucuda okunur. */
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

  return (
    <div className="grid gap-8">
      <form
        action={formAction}
        className="grid gap-5 rounded-sm border border-navy/10 bg-white p-6 shadow-[0_18px_55px_rgba(7,26,51,.08)] sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label htmlFor="scoreType" className="block text-sm font-bold text-navy">
              Puan türü
            </label>
            <select
              id="scoreType"
              name="scoreType"
              defaultValue="SAY"
              className="mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold"
            >
              {SCORE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {SCORE_TYPE_LABELS[type] ?? type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rank" className="block text-sm font-bold text-navy">
              Başarı sıranız
            </label>
            <input
              id="rank"
              name="rank"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Örnek: 125000"
              className="mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/38 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold"
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

        {/* İsteğe bağlı daraltma. Boş bırakılan alan hiç filtrelenmez. */}
        <fieldset className="grid gap-5 border-t border-navy/10 pt-5 sm:grid-cols-3">
          <legend className="px-1 text-xs font-extrabold tracking-[.14em] text-blue-deep uppercase">
            Daralt (isteğe bağlı)
          </legend>

          <div>
            <label htmlFor="city" className="block text-sm font-bold text-navy">
              Şehir
            </label>
            <select id="city" name="city" defaultValue="" className="mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold">
              <option value="">Tüm şehirler</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="kind" className="block text-sm font-bold text-navy">
              Kurum türü
            </label>
            <select id="kind" name="kind" defaultValue="" className="mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold">
              <option value="">Devlet ve vakıf</option>
              {INSTITUTION_KINDS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-bold text-navy">
              Bölüm / meslek
            </label>
            <input
              id="department"
              name="department"
              autoComplete="off"
              placeholder="Örnek: hemşirelik"
              className="mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold"
            />
          </div>
        </fieldset>

        <p className="text-xs leading-6 text-ink/50">
          Sıralamanızın bir miktar üstü ve altı birlikte taranır; böylece hem güvenli hem
          hedef tercihler görünür. Bölüm alanına yazdığınız ifade bölüm adında aranır.
          Kişisel bilgi istenmez.
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
          Kopyalamayı caydırma katmanı (site sahibinin talebi).
          Kapsam bilinçli olarak yalnızca sonuç alanıdır: form, telefon numarası,
          blog ve diğer içerikler seçilebilir kalır.

          Sınırı açıkça belirtmek gerekir — bu önlem sayfa kaynağını, geliştirici
          araçlarını, JavaScript'i kapatmayı, Server Action uç noktasının doğrudan
          çağrılmasını veya ekran görüntüsünü engellemez. Yalnızca sıradan
          kullanıcının seçip kopyalamasını zorlaştırır.
        */
        <div
          className="grid gap-6 select-none"
          // iOS'ta uzun basınca çıkan kopyala/paylaş menüsünü kapatır. Tailwind'in
          // arbitrary property üretimine güvenmemek için doğrudan inline verilir;
          // masaüstü tarayıcılar bu özelliği zaten yok sayar.
          style={{ WebkitTouchCallout: "none" }}
          aria-live="polite"
          onContextMenu={(event) => event.preventDefault()}
          onCopy={(event) => event.preventDefault()}
          onCut={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
        >
          <div className="rounded-sm border border-gold/40 bg-cream p-7 sm:p-9">
            <p className="text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
              {SCORE_TYPE_LABELS[state.scoreType] ?? state.scoreType} ·{" "}
              {formatNumber(state.rank)}. sıra
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

          {forecast ? (
            <div className="rounded-sm border border-navy/10 bg-white p-6 sm:p-7">
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
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
                  Eşleşen programların tamamı
                </p>
                <p className="text-xs text-ink/55">
                  {formatNumber(Math.min(visibleCount, state.result.programs.length))} /{" "}
                  {formatNumber(state.result.programs.length)} gösteriliyor
                </p>
              </div>

              {/*
                13 sütun dar ekrana sığmaz. Mobilde her program bir kart olarak
                basılır; tablo yalnızca geniş ekranda kullanılır. Böylece telefonda
                yatay kaydırma gerekmez.
              */}
              <ul className="mt-4 grid gap-3 lg:hidden">
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

                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-navy/8 pt-3 text-xs sm:grid-cols-3">
                      {(
                        [
                          ["Kontenjan", orDash(program.quota)],
                          ["Puan", program.score === null ? "—" : program.score.toFixed(2)],
                          ["Prof.", orDash(program.prof)],
                          ["Dr. Öğr.", orDash(program.doctor)],
                          ["Öğr. Gör.", orDash(program.lecturers)],
                          ["Akredite", orDash(program.accredited)],
                          ["TUS", orDash(program.tus)],
                          ["DUS", orDash(program.dus)],
                        ] as const
                      )
                        // Veri olmayan alanlar mobilde kartı şişirmesin.
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

              <div className="mt-4 hidden overflow-x-auto rounded-sm border border-navy/10 lg:block">
                <table className="w-full min-w-[62rem] border-collapse bg-white text-sm">
                  <caption className="sr-only">
                    Başarı sıranıza uyan üniversite programları ve akademik veriler
                  </caption>
                  <thead>
                    <tr className="bg-cream text-left text-xs font-bold tracking-wider text-blue-deep uppercase">
                      <th scope="col" className="px-4 py-3">Sıra</th>
                      <th scope="col" className="px-4 py-3">Üniversite</th>
                      <th scope="col" className="px-4 py-3">Bölüm</th>
                      <th scope="col" className="px-4 py-3">Şehir</th>
                      <th scope="col" className="px-4 py-3">Tür</th>
                      <th scope="col" className="px-4 py-3">Kont.</th>
                      <th scope="col" className="px-4 py-3">Puan</th>
                      <th scope="col" className="px-4 py-3">Prof.</th>
                      <th scope="col" className="px-4 py-3">Dr. Öğr.</th>
                      <th scope="col" className="px-4 py-3">Öğr. Gör.</th>
                      <th scope="col" className="px-4 py-3">Akredite</th>
                      <th scope="col" className="px-4 py-3">TUS</th>
                      <th scope="col" className="px-4 py-3">DUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.result.programs.slice(0, visibleCount).map((program) => (
                      <tr
                        key={`${program.programCode ?? program.department}-${program.rank}`}
                        className="border-t border-navy/8 align-top"
                      >
                        <td className="px-4 py-3 font-bold text-blue-deep">
                          {formatNumber(program.rank)}
                        </td>
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
                        <td className="px-4 py-3 text-ink/70">{orDash(program.quota)}</td>
                        <td className="px-4 py-3 text-ink/70">
                          {program.score === null ? "—" : program.score.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-ink/70">{orDash(program.prof)}</td>
                        <td className="px-4 py-3 text-ink/70">{orDash(program.doctor)}</td>
                        <td className="px-4 py-3 text-ink/70">{orDash(program.lecturers)}</td>
                        <td className="px-4 py-3 text-ink/70">{orDash(program.accredited)}</td>
                        <td className="px-4 py-3 text-ink/70">{orDash(program.tus)}</td>
                        <td className="px-4 py-3 text-ink/70">{orDash(program.dus)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {visibleCount < state.result.programs.length ? (
                <div className="mt-6 flex justify-center">
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

              <p className="mt-5 text-xs leading-6 text-ink/50">
                Prof., Dr. Öğr. ve Öğr. Gör. sütunları programın akademik kadrosunu; TUS ve
                DUS sütunları tıp ve diş hekimliği mezunlarının uzmanlık sınavı başarısını
                gösterir. Boş hücreler ilgili veri bulunmadığı anlamına gelir.
              </p>
            </div>
          ) : (
            <div className="rounded-sm border border-navy/10 bg-cream/70 px-6 py-8 text-center">
              <p className="font-serif text-xl font-semibold text-navy">
                Bu sıralama aralığında program bulunamadı
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink/64">
                Girdiğiniz sıralama, seçtiğiniz puan türünde 2026 verilerinde yerleşme olan
                aralığın dışında kalıyor olabilir. Puan türünü kontrol edip tekrar
                deneyebilir ya da doğrudan görüşme talep edebilirsiniz.
              </p>
            </div>
          )}

          <div className="rounded-sm border border-navy/12 bg-navy p-7 text-white sm:p-9">
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
