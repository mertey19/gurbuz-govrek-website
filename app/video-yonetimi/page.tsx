import type { Metadata } from "next";
import { VideoAdmin } from "@/components/admin/VideoAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Video Yönetimi",
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
        <h1 className="font-serif text-3xl font-semibold text-navy">Video Yönetimi</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Eklenen videolar anında yayına girer ve tercih videoları sayfasında görünür.
        </p>
        <div className="mt-9">
          <VideoAdmin />
        </div>
      </Container>
    </main>
  );
}
