"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

/**
 * Çoklu il seçici.
 *
 * Native `<select multiple>` yerine yazılmıştır: masaüstünde Ctrl/Cmd basılmadan
 * tıklandığında önceki seçimleri silmesi ve dokunmatik cihazlarda kullanılamaz
 * hâle gelmesi nedeniyle kullanıcılar seçim yapamıyordu.
 *
 * Seçim React state'inde tutulur; forma yalnızca gizli inputlarla gönderilir.
 * Bu ayrım şart: arama kutusu listeyi filtrelediğinde görünmeyen kutular DOM'dan
 * kalkar ve eğer `name` onların üzerinde olsaydı o seçimler sessizce kaybolurdu.
 */
export function CityPicker({
  cities,
  name = "city",
}: {
  cities: readonly string[];
  name?: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const visible = normalizedQuery
    ? cities.filter((city) => city.toLocaleLowerCase("tr-TR").includes(normalizedQuery))
    : cities;

  const toggle = (city: string) =>
    setSelected((current) =>
      current.includes(city)
        ? current.filter((item) => item !== city)
        : [...current, city],
    );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="block text-sm font-bold text-navy">Şehir</span>
        {selected.length > 0 ? (
          <button
            type="button"
            onClick={() => setSelected([])}
            className="text-xs font-bold text-blue-deep underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Temizle ({selected.length})
          </button>
        ) : null}
      </div>

      {/* Seçim yalnızca bu gizli inputlarla gönderilir; arama filtresinden etkilenmez. */}
      {selected.map((city) => (
        <input key={city} type="hidden" name={name} value={city} />
      ))}

      <div className="mt-2 rounded-sm border border-navy/15 bg-white">
        <label className="relative block border-b border-navy/10">
          <span className="sr-only">İl ara</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-blue-deep/45"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="İl ara"
            className="w-full bg-transparent py-2.5 pr-3 pl-9 text-sm text-navy placeholder:text-ink/38 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold"
          />
        </label>

        {selected.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5 border-b border-navy/10 p-2.5">
            {selected.map((city) => (
              <li key={city}>
                <button
                  type="button"
                  onClick={() => toggle(city)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy px-2.5 py-1 text-xs font-bold text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  aria-label={`${city} seçimini kaldır`}
                >
                  {city}
                  <X className="size-3" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="max-h-52 overflow-y-auto p-1.5">
          {visible.length === 0 ? (
            <p className="px-2 py-3 text-sm text-ink/55">Eşleşen il bulunamadı.</p>
          ) : (
            visible.map((city) => {
              const checked = selected.includes(city);
              return (
                <label
                  key={city}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition ${
                    checked ? "bg-cream font-semibold text-navy" : "text-ink/75 hover:bg-cream/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(city)}
                    className="size-4 accent-[color:var(--brand-gold,#d6a84b)]"
                  />
                  {city}
                </label>
              );
            })
          )}
        </div>
      </div>

      <p className="mt-1.5 text-xs text-ink/45">
        Birden fazla il seçebilirsiniz. Hiçbiri seçilmezse tüm iller gelir.
      </p>
    </div>
  );
}
