import { SiteImage as Image } from "@/components/ui/SiteImage";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { successStories } from "@/data/successStories";

export function SuccessStories() {
  return (
    <section id="basari" className="section-space bg-white">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_.7fr]">
          <SectionTitle eyebrow="Başarı Hikâyeleri" title="Her Yolculuk Kendi Başarısını Yazar" description="Kimlik ve sonuç bilgisi paylaşmadan, öğrencilerin danışmanlık sürecinde kazandığı karar netliğini ve çalışma disiplinini anlatan örnek yolculuklar." />
          <p className="border-l border-gold pl-5 text-sm leading-7 text-ink/58 lg:mb-2">Bu içerikler anonim ve düzenlenebilir örneklerdir; herhangi bir yerleşme garantisi veya doğrulanmamış başarı iddiası içermez.</p>
        </div>
        <Reveal className="landscape-tall-banner relative mt-12 aspect-[16/8] min-h-[330px] overflow-hidden rounded-sm bg-navy">
          <Image src="/images/success-stories.png" alt="Gürbüz Gövrek öğrencilerle çalışma masası etrafında" fill sizes="100vw" className="object-cover object-[62%_center] opacity-[.82]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,51,.78),rgba(7,26,51,.12))]" />
          <div className="absolute bottom-0 left-0 max-w-lg p-7 text-white sm:p-10"><p className="eyebrow">Birlikte ilerlemek</p><p className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">Doğru sorular, açık hedefler ve sürdürülebilir bir çalışma düzeni.</p></div>
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {successStories.map((story, index) => (
            <Reveal key={story.text} delay={index * 0.06}>
              <article className="h-full rounded-sm border border-navy/9 bg-cream/55 p-7">
                <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[0.18em] text-blue-deep uppercase">{story.tag}</span><Quote className="size-6 text-gold/60" aria-hidden="true" /></div>
                <p className="mt-7 font-serif text-xl leading-8 text-navy">“{story.text}”</p>
                <p className="mt-6 text-xs text-ink/44">Anonim öğrenci deneyimi</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
