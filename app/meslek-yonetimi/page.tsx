import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProfessionAdmin } from "@/components/admin/ProfessionAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Meslek Tanıtım Yazıları Yönetimi",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ProfessionManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-32 pb-20">
      <Container className="max-w-4xl">
        <AdminPageHeader
          title="Meslek Tanıtım Yazıları Yönetimi"
          description="Sitede bulunmayan bir meslek için puan türü, özet, ayrıntılı tanıtım metni ve isteğe bağlı görsel ekleyin."
          destination="Meslek Tanıtım Köşesinde, seçtiğiniz puan türünün altında ayrı bir meslek sayfası olarak görünür."
          capability="Yeni meslek tanıtım sayfası oluşturur; başlık, ara başlıklar, açıklama ve görseli yönetir; panelden eklenen tanıtımları listeler ve siler."
        />
        <div className="mt-9">
          <ProfessionAdmin />
        </div>
      </Container>
    </main>
  );
}
