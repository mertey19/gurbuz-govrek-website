import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";

/**
 * Görsel tablo sayfaları için ortak düzen.
 *
 * Görseller dikey (3:4) ve veri yoğun; ızgarada küçük resim, tıklanınca tam
 * boyut açılır. Büyütme penceresi yerine yeni sekme kullanılıyor — tabloyu
 * telefonda yakınlaştırarak okumak isteyen kullanıcı için tarayıcının kendi
 * yakınlaştırması her özel bileşenden iyi çalışıyor.
 */
export type BoardImage = {
  src: string;
  thumb: string;
  title: string;
  alt: string;
};

export function ImageBoard({
  title,
  lead,
  breadcrumb,
  images,
  footnote,
}: {
  title: string;
  lead: string;
  breadcrumb: string;
  images: readonly BoardImage[];
  footnote: string;
}) {
  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <header className="border-b border-navy/10 bg-cream py-12 sm:py-16">
        <Container className="max-w-5xl">
          <nav aria-label="Sayfa yolu" className="text-xs text-muted">
            <Link href="/" className="hover:text-navy">
              Ana Sayfa
            </Link>{" "}
            <span aria-hidden="true">/</span> {breadcrumb}
          </nav>
          <h1 className="mt-5 max-w-3xl font-serif text-3xl leading-[1.1] font-semibold text-navy sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{lead}</p>
        </Container>
      </header>

      <section aria-labelledby="gorsel-listesi" className="py-12 sm:py-16">
        <Container className="max-w-5xl">
          <h2 id="gorsel-listesi" className="sr-only">
            Görseller
          </h2>

          <ul className="depth-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <li key={image.src}>
                <a
                  href={image.src}
                  target="_blank"
                  rel="noopener"
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                >
                  <div className="depth-card overflow-hidden rounded-sm border border-navy/10 group-hover:border-gold">
                    <SiteImage
                      src={image.thumb}
                      alt={image.alt}
                      width={520}
                      height={693}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      /* İlk satır görünür alanda; kalanlar kaydırınca yüklenir. */
                      loading={index < 3 ? "eager" : "lazy"}
                      className="h-auto w-full"
                    />
                  </div>
                  <h3 className="mt-3 text-sm leading-6 font-bold text-navy group-hover:text-blue-deep">
                    {image.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Tam boyutta açmak için tıklayın
                  </p>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-12 border-t border-navy/10 pt-6 text-xs leading-6 text-muted">
            {footnote}
          </p>
        </Container>
      </section>
    </main>
  );
}
