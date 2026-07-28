"use client";

import { useEffect, useState } from "react";
import { ImageUp, Loader2, Plus, Trash2 } from "lucide-react";
import { uploadImage } from "@/components/admin/imageUpload";

/**
 * Meslek tanıtımı yönetim arayüzü.
 *
 * Oturum yorum paneliyle ortaktır. Görsel isteğe bağlı; İŞKUR dosyalarının
 * aksine buradaki içerik site sahibinin kendi metnidir.
 */
type AdminProfession = {
  id: number;
  slug: string;
  title: string;
  category: string;
};

const CATEGORIES = [
  { value: "sayisal", label: "Sayısal (SAY)" },
  { value: "esit-agirlik", label: "Eşit Ağırlık (EA)" },
  { value: "sozel", label: "Sözel (SÖZ)" },
  { value: "dil", label: "Dil (DİL)" },
  { value: "tyt", label: "TYT" },
];

const FIELD =
  "mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/38 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold";

export function ProfessionAdmin() {
  const [professions, setProfessions] = useState<AdminProfession[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  async function load() {
    try {
      const response = await fetch("/api/admin/professions");
      if (response.status === 401) {
        setUnauthorized(true);
        return;
      }
      const payload = (await response.json()) as { professions?: AdminProfession[] };
      setProfessions(payload.professions ?? []);
      setUnauthorized(false);
    } catch {
      setError("Liste alınamadı.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    /* Tüm durum güncellemeleri `await fetch` sonrasına düşer. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      const result = await uploadImage(file);
      setImage(result.url);
      setNotice(`Görsel yüklendi (${result.sizeKb} KB).`);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Görsel yüklenemedi.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/professions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, summary, body, image, imageAlt }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Kaydedilemedi.");
        return;
      }

      setTitle("");
      setSummary("");
      setBody("");
      setImage("");
      setImageAlt("");
      setNotice("Meslek tanıtımı yayımlandı.");
      await load();
    } catch {
      setError("Kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`“${name}” silinsin mi? Bu işlem geri alınamaz.`)) return;

    const response = await fetch(`/api/admin/professions/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Silinemedi.");
      return;
    }
    await load();
  }

  if (unauthorized) {
    return (
      <div className="rounded-sm border border-navy/10 bg-white p-7">
        <h2 className="font-serif text-xl font-semibold text-navy">Oturum gerekli</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          Meslek yönetimi, yorum paneliyle aynı oturumu kullanır.{" "}
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
        aria-labelledby="meslek-ekle"
        className="rounded-sm border border-navy/10 bg-white p-6 sm:p-8"
      >
        <h2 id="meslek-ekle" className="font-serif text-xl font-semibold text-navy">
          Yeni meslek tanıtımı
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-[1fr_220px]">
            <div>
              <label htmlFor="meslek-ad" className="block text-sm font-bold text-navy">
                Meslek adı
              </label>
              <input
                id="meslek-ad"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                maxLength={120}
                placeholder="Örnek: Adli Bilişim Uzmanı"
                className={FIELD}
              />
            </div>

            <div>
              <label htmlFor="meslek-kategori" className="block text-sm font-bold text-navy">
                Puan türü
              </label>
              <select
                id="meslek-kategori"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={FIELD}
              >
                {CATEGORIES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="meslek-ozet" className="block text-sm font-bold text-navy">
              Özet
            </label>
            <textarea
              id="meslek-ozet"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              rows={2}
              maxLength={320}
              className={FIELD}
            />
            <p className="mt-1.5 text-xs text-muted">
              Listede ve arama sonucunda görünen kısa açıklama.
            </p>
          </div>

          <div>
            <label htmlFor="meslek-metin" className="block text-sm font-bold text-navy">
              Tanıtım metni
            </label>
            <textarea
              id="meslek-metin"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              required
              rows={12}
              className={`${FIELD} font-mono text-[13px] leading-6`}
            />
            <p className="mt-1.5 text-xs text-muted">
              Paragrafları boş satırla ayırın. Satır başına <code>## </code> yazarsanız ara
              başlık olur.
            </p>
          </div>

          <fieldset className="rounded-sm border border-navy/12 p-5">
            <legend className="px-2 text-sm font-bold text-navy">
              Görsel <span className="font-medium text-muted">(isteğe bağlı)</span>
            </legend>

            <div className="flex flex-wrap items-center gap-4">
              <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border border-navy/25 px-5 text-sm font-bold text-navy transition hover:border-navy hover:bg-cream">
                {uploading ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <ImageUp className="size-4" aria-hidden="true" />
                )}
                {uploading ? "Yükleniyor…" : image ? "Görseli değiştir" : "Görsel yükle"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFile}
                  disabled={uploading}
                  className="sr-only"
                />
              </label>

              {image ? (
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="text-xs font-bold text-red-700 underline underline-offset-4"
                >
                  Görseli kaldır
                </button>
              ) : null}
            </div>

            {image ? (
              <div className="mt-4">
                <label htmlFor="meslek-alt" className="block text-xs font-bold text-navy">
                  Görsel açıklaması
                </label>
                <input
                  id="meslek-alt"
                  value={imageAlt}
                  onChange={(event) => setImageAlt(event.target.value)}
                  placeholder="Görselde ne olduğunu yazın"
                  className={FIELD}
                />
              </div>
            ) : null}
          </fieldset>

          {error ? (
            <p role="alert" className="text-sm font-bold text-red-700">
              {error}
            </p>
          ) : null}
          {notice ? <p className="text-sm font-bold text-blue-deep">{notice}</p> : null}

          <button
            type="submit"
            disabled={saving || uploading}
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
                Yayımla
              </>
            )}
          </button>
        </form>
      </section>

      <section aria-labelledby="meslek-listesi">
        <h2 id="meslek-listesi" className="font-serif text-xl font-semibold text-navy">
          Panelden yayımlananlar{" "}
          <span className="text-sm font-medium text-muted">({professions.length})</span>
        </h2>
        <p className="mt-2 text-xs leading-6 text-muted">
          İŞKUR’a ait 115 meslek dosyası burada görünmez; onlar kategori sayfalarından
          kaynak gösterilerek sunuluyor.
        </p>

        {loading ? (
          <p className="mt-4 text-sm text-muted">Yükleniyor…</p>
        ) : professions.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Henüz meslek tanıtımı yayımlanmadı.</p>
        ) : (
          <ul className="mt-5 grid gap-3">
            {professions.map((profession) => (
              <li
                key={profession.id}
                className="flex flex-col gap-4 rounded-sm border border-navy/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <a
                    href={`/meslekler/tanitim/${profession.slug}`}
                    className="truncate text-sm font-bold text-navy hover:text-blue-deep"
                  >
                    {profession.title}
                  </a>
                  <p className="mt-1 text-xs text-muted">
                    {CATEGORIES.find((item) => item.value === profession.category)?.label ??
                      profession.category}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(profession.id, profession.title)}
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
