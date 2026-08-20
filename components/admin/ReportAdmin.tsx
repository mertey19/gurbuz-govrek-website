"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  ADMIN_FIELD,
  AdminLoginNotice,
  AdminSaveButton,
} from "@/components/admin/managedContentUi";

type Highlight = { title: string; detail: string };
type AdminReport = { id: number; slug: string; title: string; pages: number; publisher: string };

const INITIAL_HIGHLIGHTS: Highlight[] = [{ title: "", detail: "" }];

export function ReportAdmin() {
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState("");
  const [sizeLabel, setSizeLabel] = useState("");
  const [file, setFile] = useState("");
  const [intro, setIntro] = useState("");
  const [highlights, setHighlights] = useState<Highlight[]>(INITIAL_HIGHLIGHTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/reports");
      if (response.status === 401) {
        setUnauthorized(true);
        return;
      }
      const payload = (await response.json()) as { reports?: AdminReport[] };
      setReports(payload.reports ?? []);
    } catch {
      setError("Rapor listesi alınamadı.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, publisher, pages: Number(pages), sizeLabel, file, intro, highlights }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Rapor kaydedilemedi.");
      setTitle(""); setDescription(""); setPublisher(""); setPages(""); setSizeLabel(""); setFile(""); setIntro(""); setHighlights(INITIAL_HIGHLIGHTS);
      setNotice("Rapor ve tanıtım sayfası yayımlandı.");
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Rapor kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number, name: string) {
    if (!window.confirm(`“${name}” raporu silinsin mi?`)) return;
    const response = await fetch(`/api/admin/reports/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Rapor silinemedi.");
      return;
    }
    await load();
  }

  if (unauthorized) return <AdminLoginNotice panelName="Rapor ve kılavuz yönetimi" />;

  return (
    <div className="grid gap-10">
      <form onSubmit={save} className="grid gap-5 rounded-sm border border-navy/10 bg-white p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-navy">Yeni rapor veya kılavuz</h2>
        <div>
          <label htmlFor="report-title" className="text-sm font-bold text-navy">Belge başlığı</label>
          <input id="report-title" required maxLength={180} value={title} onChange={(event) => setTitle(event.target.value)} className={ADMIN_FIELD} />
        </div>
        <div>
          <label htmlFor="report-description" className="text-sm font-bold text-navy">Liste açıklaması</label>
          <textarea id="report-description" required rows={3} maxLength={500} value={description} onChange={(event) => setDescription(event.target.value)} className={ADMIN_FIELD} />
        </div>
        <div className="grid gap-5 sm:grid-cols-[1fr_120px_140px]">
          <div>
            <label htmlFor="report-publisher" className="text-sm font-bold text-navy">Hazırlayan / kaynak</label>
            <input id="report-publisher" required value={publisher} onChange={(event) => setPublisher(event.target.value)} className={ADMIN_FIELD} />
          </div>
          <div>
            <label htmlFor="report-pages" className="text-sm font-bold text-navy">Sayfa</label>
            <input id="report-pages" type="number" min="1" required value={pages} onChange={(event) => setPages(event.target.value)} className={ADMIN_FIELD} />
          </div>
          <div>
            <label htmlFor="report-size" className="text-sm font-bold text-navy">Dosya boyutu</label>
            <input id="report-size" required placeholder="4,2 MB" value={sizeLabel} onChange={(event) => setSizeLabel(event.target.value)} className={ADMIN_FIELD} />
          </div>
        </div>
        <div>
          <label htmlFor="report-file" className="text-sm font-bold text-navy">PDF veya belge bağlantısı</label>
          <input id="report-file" type="url" required placeholder="https://…" value={file} onChange={(event) => setFile(event.target.value)} className={ADMIN_FIELD} />
          <p className="mt-1.5 text-xs leading-5 text-muted">Herkese açık, https:// ile başlayan doğrudan belge bağlantısı kullanın.</p>
        </div>
        <div>
          <label htmlFor="report-intro" className="text-sm font-bold text-navy">Tanıtım metni</label>
          <textarea id="report-intro" required rows={5} value={intro} onChange={(event) => setIntro(event.target.value)} className={ADMIN_FIELD} />
        </div>
        <fieldset className="rounded-sm border border-navy/12 p-5">
          <legend className="px-2 text-sm font-bold text-navy">Belgede neler var?</legend>
          <div className="grid gap-4">
            {highlights.map((item, index) => (
              <div key={index} className="grid gap-2 rounded-sm border border-navy/10 p-4 sm:grid-cols-[220px_1fr_auto]">
                <input required placeholder="İçerik başlığı" value={item.title} onChange={(event) => setHighlights((current) => current.map((highlight, position) => position === index ? { ...highlight, title: event.target.value } : highlight))} className="rounded-sm border border-navy/15 px-3 py-2 text-sm text-navy" />
                <input required placeholder="Kısa açıklama" value={item.detail} onChange={(event) => setHighlights((current) => current.map((highlight, position) => position === index ? { ...highlight, detail: event.target.value } : highlight))} className="rounded-sm border border-navy/15 px-3 py-2 text-sm text-navy" />
                <button type="button" onClick={() => setHighlights((current) => current.filter((_, position) => position !== index))} disabled={highlights.length === 1} aria-label="İçerik başlığını sil" className="inline-flex size-11 items-center justify-center rounded-sm border border-red-700/25 text-red-700 disabled:opacity-30"><Trash2 className="size-4" /></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setHighlights((current) => [...current, { title: "", detail: "" }])} disabled={highlights.length >= 12} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm border border-navy/20 px-4 text-sm font-bold text-navy"><Plus className="size-4" /> İçerik başlığı ekle</button>
        </fieldset>
        {error ? <p role="alert" className="text-sm font-bold text-red-700">{error}</p> : null}
        {notice ? <p className="text-sm font-bold text-blue-deep">{notice}</p> : null}
        <AdminSaveButton saving={saving} label="Raporu Yayımla" />
      </form>

      <section>
        <h2 className="font-serif text-xl font-semibold text-navy">Panelden yayımlanan raporlar <span className="text-sm font-medium text-muted">({reports.length})</span></h2>
        {loading ? <p className="mt-4 text-sm text-muted">Yükleniyor…</p> : reports.length === 0 ? <p className="mt-4 text-sm text-muted">Henüz panelden rapor yayımlanmadı.</p> : (
          <ul className="mt-5 grid gap-3">
            {reports.map((report) => (
              <li key={report.id} className="flex flex-col gap-4 rounded-sm border border-navy/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div><a href={`/raporlar/${report.slug}`} className="text-sm font-bold text-navy hover:text-blue-deep">{report.title}</a><p className="mt-1 text-xs text-muted">{report.pages} sayfa · {report.publisher}</p></div>
                <button type="button" onClick={() => remove(report.id, report.title)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-red-700/25 px-4 text-xs font-bold text-red-700"><Trash2 className="size-4" /> Sil</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
