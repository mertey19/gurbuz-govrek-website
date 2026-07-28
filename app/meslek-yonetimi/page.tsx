import type { Metadata } from "next";
import { ProfessionAdmin } from "@/components/admin/ProfessionAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Meslek Yönetimi",
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
        <h1 className="font-serif text-3xl font-semibold text-navy">Meslek Yönetimi</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Yayımlanan tanıtım anında meslekler bölümünde görünür.
        </p>
        <div className="mt-9">
          <ProfessionAdmin />
        </div>
      </Container>
    </main>
  );
}
