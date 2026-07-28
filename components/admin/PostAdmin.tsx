"use client";

import { useEffect, useState } from "react";
import { ImageUp, Loader2, Plus, Trash2 } from "lucide-react";
import { uploadImage } from "@/components/admin/imageUpload";

/**
 * Blog yazısı yönetim arayüzü.
 *
 * Oturum yorum paneliyle ortaktır. Görsel, yüklenmeden önce tarayıcıda
 * küçültülür; sunucuda `sharp` çalışamadığı için işlem burada yapılır.
 */
type ManagedPost = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  publishedAt: string;
};

const FIELD =
  "mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/38 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold";

const SITE_IMAGES = [
  "/images/guidance-introduction.webp",
  "/images/preference-analysis.webp",
  "/images/one-to-one-consulting.webp",
  "/images/university-guidance.webp",
  "/images/mathematics-education.webp",
  "/images/campus-visits.webp",
  "/images/student-success.webp",
  "/images/seminars.webp",
];

export function PostAdmin() {
  const [posts, setPosts] = useState<ManagedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(SITE_IMAGES[0]);
  const [imageAlt, setImageAlt] = useState("");

  async function load() {
    try {
      const response = await fetch("/api/admin/posts");
      if (response.status === 401) {
        setUnauthorized(true);
        return;
      }
      const payload = (await response.json()) as { posts?: ManagedPost[] };
      setPosts(payload.posts ?? []);
      setUnauthorized(false);
    } catch {
      setError("Yazı listesi alınamadı.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    /*
      Kural effect içinde senkron setState çağrısını yakalar. Buradaki tüm
      güncellemeler `await fetch` sonrasına düşüyor; zincirleme render oluşmaz.
    */
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
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, body, image, imageAlt }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Yazı kaydedilemedi.");
        return;
      }

      setTitle("");
      setDescription("");
      setBody("");
      setImageAlt("");
      setNotice("Yazı yayımlandı.");
      await load();
    } catch {
      setError("Yazı kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`“${name}” silinsin mi? Bu işlem geri alınamaz.`)) return;

    const response = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Yazı silinemedi.");
      return;
    }
    await load();
  }

  if (unauthorized) {
    return (
      <div className="rounded-sm border border-navy/10 bg-white p-7">
        <h2 className="font-serif text-xl font-semibold text-navy">Oturum gerekli</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          Blog yönetimi, yorum paneliyle aynı oturumu kullanır.{" "}
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

  const usingUpload = image.startsWith("https://");

  return (
    <div className="grid gap-8">
      <section
        aria-labelledby="yazi-ekle"
        className="rounded-sm border border-navy/10 bg-white p-6 sm:p-8"
      >
        <h2 id="yazi-ekle" className="font-serif text-xl font-semibold text-navy">
          Yeni yazı
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-[1fr_220px]">
            <div>
              <label htmlFor="post-title" className="block text-sm font-bold text-navy">
                Başlık
              </label>
              <input
                id="post-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                maxLength={140}
                className={FIELD}
              />
              <p className="mt-1.5 text-xs text-muted">
                Adres başlıktan üretilir; Türkçe harfler çevrilir.
              </p>
            </div>

            <div>
              <label htmlFor="post-category" className="block text-sm font-bold text-navy">
                Kategori
              </label>
              <input
                id="post-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Tercih Rehberi"
                className={FIELD}
              />
            </div>
          </div>

          <div>
            <label htmlFor="post-description" className="block text-sm font-bold text-navy">
              Özet
            </label>
            <textarea
              id="post-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={2}
              maxLength={320}
              className={FIELD}
            />
            <p className="mt-1.5 text-xs text-muted">
              Google’ın arama sonucunda başlığın altında gösterdiği satır.
            </p>
          </div>

          <div>
            <label htmlFor="post-body" className="block text-sm font-bold text-navy">
              Yazı metni
            </label>
            <textarea
              id="post-body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              required
              rows={14}
              className={`${FIELD} font-mono text-[13px] leading-6`}
            />
            <p className="mt-1.5 text-xs text-muted">
              Paragrafları boş satırla ayırın. Satır başına <code>## </code> yazarsanız ara
              başlık olur.
            </p>
          </div>

          <fieldset className="rounded-sm border border-navy/12 p-5">
            <legend className="px-2 text-sm font-bold text-navy">Kapak görseli</legend>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <label htmlFor="post-image" className="block text-xs font-bold text-navy">
                  Sitedeki görsellerden seç
                </label>
                <select
                  id="post-image"
                  value={usingUpload ? "" : image}
                  onChange={(event) => setImage(event.target.value)}
                  className={FIELD}
                >
                  {usingUpload ? <option value="">— yüklenen görsel kullanılıyor —</option> : null}
                  {SITE_IMAGES.map((path) => (
                    <option key={path} value={path}>
                      {path.replace("/images/", "")}
                    </option>
                  ))}
                </select>
              </div>

              <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border border-navy/25 px-5 text-sm font-bold text-navy transition hover:border-navy hover:bg-cream">
                {uploading ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <ImageUp className="size-4" aria-hidden="true" />
                )}
                {uploading ? "Yükleniyor…" : "Yeni görsel yükle"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFile}
                  disabled={uploading}
                  className="sr-only"
                />
              </label>
            </div>

            <div className="mt-4">
              <label htmlFor="post-alt" className="block text-xs font-bold text-navy">
                Görsel açıklaması
              </label>
              <input
                id="post-alt"
                value={imageAlt}
                onChange={(event) => setImageAlt(event.target.value)}
                placeholder="Görselde ne olduğunu yazın"
                className={FIELD}
              />
              <p className="mt-1.5 text-xs text-muted">
                Ekran okuyucular ve görsel araması bunu kullanır. Boş bırakılırsa başlık
                kullanılır.
              </p>
            </div>
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

      <section aria-labelledby="yazi-listesi">
        <h2 id="yazi-listesi" className="font-serif text-xl font-semibold text-navy">
          Panelden yayımlananlar{" "}
          <span className="text-sm font-medium text-muted">({posts.length})</span>
        </h2>
        <p className="mt-2 text-xs leading-6 text-muted">
          Kod içinde duran 13 yazı burada görünmez; onlar geliştirme tarafından yönetilir.
        </p>

        {loading ? (
          <p className="mt-4 text-sm text-muted">Yükleniyor…</p>
        ) : posts.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Henüz panelden yazı yayımlanmadı.</p>
        ) : (
          <ul className="mt-5 grid gap-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-col gap-4 rounded-sm border border-navy/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <a
                    href={`/blog/${post.slug}`}
                    className="truncate text-sm font-bold text-navy hover:text-blue-deep"
                  >
                    {post.title}
                  </a>
                  <p className="mt-1 text-xs text-muted">
                    {post.category} · /blog/{post.slug}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(post.id, post.title)}
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
