import type { Metadata } from "next";
import { AnnouncementAdmin } from "@/components/admin/AnnouncementAdmin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Flaş Duyuru Yönetimi",
  robots: { index: false, follow: false },
};

export default function AnnouncementManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-28 pb-20">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Flaş Duyuru Yönetimi"
          description="Ana sayfanın üst kısmındaki dikkat çekici duyuru şeridini buradan güncelleyin veya geçici olarak kapatın."
          destination="Ana sayfa · Açılış görselinin hemen altı"
          capability="Duyuru rozeti, başlık, açıklama ve yönlendirme butonunu tek yerden değiştirir."
        />
        <div className="mt-10"><AnnouncementAdmin /></div>
      </Container>
    </main>
  );
}
