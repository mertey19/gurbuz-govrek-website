"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import {
  ADMIN_FIELD,
  AdminLoginNotice,
  AdminSaveButton,
} from "@/components/admin/managedContentUi";
import type { ManagedFaqItem } from "@/lib/site-content/types";

export function FaqAdmin() {
  const [items, setItems] = useState<ManagedFaqItem[]>([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/admin/site-content?section=faq");
        if (response.status === 401) {
          setUnauthorized(true);
          return;
        }
        const payload = (await response.json()) as { content?: ManagedFaqItem[] };
        if (!response.ok || !payload.content) throw new Error();
        setItems(payload.content);
      } catch {
        setError("Sık sorulan sorular alınamadı.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function update(index: number, patch: Partial<ManagedFaqItem>) {
    setItems((current) => current.map((item, position) => position === index ? { ...item, ...patch } : item));
  }

  function move(index: number, direction: -1 | 1) {
    setItems((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
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
        body: JSON.stringify({ section: "faq", content: items }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Sorular kaydedilemedi.");
      setNotice("Sık sorulan sorular güncellendi.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Sorular kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  if (unauthorized) return <AdminLoginNotice panelName="Sık sorulan sorular yönetimi" />;
  if (loading) return <p className="text-sm text-muted">Sorular yükleniyor…</p>;

  return (
    <form onSubmit={save} className="grid gap-5">
      <ol className="grid gap-4">
        {items.map((item, index) => (
          <li key={index} className="rounded-sm border border-navy/10 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-serif text-lg font-semibold text-navy">{index + 1}. soru</h2>
              <div className="flex gap-1">
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Yukarı taşı" className="inline-flex size-11 items-center justify-center rounded-sm border border-navy/15 text-navy disabled:opacity-30"><ArrowUp className="size-4" /></button>
                <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Aşağı taşı" className="inline-flex size-11 items-center justify-center rounded-sm border border-navy/15 text-navy disabled:opacity-30"><ArrowDown className="size-4" /></button>
                <button type="button" onClick={() => setItems((current) => current.filter((_, position) => position !== index))} disabled={items.length === 1} aria-label="Soruyu sil" className="inline-flex size-11 items-center justify-center rounded-sm border border-red-700/25 text-red-700 disabled:opacity-30"><Trash2 className="size-4" /></button>
              </div>
            </div>
            <label htmlFor={`faq-question-${index}`} className="mt-4 block text-sm font-bold text-navy">Soru</label>
            <input id={`faq-question-${index}`} required maxLength={180} value={item.question} onChange={(event) => update(index, { question: event.target.value })} className={ADMIN_FIELD} />
            <label htmlFor={`faq-answer-${index}`} className="mt-4 block text-sm font-bold text-navy">Yanıt</label>
            <textarea id={`faq-answer-${index}`} required rows={4} maxLength={1200} value={item.answer} onChange={(event) => update(index, { answer: event.target.value })} className={ADMIN_FIELD} />
          </li>
        ))}
      </ol>

      <button type="button" onClick={() => setItems((current) => [...current, { question: "", answer: "" }])} disabled={items.length >= 30} className="inline-flex min-h-12 items-center gap-2 justify-self-start rounded-sm border border-navy/20 bg-white px-5 text-sm font-bold text-navy"><Plus className="size-4" /> Yeni soru ekle</button>
      {error ? <p role="alert" className="text-sm font-bold text-red-700">{error}</p> : null}
      {notice ? <p className="text-sm font-bold text-blue-deep">{notice}</p> : null}
      <AdminSaveButton saving={saving} label="Soruları Kaydet" />
    </form>
  );
}
