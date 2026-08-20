import type { ManagedSiteContent } from "@/lib/site-content/types";
import { faqItems } from "@/data/faq";
import { flashAnnouncement } from "@/data/flashAnnouncement";

export const managedContentDefaults: ManagedSiteContent = {
  announcement: { ...flashAnnouncement },
  faq: faqItems.map((item) => ({ ...item })),
  events: {
    eyebrow: "Seminerler ve Etkinlikler",
    title: "Bilgiyi Öğrencilerle ve Velilerle Buluşturan Etkinlikler",
    description:
      "Tercih, matematik, motivasyon ve kariyer planlamasını; anlaşılır, katılımcı ve hedef odaklı buluşmalarla ele alıyoruz.",
    items: [
      "YKS Tercih Seminerleri",
      "Üniversite Tanıtım Buluşmaları",
      "Matematik Başarı Atölyeleri",
      "Öğrenci Motivasyon Programları",
      "Veli Bilgilendirme Seminerleri",
    ],
  },
};
