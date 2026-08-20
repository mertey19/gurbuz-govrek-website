import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  FileText,
  MessageSquareQuote,
  Presentation,
  Video,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Site Yönetim Merkezi",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const PANELS = [
  {
    href: "/yorum-yonetimi",
    title: "Öğrenci ve Veli Yorumları",
    description: "Yeni yorumları onaylayın, yayındaki yorumları düzenleyin veya kaldırın.",
    destination: "Ana sayfa · Öğrenci ve Veli Yorumları",
    icon: MessageSquareQuote,
  },
  {
    href: "/blog-yonetimi",
    title: "Blog ve Rehber Yazıları",
    description: "Yeni rehber yazısı yayımlayın ve panelden eklenen yazıları yönetin.",
    destination: "Blog ve ilgili içerik sayfaları",
    icon: FileText,
  },
  {
    href: "/video-yonetimi",
    title: "Tercih Videoları",
    description: "YouTube veya Instagram videosu ekleyin ve yayındaki videoları yönetin.",
    destination: "Tercih Videoları sayfası",
    icon: Video,
  },
  {
    href: "/meslek-yonetimi",
    title: "Meslek Tanıtım Yazıları",
    description: "Puan türüne göre yeni meslek tanıtımı, açıklama ve görsel ekleyin.",
    destination: "Meslek Tanıtım Köşesi",
    icon: BriefcaseBusiness,
  },
  {
    href: "/slayt-yonetimi",
    title: "Sunum ve Seminer Serileri",
    description: "Birden fazla görselden oluşan sunum veya seminer serisi yayımlayın.",
    destination: "Ana sayfa · Sunumlar",
    icon: Presentation,
  },
  {
    href: "/yks-istatistikleri-yonetimi",
    title: "YKS İstatistikleri",
    description: "Yeni YKS verisi ve istatistik görsellerini ayrı bir seri olarak ekleyin.",
    destination: "Ana sayfa · YKS İstatistikleri",
    icon: ChartNoAxesCombined,
    isNew: true,
  },
] as const;

export default function SiteManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-32 pb-20">
      <Container className="max-w-6xl">
        <p className="text-[11px] font-extrabold tracking-[.18em] text-gold uppercase">
          Yönetim alanı
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-navy sm:text-5xl">
          Site Yönetim Merkezi
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base">
          Sitede değiştirmek istediğiniz alanı seçin. Her panelin hangi sayfayı
          etkilediği ve hangi işlemleri yaptığı kartın üzerinde açıklanmıştır.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PANELS.map((panel) => {
            const Icon = panel.icon;
            return (
              <Link
                key={panel.href}
                href={panel.href}
                className="group flex min-h-64 flex-col rounded-sm border border-navy/10 bg-white p-6 shadow-[0_12px_35px_rgba(11,31,58,.06)] transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_20px_45px_rgba(11,31,58,.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-navy text-gold-light">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {"isNew" in panel ? (
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-extrabold tracking-[.12em] text-navy uppercase">
                      Yeni panel
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-5 font-serif text-2xl font-semibold text-navy">
                  {panel.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">{panel.description}</p>
                <p className="mt-4 text-xs font-bold leading-5 text-blue-deep">
                  Göründüğü yer: {panel.destination}
                </p>

                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-navy">
                  Paneli aç
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-sm border border-blue-deep/15 bg-blue-deep/[.055] p-5 text-sm leading-7 text-navy">
          Tüm paneller aynı yönetici oturumunu kullanır. Oturum kapalıysa önce
          {" "}
          <Link href="/yorum-yonetimi" className="font-bold text-blue-deep underline underline-offset-4">
            Öğrenci ve Veli Yorumları panelinden giriş yapın
          </Link>
          .
        </div>
      </Container>
    </main>
  );
}
