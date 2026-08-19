import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL } from "@/config/site";
import { VIDEO_CATEGORIES, listVideos } from "@/lib/videos/service";

const title = "Tercih Videoları";
const description =
  "Tercih süreci, meslekler ve üniversiteler üzerine hazırlanan video anlatımlar. Gürbüz Gövrek’in tercih rehberi videoları.";
const pageUrl = `${CANONICAL_SITE_URL}/tercih-videolari`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "website", locale: "tr_TR", url: pageUrl, title, description },
};

// Videolar yönetim panelinden eklenir; sayfa her istekte güncel listeyi okur.
export const dynamic = "force-dynamic";

export default async function TercihVideolariPage() {
  const videos = await listVideos();

  const grouped = VIDEO_CATEGORIES.map((category) => ({
    ...category,
    items: videos.filter((video) => video.category === category.value),
  })).filter((group) => group.items.length > 0);

  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <header className="border-b border-navy/10 bg-cream py-12 sm:py-16">
        <Container className="max-w-4xl">
          <nav aria-label="Sayfa yolu" className="text-xs text-muted">
            <Link href="/" className="hover:text-navy">
              Ana Sayfa
            </Link>{" "}
            <span aria-hidden="true">/</span> Tercih Videoları
          </nav>
          <h1 className="mt-5 font-serif text-3xl leading-[1.1] font-semibold text-navy sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Tercih sürecini, meslekleri ve üniversiteleri anlatan video anlatımlar. Videolar
            YouTube ve Instagram üzerinden oynatılır.
          </p>
        </Container>
      </header>

      <div className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          {videos.length === 0 ? (
            <div className="rounded-sm border border-navy/10 bg-cream/70 px-6 py-10 text-center">
              <p className="font-serif text-xl font-semibold text-navy">
                Henüz video eklenmedi
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
                Tercih dönemi boyunca video anlatımlar bu sayfada yayımlanacak.
              </p>
            </div>
          ) : (
            <div className="grid gap-12">
              {grouped.map((group) => (
                <section key={group.value} aria-labelledby={`kategori-${group.value}`}>
                  <h2
                    id={`kategori-${group.value}`}
                    className="font-serif text-2xl font-semibold text-navy"
                  >
                    {group.label}
                  </h2>

                  <ul className="mt-6 grid gap-8 sm:grid-cols-2">
                    {group.items.map((video) => (
                      <li key={video.id}>
                        {/*
                          16:9 oranı önceden ayrılır; oynatıcı yüklenirken sayfa
                          zıplamasın diye yükseklik baştan bellidir.
                        */}
                        <div
                          className={`overflow-hidden rounded-sm border border-navy/10 bg-navy ${
                            video.provider === "instagram"
                              ? "mx-auto aspect-[4/5] w-full max-w-md"
                              : "aspect-video"
                          }`}
                        >
                          <iframe
                            src={
                              video.provider === "youtube"
                                ? `https://www.youtube-nocookie.com/embed/${video.videoId}`
                                : `https://www.instagram.com/${video.instagramType}/${video.videoId}/embed/captioned/`
                            }
                            title={video.title}
                            loading="lazy"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full border-0"
                          />
                        </div>

                        <h3 className="mt-4 font-serif text-lg leading-tight font-semibold text-navy">
                          {video.title}
                        </h3>
                        {video.description ? (
                          <p className="mt-2 text-sm leading-6 text-muted">
                            {video.description}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </Container>
      </div>
    </main>
  );
}
