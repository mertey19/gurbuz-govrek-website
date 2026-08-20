import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventsAdmin } from "@/components/admin/EventsAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Etkinlik ve Seminer Yönetimi",
  robots: { index: false, follow: false },
};

export default function EventsManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-28 pb-20">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Etkinlik ve Seminer Yönetimi"
          description="Etkinlik bölümünün ana metnini ve ziyaretçilere gösterilen etkinlik türlerini düzenleyin."
          destination="Ana sayfa · Etkinlikler"
          capability="Başlıkları değiştirir; etkinlik türü ekler, siler ve sıralar."
        />
        <div className="mt-10"><EventsAdmin /></div>
      </Container>
    </main>
  );
}
