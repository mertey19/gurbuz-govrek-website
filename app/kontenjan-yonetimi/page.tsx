import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SlideAdmin } from "@/components/admin/SlideAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Kontenjan Analizleri Yönetimi",
  robots: { index: false, follow: false },
};

export default function QuotaManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-28 pb-20">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Kontenjan Analizleri Yönetimi"
          description="Yıllara ve puan türlerine göre hazırlanan kontenjan karşılaştırma görsellerini ayrı seriler halinde yayımlayın."
          destination="Ana sayfa · YKS İstatistikleri ve Kontenjan Analizleri"
          capability="Kontenjan görsellerini yükler, sıralar ve YKS istatistik alanında yayımlar."
        />
        <div className="mt-10"><SlideAdmin group="kontenjan" /></div>
      </Container>
    </main>
  );
}
