import { Calculator, Compass, Map, MessageSquareText, Presentation, School, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/data/services";

const icons = { messages: MessageSquareText, university: School, calculator: Calculator, compass: Compass, map: Map, presentation: Presentation };

export function Services() {
  return (
    <section id="hizmetler" className="section-space bg-white">
      <Container>
        <SectionTitle eyebrow="Hizmetler" title="Her Adımda Açık, Kişisel ve Güvenilir Rehberlik" description="Akademik temelden üniversite tercihine kadar öğrencinin ihtiyaç duyduğu desteği, birbirini tamamlayan çalışma alanlarıyla planlıyoruz." align="center" />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.id} delay={(index % 3) * 0.06}>
                <article className="group relative min-h-[290px] overflow-hidden rounded-sm border border-navy/10 bg-cream/55 p-7 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-[0_18px_50px_rgba(7,26,51,.10)] sm:p-8">
                  <div className="flex size-12 items-center justify-center rounded-sm bg-navy text-gold-light"><Icon aria-hidden="true" className="size-6" /></div>
                  <h3 className="mt-7 font-serif text-2xl font-semibold leading-tight text-navy">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/64">{service.description}</p>
                  <a href={service.href} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">Detayları Gör <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a>
                  <span className="absolute right-0 bottom-0 h-px w-16 bg-gold transition-all group-hover:w-28" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
