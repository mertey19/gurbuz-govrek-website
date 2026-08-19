"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";

/**
 * Video yönetim arayüzü.
 *
 * Oturum yorum paneliyle ortaktır; bu bileşen ayrı bir giriş sunmaz. Yetkisiz
 * durumda API 401 döner ve kullanıcı yorum paneline yönlendirilir.
 */
type AdminVideo = {
  id: number;
  provider: "youtube" | "instagram";
  videoId: string;
  title: string;
  description: string;
  category: string;
};

const CATEGORIES = [
  { value: "tercih", label: "Tercih Rehberi" },
  { value: "meslek", label: "Meslek Tanıtımı" },
  { value: "universite", label: "Üniversite Tanıtımı" },
  { value: "matematik", label: "Matematik" },
];

const FIELD =
  "mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/38 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold";

export function VideoAdmin() {
  const [videos, setVideos] = useState<AdminVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [url, setUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].value);

  async function load() {
    try {
      const response = await fetch("/api/admin/videos");
      if (response.status === 401) {
        setUnauthorized(true);
        return;
      }
      const payload = (await response.json()) as { videos?: AdminVideo[] };
      setVideos(payload.videos ?? []);
      setUnauthorized(false);
    } catch {
      setError("Video listesi alınamadı.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    /*
      Kural, effect içinde senkron setState çağrısını yakalamak için var.
      `load` içindeki tüm durum güncellemeleri `await fetch` sonrasına düşer,
      yani ilk render zincirlenmez; kural bunu statik olarak ayırt edemiyor.
    */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, title: videoTitle, description, category }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Video eklenemedi.");
        return;
      }

      setUrl("");
      setVideoTitle("");
      setDescription("");
      await load();
    } catch {
      setError("Video eklenemedi.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    // Silme geri alınamaz; yanlışlıkla tıklamaya karşı onay istenir.
    if (!window.confirm(`“${name}” silinsin mi? Bu işlem geri alınamaz.`)) return;

    const response = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Video silinemedi.");
      return;
    }
    await load();
  }

  if (unauthorized) {
    return (
      <div className="rounded-sm border border-navy/10 bg-white p-7">
        <h2 className="font-serif text-xl font-semibold text-navy">Oturum gerekli</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          Video yönetimi, yorum paneliyle aynı oturumu kullanır.{" "}
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
        aria-labelledby="video-ekle"
        className="rounded-sm border border-navy/10 bg-white p-6 sm:p-8"
      >
        <h2 id="video-ekle" className="font-serif text-xl font-semibold text-navy">
          Yeni video ekle
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          <div>
            <label htmlFor="video-url" className="block text-sm font-bold text-navy">
              YouTube veya Instagram adresi
            </label>
            <input
              id="video-url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
              placeholder="https://www.youtube.com/watch?v=... veya https://www.instagram.com/reel/..."
              className={FIELD}
            />
            <p className="mt-1.5 text-xs text-muted">
              Adresi olduğu gibi yapıştırın; YouTube Shorts ile Instagram gönderi ve Reels bağlantıları da kabul edilir.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
            <div>
              <label htmlFor="video-title" className="block text-sm font-bold text-navy">
                Başlık
              </label>
              <input
                id="video-title"
                value={videoTitle}
                onChange={(event) => setVideoTitle(event.target.value)}
                required
                maxLength={120}
                className={FIELD}
              />
            </div>

            <div>
              <label htmlFor="video-category" className="block text-sm font-bold text-navy">
                Kategori
              </label>
              <select
                id="video-category"
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
            <label htmlFor="video-description" className="block text-sm font-bold text-navy">
              Açıklama <span className="font-medium text-muted">(isteğe bağlı)</span>
            </label>
            <textarea
              id="video-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              maxLength={600}
              className={FIELD}
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm font-bold text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-12 items-center justify-center gap-2 justify-self-start rounded-sm bg-navy px-7 text-sm font-bold text-white transition hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Ekleniyor…
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

      <section aria-labelledby="video-listesi">
        <h2 id="video-listesi" className="font-serif text-xl font-semibold text-navy">
          Yayındaki videolar{" "}
          <span className="text-sm font-medium text-muted">({videos.length})</span>
        </h2>

        {loading ? (
          <p className="mt-4 text-sm text-muted">Yükleniyor…</p>
        ) : videos.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Henüz video eklenmedi.</p>
        ) : (
          <ul className="mt-5 grid gap-3">
            {videos.map((video) => (
              <li
                key={video.id}
                className="flex flex-col gap-4 rounded-sm border border-navy/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element --
                      YouTube küçük resmi harici CDN'den gelir ve yalnızca yönetim
                      panelinde, sabit 96x64 boyutunda kullanılır. next/image için
                      uzak kaynak yapılandırması açmak bu tek kullanım için gereksiz. */}
                  {video.provider === "youtube" ? (
                    <img
                      src={`https://i.ytimg.com/vi/${video.videoId}/default.jpg`}
                      alt=""
                      width={120}
                      height={90}
                      className="h-16 w-24 shrink-0 rounded-sm object-cover"
                    />
                  ) : (
                    <span className="flex h-16 w-24 shrink-0 items-center justify-center rounded-sm bg-gradient-to-br from-fuchsia-600 via-rose-500 to-amber-400 text-white">
                      <FaInstagram className="size-7" aria-hidden="true" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-navy">{video.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {CATEGORIES.find((item) => item.value === video.category)?.label ??
                        video.category}{" "}
                      · {video.provider === "youtube" ? "YouTube" : "Instagram"} · {video.videoId}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(video.id, video.title)}
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
