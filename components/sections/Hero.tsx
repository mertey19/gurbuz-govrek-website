import { SiteImage as Image } from "@/components/ui/SiteImage";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappUrl } from "@/config/site";

const trustPoints = [
  "Kişiye özel yol haritası",
  "Veriye dayalı tercih analizi",
  "Öğrenci ve veli odaklı danışmanlık",
];

export function Hero() {
  return (
    <section id="ana-sayfa" className="site-hero relative isolate flex min-h-[760px] items-center overflow-hidden bg-navy pt-28 text-white sm:min-h-[820px] lg:min-h-[850px]">
      <Image
        src="/images/hero-gurbuz-govrek.png"
        alt="Gürbüz Gövrek, matematik ve üniversite temalı bir çalışma görselinde"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_center]"
      />
      <div className="site-hero-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,51,.98)_0%,rgba(7,26,51,.94)_36%,rgba(7,26,51,.48)_68%,rgba(7,26,51,.22)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#071A33,transparent)]" />
      <div className="pointer-events-none absolute top-32 left-[8%] h-px w-24 bg-gold/70" />

      <Container className="hero-container relative z-10 py-16 sm:py-24">
        <div className="hero-content max-w-2xl">
          <Reveal>
            <p className="hero-eyebrow eyebrow text-gold-light">Matematik Öğretmeni · Tercih Uzmanı</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="hero-title mt-6 max-w-[11ch] font-serif text-5xl leading-[1.02] font-semibold text-balance sm:text-6xl lg:text-[5.2rem]">
              Doğru Tercih, <span className="text-gold-light">Güçlü Bir Gelecek</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="hero-description mt-7 max-w-xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
              Öğrencilerin akademik hedeflerini, ilgi alanlarını ve kariyer beklentilerini birlikte değerlendirerek kendilerine en uygun üniversite ve bölüm yolculuğunu planlıyoruz.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="hero-actions mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappUrl} external>WhatsApp&apos;tan Bilgi Al</Button>
              <Button href="#hizmetler" variant="outline">Hizmetleri İncele</Button>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <ul className="hero-trust mt-10 grid gap-3 text-sm text-white/72 sm:grid-cols-3 sm:gap-5">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold"><Check className="size-3" aria-hidden="true" /></span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>

      <a href="#guven" className="site-hero-scroll absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.22em] text-white/45 uppercase transition hover:text-white md:flex">
        Keşfet <ChevronDown className="size-4" aria-hidden="true" />
      </a>
    </section>
  );
}
