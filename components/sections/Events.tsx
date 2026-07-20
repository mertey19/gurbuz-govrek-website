import { SiteImage as Image } from "@/components/ui/SiteImage";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { whatsappUrl } from "@/config/site";

const eventTypes = ["YKS Tercih Seminerleri", "Üniversite Tanıtım Buluşmaları", "Matematik Başarı Atölyeleri", "Öğrenci Motivasyon Programları", "Veli Bilgilendirme Seminerleri"];

export function Events() {
  return (
    <section id="etkinlikler" className="relative isolate overflow-hidden bg-navy text-white">
      <Image src="/images/seminars.png" alt="Gürbüz Gövrek sahnede öğrencilere seminer veriyor" fill sizes="100vw" className="-z-20 object-cover object-[64%_center]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,26,51,.98)_0%,rgba(7,26,51,.9)_48%,rgba(7,26,51,.28)_100%)]" />
      <Container className="section-space">
        <Reveal className="max-w-2xl">
          <SectionTitle eyebrow="Seminerler ve Etkinlikler" title="Bilgiyi Öğrencilerle ve Velilerle Buluşturan Etkinlikler" description="Tercih, matematik, motivasyon ve kariyer planlamasını; anlaşılır, katılımcı ve hedef odaklı buluşmalarla ele alıyoruz." tone="light" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {eventTypes.map((event) => <li key={event} className="flex gap-3 text-sm text-white/74"><Check className="mt-0.5 size-4 shrink-0 text-gold-light" aria-hidden="true" />{event}</li>)}
          </ul>
          <Button href={whatsappUrl} external className="mt-9">WhatsApp&apos;tan Bilgi Al</Button>
        </Reveal>
      </Container>
    </section>
  );
}
