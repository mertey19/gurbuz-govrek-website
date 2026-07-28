"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ImageUp, Loader2, Plus, Trash2, X } from "lucide-react";
import { uploadImage } from "@/components/admin/imageUpload";

/**
 * Sunum serisi yönetim arayüzü.
 *
 * Görseller seçilir seçilmez yüklenir; seri kaydedilene kadar yalnızca listede
 * bekler. Sıralama okla değiştirilir — sürükle-bırak dokunmatik ekranda ve
 * klavyeyle güvenilir çalışmıyor, ok düğmesi her ikisinde de çalışır.
 */
type AdminCollection = {
  id: number;
  slug: string;
  label: string;
  slides: { url: string; title: string; alt: string }[];
};

type DraftSlide = { url: string; title: string; alt: string };

const FIELD =
  "mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/38 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold";

export function SlideAdmin() {
  const [collections, setCollections] = useState<AdminCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [label, setLabel] = useState("");
  const [shortLabel, setShortLabel] = useState("");
  const [description, setDescription] = useState("");
  const [slides, setSlides] = useState<DraftSlide[]>([]);

  async function load() {
    try {
      const response = await fetch("/api/admin/slides");
      if (response.status === 401) {
        setUnauthorized(true);
        return;
      }
      const payload = (await response.json()) as { collections?: AdminCollection[] };
      setCollections(payload.collections ?? []);
      setUnauthorized(false);
    } catch {
      setError("Seri listesi alınamadı.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    /* Tüm durum güncellemeleri `await fetch` sonrasına düşer; zincirleme render olmaz. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setError("");
    setUploading(true);
    const added: DraftSlide[] = [];

    try {
      for (const file of files) {
        const result = await uploadImage(file);
        added.push({ url: result.url, title: "", alt: "" });
      }
      setSlides((current) => [...current, ...added]);
      setNotice(`${added.length} görsel yüklendi.`);
    } catch (uploadError) {
      // Kısmen yüklenenler korunur; baştan başlamak gerekmesin.
      if (added.length > 0) setSlides((current) => [...current, ...added]);
      setError(uploadError instanceof Error ? uploadError.message : "Görsel yüklenemedi.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function move(index: number, direction: -1 | 1) {
    setSlides((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function updateSlide(index: number, patch: Partial<DraftSlide>) {
    setSlides((current) =>
      current.map((slide, position) => (position === index ? { ...slide, ...patch } : slide)),
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, shortLabel, description, slides }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Seri kaydedilemedi.");
        return;
      }

      setLabel("");
      setShortLabel("");
      setDescription("");
      setSlides([]);
      setNotice("Seri yayımlandı.");
      await load();
    } catch {
      setError("Seri kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`“${name}” serisi silinsin mi? Bu işlem geri alınamaz.`)) return;

    const response = await fetch(`/api/admin/slides/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Seri silinemedi.");
      return;
    }
    await load();
  }

  if (unauthorized) {
    return (
      <div className="rounded-sm border border-navy/10 bg-white p-7">
        <h2 className="font-serif text-xl font-semibold text-navy">Oturum gerekli</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          Slayt yönetimi, yorum paneliyle aynı oturumu kullanır.{" "}
          <a
            href="/yorum-yonetimi"
            className="font-bold text-blue-deep underline underline-offset-4"
          >
            Yorum yönetiminden giriş yapın
          </a>
          , sonra bu sayfaya dönün.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <section
        aria-labelledby="seri-ekle"
        className="rounded-sm border border-navy/10 bg-white p-6 sm:p-8"
      >
        <h2 id="seri-ekle" className="font-serif text-xl font-semibold text-navy">
          Yeni sunum serisi
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-[1fr_220px]">
            <div>
              <label htmlFor="seri-baslik" className="block text-sm font-bold text-navy">
                Seri başlığı
              </label>
              <input
                id="seri-baslik"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                required
                maxLength={90}
                placeholder="Örnek: Psikoloji Kariyer Rehberi"
                className={FIELD}
              />
            </div>

            <div>
              <label htmlFor="seri-kisa" className="block text-sm font-bold text-navy">
                Kısa ad
              </label>
              <input
                id="seri-kisa"
                value={shortLabel}
                onChange={(event) => setShortLabel(event.target.value)}
                placeholder="Psikoloji"
                className={FIELD}
              />
              <p className="mt-1.5 text-xs text-muted">Sekmede görünür. Boşsa başlık kullanılır.</p>
            </div>
          </div>

          <div>
            <label htmlFor="seri-aciklama" className="block text-sm font-bold text-navy">
              Açıklama
            </label>
            <textarea
              id="seri-aciklama"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={2}
              maxLength={400}
              className={FIELD}
            />
          </div>

          <fieldset className="rounded-sm border border-navy/12 p-5">
            <legend className="px-2 text-sm font-bold text-navy">
              Slaytlar{" "}
              <span className="font-medium text-muted">({slides.length})</span>
            </legend>

            <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border border-navy/25 px-5 text-sm font-bold text-navy transition hover:border-navy hover:bg-cream">
              {uploading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <ImageUp className="size-4" aria-hidden="true" />
              )}
              {uploading ? "Yükleniyor…" : "Görsel seç (çoklu)"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                onChange={handleFiles}
                disabled={uploading}
                className="sr-only"
              />
            </label>

            {slides.length === 0 ? (
              <p className="mt-4 text-xs text-muted">
                Henüz slayt yok. Birden fazla görsel seçebilirsiniz; sırayı sonra
                düzenlersiniz.
              </p>
            ) : (
              <ol className="mt-5 grid gap-3">
                {slides.map((slide, index) => (
                  <li
                    key={slide.url}
                    className="flex flex-col gap-3 rounded-sm border border-navy/10 p-4 sm:flex-row sm:items-start"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element --
                        Yüklenen görsel Blob deposundan gelir; yalnızca yönetim
                        panelinde, sabit küçük boyutta önizleme olarak kullanılır. */}
                    <img
                      src={slide.url}
                      alt=""
                      width={96}
                      height={96}
                      className="size-20 shrink-0 rounded-sm object-cover"
                    />

                    <div className="min-w-0 flex-1 grid gap-2">
                      <input
                        value={slide.title}
                        onChange={(event) => updateSlide(index, { title: event.target.value })}
                        placeholder={`${index + 1}. slaytın başlığı`}
                        className="w-full rounded-sm border border-navy/15 px-3 py-2 text-sm text-navy"
                      />
                      <input
                        value={slide.alt}
                        onChange={(event) => updateSlide(index, { alt: event.target.value })}
                        placeholder="Görsel açıklaması (ekran okuyucular için)"
                        className="w-full rounded-sm border border-navy/15 px-3 py-2 text-xs text-navy"
                      />
                    </div>

                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        aria-label={`${index + 1}. slaytı yukarı taşı`}
                        className="inline-flex size-11 items-center justify-center rounded-sm border border-navy/15 text-navy transition hover:bg-cream disabled:opacity-35"
                      >
                        <ArrowUp className="size-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 1)}
                        disabled={index === slides.length - 1}
                        aria-label={`${index + 1}. slaytı aşağı taşı`}
                        className="inline-flex size-11 items-center justify-center rounded-sm border border-navy/15 text-navy transition hover:bg-cream disabled:opacity-35"
                      >
                        <ArrowDown className="size-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSlides((current) => current.filter((_, i) => i !== index))
                        }
                        aria-label={`${index + 1}. slaytı listeden çıkar`}
                        className="inline-flex size-11 items-center justify-center rounded-sm border border-red-700/25 text-red-700 transition hover:bg-red-50"
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </fieldset>

          {error ? (
            <p role="alert" className="text-sm font-bold text-red-700">
              {error}
            </p>
          ) : null}
          {notice ? <p className="text-sm font-bold text-blue-deep">{notice}</p> : null}

          <button
            type="submit"
            disabled={saving || uploading || slides.length === 0}
            className="inline-flex min-h-12 items-center justify-center gap-2 justify-self-start rounded-sm bg-navy px-7 text-sm font-bold text-white transition hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Yayımlanıyor…
              </>
            ) : (
              <>
                <Plus className="size-4" aria-hidden="true" />
                Seriyi Yayımla
              </>
            )}
          </button>
        </form>
      </section>

      <section aria-labelledby="seri-listesi">
        <h2 id="seri-listesi" className="font-serif text-xl font-semibold text-navy">
          Panelden yayımlanan seriler{" "}
          <span className="text-sm font-medium text-muted">({collections.length})</span>
        </h2>
        <p className="mt-2 text-xs leading-6 text-muted">
          Koddaki 29 seri burada görünmez; onlar geliştirme tarafından yönetilir.
        </p>

        {loading ? (
          <p className="mt-4 text-sm text-muted">Yükleniyor…</p>
        ) : collections.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Henüz panelden seri yayımlanmadı.</p>
        ) : (
          <ul className="mt-5 grid gap-3">
            {collections.map((collection) => (
              <li
                key={collection.id}
                className="flex flex-col gap-4 rounded-sm border border-navy/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy">{collection.label}</p>
                  <p className="mt-1 text-xs text-muted">
                    {collection.slides.length} slayt · {collection.slug}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(collection.id, collection.label)}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm border border-red-700/25 px-4 text-xs font-bold text-red-700 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Sil
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
