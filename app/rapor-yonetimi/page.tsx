import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ReportAdmin } from "@/components/admin/ReportAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Rapor ve Kılavuz Yönetimi",
  robots: { index: false, follow: false },
};

export default function ReportManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-28 pb-20">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Rapor ve Kılavuz Yönetimi"
          description="Yeni tercih raporu, araştırma veya kılavuz bağlantısı ekleyip belge için açıklayıcı bir tanıtım sayfası oluşturun."
          destination="Raporlar ve Kılavuzlar listesi ile belge tanıtım sayfası"
          capability="Belge bağlantısını, kaynağını, sayfa bilgisini ve içerik özetlerini yayımlar."
        />
        <div className="mt-10"><ReportAdmin /></div>
      </Container>
    </main>
  );
}
