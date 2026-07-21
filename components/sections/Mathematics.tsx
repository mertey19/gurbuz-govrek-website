import { SiteImage as Image } from "@/components/ui/SiteImage";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { whatsappUrl } from "@/config/site";

const items = ["Konu eksiklerinin tespiti", "Analitik düşünme becerisi", "Soru çözüm stratejileri", "Düzenli akademik takip", "Öğrenci seviyesine uygun çalışma planı"];

export function Mathematics() {
  return (
    <section id="matematik" className="section-space bg-cream">
      <Container>
        <div className="landscape-split grid items-center gap-12 lg:grid-cols-2 lg:gap-18">
          <Reveal className="landscape-media relative aspect-[16/11] overflow-hidden rounded-sm shadow-[0_25px_70px_rgba(7,26,51,.16)]">
            <Image src="/images/mathematics-education.png" alt="Gürbüz Gövrek dijital tahtada matematik dersi anlatıyor" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle eyebrow="Matematik Eğitimi" title="Matematikte Güçlü Temel" description="Anlaşılır anlatım, sistemli çalışma ve düzenli geri bildirimle öğrencinin matematikle kurduğu ilişkiyi güçlendiriyoruz." />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {items.map((item) => <li key={item} className="flex items-center gap-3 rounded-sm border border-navy/8 bg-white px-4 py-3.5 text-sm font-medium text-ink/75"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/16 text-blue-deep"><Check className="size-3.5" aria-hidden="true" /></span>{item}</li>)}
            </ul>
            <Button href={whatsappUrl} external variant="navy" className="mt-8">WhatsApp&apos;tan Bilgi Al</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
