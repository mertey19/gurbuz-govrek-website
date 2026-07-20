import { SiteImage as Image } from "@/components/ui/SiteImage";
import { BookOpen, Building, MessageCircle, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const features = [
  { icon: Building, title: "Kampüs atmosferi", text: "Günlük öğrenci yaşamını yerinde hissetme" },
  { icon: BookOpen, title: "Bölüm ve fakülte tanıtımları", text: "Eğitim ortamını yakından inceleme" },
  { icon: MessageCircle, title: "Doğrudan iletişim", text: "Öğrencilerden deneyimlerini dinleme" },
  { icon: Users, title: "Üniversite yaşamı", text: "Sosyal ve akademik olanakları tanıma" },
];

export function CampusVisits() {
  return (
    <section id="kampus" className="section-space bg-cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-18">
          <Reveal className="relative aspect-[16/12] overflow-hidden rounded-sm lg:aspect-auto lg:min-h-[610px]">
            <Image src="/images/campus-visits.png" alt="Gürbüz Gövrek öğrencilerle üniversite kampüsünde görüşüyor" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[64%_center]" />
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col justify-center">
            <SectionTitle eyebrow="Kampüs Ziyaretleri" title="Üniversiteleri Yerinde Tanıyın" description="Kampüs ortamını, fakülteleri, öğrenci yaşamını ve üniversitenin sunduğu olanakları yerinde gözlemleyerek tercih sürecini daha bilinçli hale getirin." />
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, text }) => (
                <article key={title} className="border-l-2 border-gold bg-white p-5 shadow-sm">
                  <Icon className="size-5 text-blue-deep" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-lg font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/58">{text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
