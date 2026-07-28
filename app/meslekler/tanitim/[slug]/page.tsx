import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { CANONICAL_SITE_URL } from "@/config/site";
import {
  PROFESSION_CATEGORIES,
  getManagedProfession,
} from "@/lib/professions/service";

/** Panelden yayımlanan meslek tanıtımı. */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profession = await getManagedProfession(slug);

  if (!profession) {
    return { title: "Meslek bulunamadı", robots: { index: false, follow: false } };
  }

  const pageUrl = `${CANONICAL_SITE_URL}/meslekler/tanitim/${profession.slug}`;

  return {
    title: `${profession.title} — Meslek Tanıtımı`,
    description: profession.summary,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: pageUrl,
      title: profession.title,
      description: profession.summary,
    },
  };
}

/** Düz metin bloklara ayrılır; HTML kabul edilmez, metin olarak basılır. */
function parseBody(body: string) {
  return body
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith("## ")
        ? { kind: "heading" as const, text: chunk.slice(3).trim() }
        : { kind: "paragraph" as const, text: chunk },
    );
}

export default async function ProfessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profession = await getManagedProfession(slug);

  if (!profession) notFound();

  const categoryLabel =
    PROFESSION_CATEGORIES.find((item) => item.value === profession.category)?.label ??
    profession.category;

  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <article>
        <header className="border-b border-navy/10 bg-cream py-12 sm:py-16">
          <Container className="max-w-3xl">
            <nav aria-label="Sayfa yolu" className="text-xs text-muted">
              <Link href="/" className="hover:text-navy">
                Ana Sayfa
              </Link>{" "}
              <span aria-hidden="true">/</span>{" "}
              <Link href="/meslekler" className="hover:text-navy">
                Meslekler
              </Link>
            </nav>

            <p className="mt-5 text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
              {categoryLabel}
            </p>

            <h1 className="mt-3 font-serif text-3xl leading-[1.12] font-semibold text-navy sm:text-4xl">
              {profession.title}
            </h1>

            {profession.summary ? (
              <p className="mt-5 text-base leading-8 text-ink">{profession.summary}</p>
            ) : null}
          </Container>
        </header>

        <Container className="max-w-3xl">
          {profession.image ? (
            <div className="mt-10 overflow-hidden rounded-sm border border-navy/10">
              <SiteImage
                src={profession.image}
                alt={profession.imageAlt}
                width={1280}
                height={720}
                sizes="(min-width: 768px) 768px, 100vw"
                className="h-auto w-full"
              />
            </div>
          ) : null}

          <div className="mt-10 grid gap-6">
            {parseBody(profession.body).map((block, index) =>
              block.kind === "heading" ? (
                <h2
                  key={index}
                  className="mt-4 font-serif text-2xl font-semibold text-navy sm:text-3xl"
                >
                  {block.text}
                </h2>
              ) : (
                <p key={index} className="text-base leading-8 text-ink">
                  {block.text}
                </p>
              ),
            )}
          </div>

          <p className="mt-12 border-t border-navy/10 pt-6">
            <Link
              href="/meslekler"
              className="text-sm font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
            >
              ← Meslek tanıtım köşesine dön
            </Link>
          </p>
        </Container>
      </article>
    </main>
  );
}
