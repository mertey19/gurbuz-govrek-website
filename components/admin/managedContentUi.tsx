import { Loader2, Save } from "lucide-react";

export const ADMIN_FIELD =
  "mt-2 w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/38 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold";

export function AdminLoginNotice({ panelName }: { panelName: string }) {
  return (
    <div className="rounded-sm border border-navy/10 bg-white p-7">
      <h2 className="font-serif text-xl font-semibold text-navy">Oturum gerekli</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        {panelName}, diğer içerik panelleriyle aynı yönetici oturumunu kullanır.{" "}
        <a href="/yorum-yonetimi" className="font-bold text-blue-deep underline underline-offset-4">
          Yorum yönetiminden giriş yapın
        </a>
        , ardından bu sayfaya dönün.
      </p>
    </div>
  );
}

export function AdminSaveButton({ saving, label }: { saving: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={saving}
      className="inline-flex min-h-12 items-center justify-center gap-2 justify-self-start rounded-sm bg-navy px-7 text-sm font-bold text-white transition hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      {saving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Save className="size-4" aria-hidden="true" />}
      {saving ? "Kaydediliyor…" : label}
    </button>
  );
}
