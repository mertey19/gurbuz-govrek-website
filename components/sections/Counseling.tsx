import { SiteImage as Image } from "@/components/ui/SiteImage";
import { ArrowRight, BriefcaseBusiness, Goal, HeartHandshake, MessagesSquare, Radar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { whatsappUrl } from "@/config/site";

const features = [
  { icon: Radar, title: "İlgi ve yetenek analizi" },
  { icon: Goal, title: "Gerçekçi hedef belirleme" },
  { icon: BriefcaseBusiness, title: "Üniversite ve kariyer seçenekleri" },
  { icon: MessagesSquare, title: "Öğrenci-veli iletişimi" },
  { icon: HeartHandshake, title: "Düzenli takip ve geri bildirim" },
];

export function Counseling() {
  return (
    <section id="danismanlik" className="section-space bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <Reveal>
            <SectionTitle eyebrow="Birebir Öğrenci Danışmanlığı" title="Her Öğrenci İçin Kişiselleştirilmiş Danışmanlık" description="Hazır reçeteler yerine öğrenciyi dinleyen, güçlü yönleri görünür kılan ve seçenekleri anlaşılır biçimde karşılaştıran bir süreç." />
            <div className="mt-9 divide-y divide-navy/10 border-y border-navy/10">
              {features.map(({ icon: Icon, title }, index) => (
                <div key={title} className="group flex items-center gap-4 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cream text-gold"><Icon className="size-5" aria-hidden="true" /></span>
                  <p className="font-medium text-navy">{title}</p>
                  <span className="ml-auto text-xs text-ink/35">0{index + 1}</span>
                </div>
              ))}
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">WhatsApp&apos;tan görüşün <ArrowRight className="size-4" aria-hidden="true" /></a>
          </Reveal>
          <Reveal delay={0.08} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream shadow-[0_25px_70px_rgba(7,26,51,.16)]">
              <Image src="/images/one-to-one-consulting.png" alt="Gürbüz Gövrek öğrencilerle birebir danışmanlık görüşmesinde" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-[66%_center]" />
            </div>
            <div className="absolute -bottom-6 -left-5 hidden max-w-xs bg-navy p-6 text-white shadow-xl sm:block">
              <p className="font-serif text-xl leading-7">Hedefleri dinleyen, seçenekleri açıklayan, kararı birlikte güçlendiren bir yaklaşım.</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
