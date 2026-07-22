import { BookOpenText, GraduationCap, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const educationJourney = [
  { institution: "Hacıhamzalı Köyü", field: "Eğitim yolculuğunun ilk durağı" },
  { institution: "Cengiz Topel Lisesi", field: "Ortaöğretim" },
  { institution: "Tarsus Endüstri Meslek Lisesi", field: "Teknik eğitim" },
  { institution: "Yıldız Teknik Üniversitesi", field: "Elektrik Mühendisliği" },
  { institution: "Pamukkale Üniversitesi", field: "Eğitim Fakültesi" },
  { institution: "Çukurova Üniversitesi", field: "Hukuk Fakültesi" },
] as const;

export function Biography() {
  return (
    <section id="ozgecmis" className="section-space bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionTitle
                eyebrow="Özgeçmiş"
                title="Tarsus’tan Başlayan Çok Yönlü Bir Eğitim Yolculuğu"
                description="Teknik disiplin, eğitim ve hukuk alanlarıyla şekillenen öğrenme yolculuğu; bugün öğrencilere sunulan bütüncül rehberlik yaklaşımının temelini oluşturuyor."
              />
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-navy/10 bg-cream px-5 py-3 text-sm font-bold text-navy">
                <MapPin className="size-4 text-gold" aria-hidden="true" />
                Tarsus
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute top-8 bottom-8 left-6 hidden w-px bg-gold/35 sm:block" aria-hidden="true" />
            <ol className="grid gap-4">
              {educationJourney.map(({ institution, field }, index) => (
                <Reveal key={institution} delay={index * 0.04}>
                  <li className="relative rounded-sm border border-navy/9 bg-cream/55 p-6 shadow-[0_12px_35px_rgba(7,26,51,.055)] sm:ml-14 sm:p-7">
                    <span className="absolute top-6 -left-[4.55rem] hidden size-12 items-center justify-center rounded-full border border-gold/55 bg-white font-serif text-sm font-semibold text-navy shadow-sm sm:flex">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-start gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-navy text-gold-light">
                        {index < 3 ? (
                          <BookOpenText className="size-5" aria-hidden="true" />
                        ) : (
                          <GraduationCap className="size-5" aria-hidden="true" />
                        )}
                      </span>
                      <div>
                        <p className="text-[10px] font-bold tracking-[.17em] text-blue-deep/55 uppercase">Eğitim Durağı</p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold text-navy">{institution}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink/58">{field}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
