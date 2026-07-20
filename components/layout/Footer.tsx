import { Camera, Mail, Phone, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
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
              <li className="flex gap-3"><Phone className="size-4 text-gold" aria-hidden="true" /><a href={siteConfig.contact.phoneHref} className="hover:text-white">{siteConfig.contact.phone}</a></li>
              <li className="flex gap-3"><Mail className="size-4 text-gold" aria-hidden="true" /><a href={siteConfig.contact.emailHref} className="break-all hover:text-white">{siteConfig.contact.email}</a></li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Camera, label: "Instagram", href: siteConfig.contact.instagram },
                { icon: Play, label: "YouTube", href: siteConfig.contact.youtube },
              ].map(({ icon: Icon, label, href }) => href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-gold hover:text-gold-light" aria-label={`${label} sayfasını aç`}><Icon className="size-4" aria-hidden="true" /></a>
              ) : (
                <span key={label} className="flex size-10 cursor-not-allowed items-center justify-center rounded-full border border-white/15 text-white/35" aria-label={`${label} bağlantısı yakında`} title={`${label} bağlantısı eklenecek`}><Icon className="size-4" aria-hidden="true" /></span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-7 text-xs text-white/48 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Gürbüz Gövrek. Tüm hakları saklıdır.</p>
          <p>Matematik Öğretmeni · Tercih Uzmanı</p>
        </div>
      </Container>
    </footer>
  );
}
