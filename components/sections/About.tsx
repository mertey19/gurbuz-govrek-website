import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const points = [
  "Matematik eğitimiyle güçlü akademik temel",
  "Öğrencinin hedeflerinin ayrıntılı analizi",
  "Üniversite ve bölüm alternatiflerinin karşılaştırılması",
  "Öğrenci ve velinin birlikte bilgilendirilmesi",
  "Uzun vadeli hedeflere göre tercih planı",
];

export function About() {
  return (
    <section id="hakkinda" className="section-space bg-cream">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-navy shadow-[0_30px_70px_rgba(7,26,51,.18)]">
              <Image src="/images/guidance-introduction.png" alt="Gürbüz Gövrek çalışma masasında danışmanlık notları hazırlıyor" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-[62%_center]" />
            </div>
            <div className="absolute -right-4 -bottom-5 max-w-[230px] border-l-2 border-gold bg-white p-5 shadow-xl sm:-right-8 sm:p-6">
              <p className="font-serif text-lg leading-7 text-navy">“Doğru tercih, öğrenciyi tanımakla başlar.”</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle eyebrow="Yaklaşım" title="Öğrencinin Potansiyelini Doğru Bir Yol Haritasıyla Buluşturmak" />
            <p className="mt-6 text-lg leading-8 text-ink/70">
              Tercih dönemi yalnızca puanlara bakılan kısa bir süreç değil; öğrencinin güçlü yönlerini, beklentilerini ve gelecekte kurmak istediği yaşamı birlikte değerlendiren önemli bir karar aşamasıdır.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-ink/75">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />{point}
                </li>
              ))}
            </ul>
            <blockquote className="mt-9 border-t border-navy/12 pt-7 font-serif text-2xl leading-9 text-navy">
              “Her öğrencinin hedefi, yeteneği ve yolculuğu farklıdır. Doğru tercih, öğrenciyi tanımakla başlar.”
            </blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
