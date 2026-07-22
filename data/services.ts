import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "tercih",
    title: "Bire Bir Tercih Danışmanlığı",
    description:
      "Hedef, ilgi alanı ve başarı sırasını birlikte değerlendirerek kişisel bir tercih stratejisi oluştururuz.",
    icon: "messages",
    href: "#danismanlik",
  },
  {
    id: "universite",
    title: "Üniversite ve Bölüm Analizi",
    description:
      "Programları; akademik yapı, kontenjan, kampüs ve kariyer olanaklarıyla karşılaştırmalı olarak inceleriz.",
    icon: "university",
    href: "#analiz-merkezi",
  },
  {
    id: "matematik",
    title: "Matematik Akademik Takibi",
    description:
      "Konu eksiklerini belirler, öğrencinin seviyesine uygun çalışma planı ve soru çözüm yaklaşımı geliştiririz.",
    icon: "calculator",
    href: "#matematik",
  },
  {
    id: "kocluk",
    title: "Öğrenci Koçluğu",
    description:
      "Gerçekçi hedefler, düzenli takip ve açık geri bildirimle öğrencinin çalışma düzenini güçlendiririz.",
    icon: "compass",
    href: "#danismanlik",
  },
  {
    id: "kampus",
    title: "Kampüs ve Üniversite Tanıtımları",
    description:
      "Üniversite yaşamını, fakülteleri ve kampüs atmosferini yerinde gözlemlemeye yönelik buluşmalar planlarız.",
    icon: "map",
    href: "#kampus",
  },
  {
    id: "seminer",
    title: "Seminer ve Eğitim Programları",
    description:
      "Öğrenci ve velilere yönelik tercih, matematik, motivasyon ve kariyer odaklı programlar tasarlarız.",
    icon: "presentation",
    href: "#etkinlikler",
  },
];
