import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FaqAdmin } from "@/components/admin/FaqAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular Yönetimi",
  robots: { index: false, follow: false },
};

export default function FaqManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-28 pb-20">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Sık Sorulan Sorular Yönetimi"
          description="Ziyaretçilerin en çok merak ettiği soruları ve yanıtlarını güncel tutun."
          destination="Ana sayfa · Sık Sorulan Sorular ve arama motoru soru şeması"
          capability="Soru ekler, siler, sıralar ve yanıtları günceller."
        />
        <div className="mt-10"><FaqAdmin /></div>
      </Container>
    </main>
  );
}
