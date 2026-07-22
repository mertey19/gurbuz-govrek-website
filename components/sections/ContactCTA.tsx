import { SiteImage as Image } from "@/components/ui/SiteImage";
import { Clock3, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig, whatsappUrl } from "@/config/site";

export function ContactCTA() {
  return (
    <section id="iletisim" className="relative isolate overflow-hidden bg-navy text-white">
      <Image src="/images/contact-consulting.png" alt="Gürbüz Gövrek ofisinde danışmanlık görüşmesine hazırlanıyor" fill sizes="100vw" className="-z-20 object-cover object-[66%_center]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,26,51,.98)_0%,rgba(7,26,51,.94)_46%,rgba(7,26,51,.4)_100%)]" />
      <Container className="landscape-cta py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">İletişim</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold sm:text-5xl">WhatsApp Üzerinden İletişime Geçin</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/68">Sorularınız ve danışmanlık hakkında bilgi almak için WhatsApp üzerinden doğrudan mesaj gönderebilirsiniz.</p>
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/8 px-4 py-2.5 text-sm text-white/78 backdrop-blur-sm">
            <Clock3 className="size-4 text-gold-light" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[.14em] text-white/48 uppercase">Çalışma saatleri</span>
            <span className="h-4 w-px bg-white/18" aria-hidden="true" />
            <strong className="font-semibold text-white">{siteConfig.contact.hours}</strong>
          </div>
          <div>
            <Button href={whatsappUrl} external variant="whatsapp" className="mt-6" showArrow={false}>
              <MessageCircle className="size-5" aria-hidden="true" />
              WhatsApp&apos;tan İletişime Geç
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
