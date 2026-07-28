import type { Metadata } from "next";
import { PostAdmin } from "@/components/admin/PostAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Blog Yönetimi",
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
        <h1 className="font-serif text-3xl font-semibold text-navy">Blog Yönetimi</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Yayımlanan yazı anında blogda görünür.
        </p>
        <div className="mt-9">
          <PostAdmin />
        </div>
      </Container>
    </main>
  );
}
