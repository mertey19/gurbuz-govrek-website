import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SlideAdmin } from "@/components/admin/SlideAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Meslek Slaytları Yönetimi",
  robots: { index: false, follow: false },
};

export default function ProfessionSlidesManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-28 pb-20">
      <Container className="max-w-5xl">
        <AdminPageHeader
          title="Meslek Slaytları Yönetimi"
          description="Meslekleri görsel bir seriyle anlatan karşılaştırma ve kariyer slaytlarını yönetin."
          destination="Ana sayfa · Sunum ve Seminer Köşesi · Meslek Slaytları"
          capability="Çoklu görsel yükler, slaytları sıralar ve yeni bir meslek serisi yayımlar."
        />
        <div className="mt-10"><SlideAdmin group="meslek" /></div>
      </Container>
    </main>
  );
}
