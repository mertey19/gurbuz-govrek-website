import type { Metadata } from "next";
import { CommentAdmin } from "@/components/admin/CommentAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Yorum Yönetimi",
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
        <CommentAdmin />
      </Container>
    </main>
  );
}

