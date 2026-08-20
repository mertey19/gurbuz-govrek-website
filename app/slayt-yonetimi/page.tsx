import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SlideAdmin } from "@/components/admin/SlideAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sunum ve Seminer Serileri Yönetimi",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function SlideManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-32 pb-20">
      <Container className="max-w-4xl">
        <AdminPageHeader
          title="Sunum ve Seminer Serileri Yönetimi"
          description="Seminer, tercih rehberi veya genel bilgilendirme görsellerini tek bir başlık altında, doğru sırayla yayımlayın."
          destination="Ana sayfadaki Sunum ve Seminer Köşesinin “Sunumlar” bölümünde görünür."
          capability="Çoklu görsel yükler; slayt sırasını, her görselin başlığını ve erişilebilir açıklamasını düzenler; yayımlanan serileri listeler ve siler."
        />
        <div className="mt-9">
          <SlideAdmin group="sunum" />
        </div>
      </Container>
    </main>
  );
}
