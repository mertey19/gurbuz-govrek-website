"use client";

import { Camera, Mail, Phone, Play, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const legalContent = {
  privacy: {
    title: "Gizlilik Politikası",
    body: "Bu sitede yer alan randevu formu henüz bir veri işleme altyapısına bağlı değildir. Gerçek başvuru sistemi etkinleştirildiğinde; hangi verilerin hangi amaçla işlendiği, saklama süresi ve başvuru hakları bu metinde ayrıntılı olarak açıklanacaktır.",
  },
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    body: "İletişim ve randevu altyapısı devreye alınmadan önce veri sorumlusu bilgileri, kişisel verilerin işlenme amaçları, aktarım koşulları ve 6698 sayılı Kanun kapsamındaki haklar güncel ve doğrulanmış bilgilerle yayımlanacaktır.",
  },
  terms: {
    title: "Kullanım Koşulları",
    body: "Sitedeki içerikler genel bilgilendirme amacı taşır. Üniversite verileri ve tercih değerlendirmeleri zaman içinde değişebilir; kesin sonuç veya yerleşme garantisi sunmaz. Kişisel değerlendirme için güncel ve doğrulanabilir kaynaklar esas alınır.",
  },
} as const;

type LegalKey = keyof typeof legalContent;

export function Footer() {
  const [activeLegal, setActiveLegal] = useState<LegalKey | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setActiveLegal(null), []);
  useFocusTrap(dialogRef, Boolean(activeLegal), close);

  return (
    <footer className="bg-navy text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 border-b border-white/12 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-semibold tracking-[0.09em]">GÜRBÜZ GÖVREK</p>
            <p className="mt-2 text-xs font-bold tracking-[0.18em] text-gold-light uppercase">Matematik Öğretmeni · Tercih Uzmanı</p>
            <p className="mt-6 max-w-sm leading-7 text-white/62">
              Öğrencinin akademik hedeflerini, ilgi alanlarını ve uzun vadeli beklentilerini aynı yol haritasında buluşturan danışmanlık yaklaşımı.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gold-light uppercase">Hızlı Bağlantılar</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {siteConfig.navigation.slice(1, 6).map((item) => (
                <li key={item.href}><a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gold-light uppercase">Hizmetler</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li><a href="#danismanlik" className="hover:text-white">Tercih Danışmanlığı</a></li>
              <li><a href="#matematik" className="hover:text-white">Matematik Eğitimi</a></li>
              <li><a href="#analiz-merkezi" className="hover:text-white">Bölüm Analizi</a></li>
              <li><a href="#etkinlikler" className="hover:text-white">Seminerler</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gold-light uppercase">İletişim</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li className="flex gap-3"><Phone className="size-4 text-gold" aria-hidden="true" />{siteConfig.contact.phone || "Telefon bilgisi eklenecek"}</li>
              <li className="flex gap-3"><Mail className="size-4 text-gold" aria-hidden="true" />{siteConfig.contact.email || "E-posta bilgisi eklenecek"}</li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[{ icon: Camera, label: "Instagram" }, { icon: Play, label: "YouTube" }].map(({ icon: Icon, label }) => (
                <span key={label} className="flex size-10 cursor-not-allowed items-center justify-center rounded-full border border-white/15 text-white/35" aria-label={`${label} bağlantısı yakında`} title={`${label} bağlantısı eklenecek`}><Icon className="size-4" aria-hidden="true" /></span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 pt-7 text-xs text-white/48 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Gürbüz Gövrek. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap gap-5">
            <button type="button" onClick={() => setActiveLegal("privacy")} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">Gizlilik Politikası</button>
            <button type="button" onClick={() => setActiveLegal("kvkk")} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">KVKK Aydınlatma Metni</button>
            <button type="button" onClick={() => setActiveLegal("terms")} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">Kullanım Koşulları</button>
          </div>
        </div>
      </Container>

      {activeLegal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/85 p-5 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="legal-title" className="relative w-full max-w-2xl rounded-md bg-white p-7 text-ink shadow-2xl sm:p-10">
            <button type="button" onClick={close} className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" aria-label="Pencereyi kapat"><X aria-hidden="true" /></button>
            <p className="eyebrow">Bilgilendirme</p>
            <h2 id="legal-title" className="mt-3 pr-12 font-serif text-3xl font-semibold text-navy">{legalContent[activeLegal].title}</h2>
            <p className="mt-6 leading-8 text-ink/72">{legalContent[activeLegal].body}</p>
          </div>
        </div>
      )}
    </footer>
  );
}
