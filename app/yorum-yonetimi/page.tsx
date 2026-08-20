import type { Metadata } from "next";
import { AdminBackLink } from "@/components/admin/AdminPageHeader";
import { CommentAdmin } from "@/components/admin/CommentAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Öğrenci ve Veli Yorumları Yönetimi",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CommentManagementPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream/65 pb-20 pt-32">
      <Container>
        <AdminBackLink />
        <div className="mt-6">
          <CommentAdmin />
        </div>
      </Container>
    </main>
  );
}
