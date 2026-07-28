import type { Metadata } from "next";
import { SlideAdmin } from "@/components/admin/SlideAdmin";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Slayt Yönetimi",
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
        <h1 className="font-serif text-3xl font-semibold text-navy">Slayt Yönetimi</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Yayımlanan seri anında sunum köşesinde görünür.
        </p>
        <div className="mt-9">
          <SlideAdmin />
        </div>
      </Container>
    </main>
  );
}
