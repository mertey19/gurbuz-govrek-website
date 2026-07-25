import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteNavigationGroups } from "@/config/site";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı | Gürbüz Gövrek",
  description:
    "Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Tercih danışmanlığı, matematik özel ders ve blog sayfalarına buradan ulaşabilirsiniz.",
  robots: { index: false, follow: true },
};

// Yalnızca kendi sayfası olan bağlantılar önerilir; ana sayfa çapaları (#...) atlanır.
const suggestedLinks = siteNavigationGroups
  .flatMap((group) => ("items" in group ? group.items : []))
  .filter((item) => !item.href.includes("#"))
  .slice(0, 8);

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-cream pt-20">
      <section className="border-b border-white/10 bg-navy py-20 text-white sm:py-24">
        <Container>
          <p className="eyebrow">404</p>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Aradığınız Sayfayı Bulamadık
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            Bağlantı değişmiş veya sayfa kaldırılmış olabilir. Aşağıdaki başlıklardan devam
            edebilir ya da doğrudan ana sayfaya dönebilirsiniz.
          </p>
          <Link
            href="/"
            className="mt-9 inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-4 text-sm font-bold text-navy transition hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Ana Sayfaya Dön
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mb-9 flex items-center gap-3">
            <Compass className="size-5 text-gold" aria-hidden="true" />
            <h2 className="text-sm font-extrabold tracking-[0.16em] text-blue-deep uppercase">
              Bunlar İlginizi Çekebilir
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {suggestedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-sm border border-navy/10 bg-white p-7 shadow-[0_18px_55px_rgba(7,26,51,.09)] transition hover:-translate-y-1 hover:border-gold/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <h3 className="font-serif text-xl font-semibold text-navy">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/60">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-deep">
                  İncele
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
