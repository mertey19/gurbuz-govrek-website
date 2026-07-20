import Image from "next/image";
import { BarChart3, Building2, Filter, ListChecks, Scale, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const analysisItems = [
  { icon: BarChart3, title: "Başarı sırası analizi" },
  { icon: Building2, title: "Kontenjan değişimleri" },
  { icon: Scale, title: "Geçmiş yıl karşılaştırmaları" },
  { icon: Filter, title: "Üniversite ve bölüm filtreleme" },
  { icon: ShieldCheck, title: "Riskli, dengeli ve güvenli tercihler" },
  { icon: ListChecks, title: "Kişisel tercih listesi" },
];

export function AnalysisCenter() {
  return (
    <section id="analiz-merkezi" className="section-space overflow-hidden bg-[#06182e] text-white">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Tercih Analiz Merkezi" title="Tercihleri Tahminlerle Değil, Verilerle Değerlendirin" description="Veriler kararın yerini almaz; seçenekleri daha açık görmenizi ve riskleri doğru okumanızı sağlar." tone="light" />
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {analysisItems.map(({ icon: Icon, title }) => (
                <div key={title} className="flex min-h-20 items-center gap-3 rounded-sm border border-white/10 bg-white/[.035] p-4">
                  <Icon className="size-5 shrink-0 text-gold-light" aria-hidden="true" />
                  <span className="text-sm font-medium text-white/78">{title}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-blue-deep shadow-[0_30px_80px_rgba(0,0,0,.3)]">
              <Image src="/images/preference-analysis.png" alt="Gürbüz Gövrek ve tercih analizi yaklaşımını anlatan örnek veri panosu" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-center" />
            </div>
            <p className="mt-4 text-xs leading-5 text-white/42">Görsel, analiz yaklaşımını temsil eder. Gerçek değerlendirmeler güncel ve doğrulanmış öğrenci verileriyle kişiselleştirilir.</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
