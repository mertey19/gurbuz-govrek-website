import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SlideAdmin } from "@/components/admin/SlideAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "YKS İstatistikleri Yönetimi",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function YksStatisticsManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-32 pb-20">
      <Container className="max-w-4xl">
        <AdminPageHeader
          title="YKS İstatistikleri Yönetimi"
          description="Test ortalamaları, aday ve kontenjan sayıları, başarı sırası tahminleri veya karşılaştırma tablolarını yeni bir YKS veri serisi olarak yayımlayın."
          destination="Ana sayfadaki Sunum ve Seminer Köşesinin “YKS İstatistikleri” bölümünde görünür."
          capability="Birden fazla istatistik görselini tek seride toplar; görsellerin sırasını, başlığını ve açıklamasını düzenler; yalnızca YKS istatistik serilerini listeler ve siler."
        />
        <div className="mt-9">
          <SlideAdmin group="istatistik" />
        </div>
      </Container>
    </main>
  );
}
