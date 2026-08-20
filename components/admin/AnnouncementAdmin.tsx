"use client";

import { useEffect, useState } from "react";
import {
  ADMIN_FIELD,
  AdminLoginNotice,
  AdminSaveButton,
} from "@/components/admin/managedContentUi";
import type { ManagedAnnouncement } from "@/lib/site-content/types";

const EMPTY: ManagedAnnouncement = {
  isActive: true,
  badge: "Yeni",
  title: "",
  description: "",
  ctaLabel: "Detayları Gör",
  ctaHref: "/",
};

export function AnnouncementAdmin() {
  const [content, setContent] = useState<ManagedAnnouncement>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/admin/site-content?section=announcement");
        if (response.status === 401) {
          setUnauthorized(true);
          return;
        }
        const payload = (await response.json()) as { content?: ManagedAnnouncement; error?: string };
        if (!response.ok || !payload.content) throw new Error(payload.error);
        setContent(payload.content);
      } catch {
        setError("Duyuru bilgileri alınamadı.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function update<K extends keyof ManagedAnnouncement>(key: K, value: ManagedAnnouncement[K]) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "announcement", content }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Duyuru kaydedilemedi.");
      setNotice(content.isActive ? "Duyuru yayımlandı." : "Duyuru yayından kaldırıldı.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Duyuru kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  if (unauthorized) return <AdminLoginNotice panelName="Flaş duyuru yönetimi" />;
  if (loading) return <p className="text-sm text-muted">Duyuru yükleniyor…</p>;

  return (
    <form onSubmit={save} className="grid gap-5 rounded-sm border border-navy/10 bg-white p-6 sm:p-8">
      <label className="flex items-center gap-3 rounded-sm border border-navy/10 bg-cream/60 p-4 text-sm font-bold text-navy">
        <input
          type="checkbox"
          checked={content.isActive}
          onChange={(event) => update("isActive", event.target.checked)}
          className="size-5 accent-navy"
        />
        Duyuruyu ana sayfada göster
      </label>

      <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
        <div>
          <label htmlFor="announcement-badge" className="text-sm font-bold text-navy">Rozet</label>
          <input id="announcement-badge" required maxLength={24} value={content.badge} onChange={(event) => update("badge", event.target.value)} className={ADMIN_FIELD} />
        </div>
        <div>
          <label htmlFor="announcement-title" className="text-sm font-bold text-navy">Duyuru başlığı</label>
          <input id="announcement-title" required maxLength={120} value={content.title} onChange={(event) => update("title", event.target.value)} className={ADMIN_FIELD} />
        </div>
      </div>

      <div>
        <label htmlFor="announcement-description" className="text-sm font-bold text-navy">Kısa açıklama</label>
        <textarea id="announcement-description" required rows={4} maxLength={400} value={content.description} onChange={(event) => update("description", event.target.value)} className={ADMIN_FIELD} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="announcement-label" className="text-sm font-bold text-navy">Buton yazısı</label>
          <input id="announcement-label" required maxLength={50} value={content.ctaLabel} onChange={(event) => update("ctaLabel", event.target.value)} className={ADMIN_FIELD} />
        </div>
        <div>
          <label htmlFor="announcement-href" className="text-sm font-bold text-navy">Buton bağlantısı</label>
          <input id="announcement-href" required value={content.ctaHref} onChange={(event) => update("ctaHref", event.target.value)} placeholder="/tercih-robotu veya https://…" className={ADMIN_FIELD} />
        </div>
      </div>

      {error ? <p role="alert" className="text-sm font-bold text-red-700">{error}</p> : null}
      {notice ? <p className="text-sm font-bold text-blue-deep">{notice}</p> : null}
      <AdminSaveButton saving={saving} label="Duyuruyu Kaydet" />
    </form>
  );
}
