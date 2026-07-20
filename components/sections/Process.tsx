import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const steps = [
  { title: "Öğrenciyi Tanıma", text: "İlgi alanlarını, akademik birikimi ve karar sürecindeki öncelikleri birlikte netleştiririz." },
  { title: "Hedef ve Beklenti Analizi", text: "Gerçekçi hedef aralığını, şehir ve kampüs beklentilerini, kariyer yönelimlerini belirleriz." },
  { title: "Üniversite ve Bölüm Karşılaştırması", text: "Programları güncel veriler, ders içeriği, kontenjan ve yaşam olanaklarıyla karşılaştırırız." },
  { title: "Kişisel Tercih Yol Haritası", text: "Riskli, dengeli ve güvenli seçeneklerden oluşan açıklanabilir bir karar planı oluştururuz." },
];

export function Process() {
  return (
    <section id="surec" className="section-space overflow-hidden bg-navy text-white">
      <Container>
        <SectionTitle eyebrow="Danışmanlık Süreci" title="Belirsizlikten Güvenli Karara, Dört Açık Adım" description="Her adım, öğrencinin kendi kararını daha bilinçli verebilmesi için şeffaf ve birlikte yürütülür." tone="light" />
        <div className="relative mt-14 grid gap-0 lg:grid-cols-4">
          <div className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-white/16 lg:block" />
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.07}>
              <article className="relative border-l border-white/15 pb-10 pl-16 lg:border-0 lg:px-5 lg:pb-0 lg:pl-0">
                <span className="absolute top-0 left-0 flex size-14 -translate-x-1/2 items-center justify-center rounded-full border border-gold/60 bg-navy font-serif text-xl text-gold-light lg:relative lg:left-auto lg:mx-0 lg:translate-x-0">0{index + 1}</span>
                <h3 className="mt-0 font-serif text-2xl font-semibold lg:mt-7">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
