"use client";

import { useActionState } from "react";
import {
  Building2,
  Landmark,
  Lightbulb,
  Loader2,
  Lock,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { getForecast, FORECAST_YEAR } from "@/data/tercihTespitleri";
import { isRobotScoreType, SAMPLE_LIMIT, SCORE_TYPES } from "@/lib/tercih/types";
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

export function TercihRobot({
  action,
}: {
  action: (state: RobotState, formData: FormData) => Promise<RobotState>;
}) {
  const [state, formAction, isPending] = useActionState<RobotState, FormData>(action, {
    status: "idle",
  });

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

        <p className="text-xs leading-6 text-ink/50">
          Sıralamanızın bir miktar üstü ve altı birlikte taranır; böylece hem güvenli hem
          hedef tercihler görünür. Kişisel bilgi istenmez.
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
        <div className="grid gap-6" aria-live="polite">
          {/* Asıl kanca: eşleşen program sayısı. */}
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
              {formatNumber(state.result.windowTo)} sıralama aralığında, geçen yılın
              yerleşme verilerine göre değerlendirilebilecek program sayısı.
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

            {/* Devlet + vakıf toplamı üstteki sayıya eşit değilse aradaki fark açıklanır. */}
            {state.result.otherCount > 0 ? (
              <p className="mt-4 text-xs leading-6 text-ink/55">
                Kalan {formatNumber(state.result.otherCount)} program KKTC ve yurt dışı
                yükseköğretim kurumlarına aittir.
              </p>
            ) : null}
          </div>

          {state.result.samples.length > 0 ? (
            <div>
              <p className="text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
                Sıralamanıza en yakın {SAMPLE_LIMIT} örnek
              </p>
              <ul className="mt-4 grid gap-3">
                {state.result.samples.map((sample) => (
                  <li
                    key={`${sample.university}-${sample.department}-${sample.rank}`}
                    className="grid gap-1 rounded-sm border border-navy/10 bg-white px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="font-serif text-lg font-semibold text-navy">
                        {sample.department}
                      </p>
                      <p className="mt-1 text-sm text-ink/60">
                        {sample.university} · {sample.city} · {sample.kind}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-blue-deep sm:text-right">
                      {formatNumber(sample.rank)}. sıra
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

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

          {/* Kilitli kısım: görüşmenin sebebi. */}
          <div className="rounded-sm border border-navy/12 bg-navy p-7 text-white sm:p-9">
            <span className="flex size-11 items-center justify-center rounded-sm bg-white/10 text-gold-light">
              <Lock className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-semibold sm:text-3xl">
              Tam liste ve kişisel sıralama görüşmede
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
              Burada gördüğünüz {SAMPLE_LIMIT} örnek, eşleşen{" "}
              {formatNumber(state.result.totalMatches)} programın küçük bir kısmı. Bire bir
              görüşmede şunlar da değerlendirilir:
            </p>
            <ul className="mt-5 grid gap-2 text-sm leading-7 text-white/72 sm:grid-cols-2">
              {[
                "Eşleşen programların tamamı",
                "Öğretim üyesi ve akademik kadro verileri",
                "Program akreditasyon bilgisi",
                "Tıp ve diş için TUS/DUS başarı verileri",
                "Riskli ve güvenli tercih dengesi",
                "Hedefinize göre sıralanmış nihai liste",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-sm bg-[#25D366] px-7 text-sm font-bold text-white transition hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Tam Listeyi Görüşmede Alın
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
