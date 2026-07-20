import Image from "next/image";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const contactRows = [
  { icon: Phone, label: "Telefon", value: siteConfig.contact.phone || "Bilgi eklenecek" },
  { icon: Mail, label: "E-posta", value: siteConfig.contact.email || "Bilgi eklenecek" },
  { icon: Clock3, label: "Çalışma saatleri", value: siteConfig.contact.hours },
  { icon: MapPin, label: "Görüşme", value: siteConfig.contact.location },
];

export function ContactCTA() {
  return (
    <section id="iletisim" className="relative isolate overflow-hidden bg-navy text-white">
      <Image src="/images/contact-consulting.png" alt="Gürbüz Gövrek ofisinde danışmanlık görüşmesine hazırlanıyor" fill sizes="100vw" className="-z-20 object-cover object-[66%_center]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,26,51,.98)_0%,rgba(7,26,51,.94)_46%,rgba(7,26,51,.4)_100%)]" />
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">İletişim</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold sm:text-5xl">Doğru Yol Haritası İçin İlk Adımı Atın</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/68">Öğrencinin hedeflerini, ihtiyaçlarını ve seçeneklerini birlikte değerlendirmek için ilk görüşmenizi planlayın.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contactRows.map(({ icon: Icon, label, value }) => <div key={label} className="flex items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/38 text-gold-light"><Icon className="size-4" aria-hidden="true" /></span><div><p className="text-[10px] tracking-[.15em] text-white/42 uppercase">{label}</p><p className="mt-1 text-sm text-white/78">{value}</p></div></div>)}
          </div>
          <Button href="#randevu" className="mt-9">Randevu Oluştur</Button>
        </div>
      </Container>
    </section>
  );
}
