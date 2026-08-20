import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostAdmin } from "@/components/admin/PostAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Blog ve Rehber Yazıları Yönetimi",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PostManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-32 pb-20">
      <Container className="max-w-4xl">
        <AdminPageHeader
          title="Blog ve Rehber Yazıları Yönetimi"
          description="Tercih, üniversite, meslek ve eğitim konularında yeni bir rehber yazısı hazırlayıp yayımlayın."
          destination="Blog liste sayfasında ve yazının kendine ait bağlantısında görünür."
          capability="Başlık, özet, yazı metni, yayın tarihi ve görsel içeren yeni blog yazısı oluşturur; panelden eklenen yazıları listeler ve siler."
        />
        <div className="mt-9">
          <PostAdmin />
        </div>
      </Container>
    </main>
  );
}
