import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { VideoAdmin } from "@/components/admin/VideoAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Tercih Videoları Yönetimi",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function VideoManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pt-32 pb-20">
      <Container className="max-w-4xl">
        <AdminPageHeader
          title="Tercih Videoları Yönetimi"
          description="YouTube ve Instagram bağlantılarını başlık, kategori ve açıklamayla birlikte yayımlayın. Yeni video eklendiğinde ayrıca site güncellemesi yapmanız gerekmez."
          destination="Tercih Videoları sayfasında, seçtiğiniz kategori altında görünür."
          capability="Yeni video ekler; YouTube Shorts ile Instagram gönderi ve Reels bağlantılarını kabul eder; yayındaki videoları listeler ve siler."
        />
        <div className="mt-9">
          <VideoAdmin />
        </div>
      </Container>
    </main>
  );
}
