"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import {
  ADMIN_FIELD,
  AdminLoginNotice,
  AdminSaveButton,
} from "@/components/admin/managedContentUi";
import type { ManagedEventsContent } from "@/lib/site-content/types";

const EMPTY: ManagedEventsContent = { eyebrow: "Seminerler ve Etkinlikler", title: "", description: "", items: [""] };

export function EventsAdmin() {
  const [content, setContent] = useState<ManagedEventsContent>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/admin/site-content?section=events");
        if (response.status === 401) {
          setUnauthorized(true);
          return;
        }
        const payload = (await response.json()) as { content?: ManagedEventsContent };
        if (!response.ok || !payload.content) throw new Error();
        setContent(payload.content);
      } catch {
        setError("Etkinlik bilgileri alınamadı.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function updateItem(index: number, value: string) {
    setContent((current) => ({ ...current, items: current.items.map((item, position) => position === index ? value : item) }));
  }

  function moveItem(index: number, direction: -1 | 1) {
    setContent((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.items.length) return current;
      const items = [...current.items];
      [items[index], items[target]] = [items[target], items[index]];
      return { ...current, items };
    });
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
        body: JSON.stringify({ section: "events", content }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Etkinlikler kaydedilemedi.");
      setNotice("Etkinlik bölümü güncellendi.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Etkinlikler kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  if (unauthorized) return <AdminLoginNotice panelName="Etkinlik yönetimi" />;
  if (loading) return <p className="text-sm text-muted">Etkinlikler yükleniyor…</p>;

  return (
    <form onSubmit={save} className="grid gap-5 rounded-sm border border-navy/10 bg-white p-6 sm:p-8">
      <div>
        <label htmlFor="events-eyebrow" className="text-sm font-bold text-navy">Bölüm üst başlığı</label>
        <input id="events-eyebrow" required value={content.eyebrow} onChange={(event) => setContent((current) => ({ ...current, eyebrow: event.target.value }))} className={ADMIN_FIELD} />
      </div>
      <div>
        <label htmlFor="events-title" className="text-sm font-bold text-navy">Ana başlık</label>
        <input id="events-title" required maxLength={160} value={content.title} onChange={(event) => setContent((current) => ({ ...current, title: event.target.value }))} className={ADMIN_FIELD} />
      </div>
      <div>
        <label htmlFor="events-description" className="text-sm font-bold text-navy">Açıklama</label>
        <textarea id="events-description" required rows={4} maxLength={500} value={content.description} onChange={(event) => setContent((current) => ({ ...current, description: event.target.value }))} className={ADMIN_FIELD} />
      </div>

      <fieldset className="rounded-sm border border-navy/12 p-5">
        <legend className="px-2 text-sm font-bold text-navy">Etkinlik türleri</legend>
        <div className="grid gap-3">
          {content.items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input required maxLength={120} value={item} onChange={(event) => updateItem(index, event.target.value)} aria-label={`${index + 1}. etkinlik türü`} className="min-w-0 flex-1 rounded-sm border border-navy/15 px-4 py-3 text-sm text-navy" />
              <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} aria-label="Yukarı taşı" className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-navy/15 text-navy disabled:opacity-30"><ArrowUp className="size-4" /></button>
              <button type="button" onClick={() => moveItem(index, 1)} disabled={index === content.items.length - 1} aria-label="Aşağı taşı" className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-navy/15 text-navy disabled:opacity-30"><ArrowDown className="size-4" /></button>
              <button type="button" onClick={() => setContent((current) => ({ ...current, items: current.items.filter((_, position) => position !== index) }))} disabled={content.items.length === 1} aria-label="Sil" className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-red-700/25 text-red-700 disabled:opacity-30"><Trash2 className="size-4" /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setContent((current) => ({ ...current, items: [...current.items, ""] }))} disabled={content.items.length >= 20} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm border border-navy/20 px-4 text-sm font-bold text-navy"><Plus className="size-4" /> Etkinlik türü ekle</button>
      </fieldset>

      {error ? <p role="alert" className="text-sm font-bold text-red-700">{error}</p> : null}
      {notice ? <p className="text-sm font-bold text-blue-deep">{notice}</p> : null}
      <AdminSaveButton saving={saving} label="Etkinlikleri Kaydet" />
    </form>
  );
}
