import { ArrowUpRight, BookOpenCheck, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { careerResources } from "@/data/careerResources";

const groups = [
  {
    category: "TYT" as const,
    title: "TYT Meslekleri",
    description: "İki yıllık programlar ve TYT puanıyla öğrenci alan alanlara yönelik meslek tanıtım dosyaları.",
  },
  {
    category: "SÖZ" as const,
    title: "Sözel Alan Meslekleri",
    description: "Sözel puan türüyle ilişkili öğretmenlik, iletişim, turizm ve yaratıcı meslekleri yakından tanıyın.",
  },
];

export function CareerCorner() {
  return (
    <section id="meslek-kosesi" className="section-space overflow-hidden bg-white">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Meslek Tanıtım Köşesi"
            title="Meslekleri Karar Vermeden Önce Yakından Tanıyın"
            description="Mesleklerin tanımı, görevleri, çalışma alanları ve eğitim süreçleri hakkında hazırlanan kaynakları inceleyin. Belgeler yeni sekmede PDF olarak açılır."
            align="center"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-bold tracking-[.1em] uppercase">
            <span className="rounded-full border border-navy/10 bg-cream px-4 py-2 text-blue-deep">25 meslek dosyası</span>
            <span className="rounded-full border border-navy/10 bg-cream px-4 py-2 text-blue-deep">2 kategori</span>
          </div>
        </Reveal>

        <div className="mt-14 space-y-14">
          {groups.map((group, groupIndex) => {
            const resources = careerResources.filter((resource) => resource.category === group.category);

            return (
              <Reveal key={group.category} delay={groupIndex * 0.05}>
                <div className="mb-6 flex flex-col gap-4 border-b border-navy/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold-light">
                      <BookOpenCheck className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold tracking-[.17em] text-blue-deep uppercase">{group.category}</p>
                      <h3 className="mt-1 font-serif text-2xl font-semibold text-navy sm:text-3xl">{group.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/58">{group.description}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-ink/50">{resources.length} PDF</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {resources.map((resource) => (
                    <a
                      key={resource.href}
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex min-h-44 flex-col rounded-sm border border-navy/10 bg-cream/55 p-5 transition hover:-translate-y-1 hover:border-gold/60 hover:bg-white hover:shadow-[0_18px_45px_rgba(7,26,51,.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-navy px-2.5 py-1 text-[9px] font-bold tracking-[.15em] text-gold-light uppercase">{resource.category}</span>
                        <FileText className="size-5 text-blue-deep/55 transition group-hover:text-blue-deep" aria-hidden="true" />
                      </div>
                      <h4 className="mt-5 font-serif text-lg leading-6 font-semibold text-navy">{resource.title}</h4>
                      <span className="mt-auto flex items-center gap-2 pt-5 text-xs font-bold text-blue-deep">
                        PDF&apos;yi İncele
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
