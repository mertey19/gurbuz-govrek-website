import { NextResponse, type NextRequest } from "next/server";
import { blogPosts } from "@/data/blogPosts";
import { isAdminRequest } from "@/lib/comment-auth";
import { createManagedPost, listManagedPosts, slugify } from "@/lib/posts/service";

/**
 * Panelden blog yazısı yönetimi.
 *
 * Yetki, yorum panelindeki oturumla aynı çerezden doğrulanır.
 */
export const dynamic = "force-dynamic";

const MAX_TITLE = 140;
const MAX_DESCRIPTION = 320;
const MAX_BODY = 40000;

/**
 * Koddaki yazılarla aynı adresin alınması, o sayfaların gölgelenmesine yol açar.
 * `ilceler` bir yazı değil ama `/blog/ilceler` listesi orada duruyor; panelden
 * o adres alınırsa yazı hiç açılmaz, çünkü açık segment önce eşleşir.
 */
const RESERVED_SLUGS = new Set<string>([
  ...blogPosts.map((post) => post.slug),
  "ilceler",
]);

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  return NextResponse.json({ posts: await listManagedPosts() });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const text = (key: string) =>
    typeof payload[key] === "string" ? (payload[key] as string).trim() : "";

  const title = text("title");
  if (!title) {
    return NextResponse.json({ error: "Başlık gerekli." }, { status: 400 });
  }
  if (title.length > MAX_TITLE) {
    return NextResponse.json(
      { error: `Başlık en fazla ${MAX_TITLE} karakter olabilir.` },
      { status: 400 },
    );
  }

  const body = text("body");
  if (!body) {
    return NextResponse.json({ error: "Yazı metni gerekli." }, { status: 400 });
  }
  if (body.length > MAX_BODY) {
    return NextResponse.json({ error: "Yazı çok uzun." }, { status: 400 });
  }

  const description = text("description");
  if (description.length > MAX_DESCRIPTION) {
    return NextResponse.json(
      { error: `Özet en fazla ${MAX_DESCRIPTION} karakter olabilir.` },
      { status: 400 },
    );
  }

  const slug = text("slug") ? slugify(text("slug")) : slugify(title);
  if (!slug) {
    return NextResponse.json(
      { error: "Başlıktan adres üretilemedi. Latin harf içeren bir başlık girin." },
      { status: 400 },
    );
  }
  if (RESERVED_SLUGS.has(slug)) {
    return NextResponse.json(
      { error: `“${slug}” adresi mevcut bir yazıya ait. Başlığı değiştirin.` },
      { status: 409 },
    );
  }

  // Görsel ya yüklenen adres ya da sitedeki mevcut bir dosya olabilir.
  const image = text("image") || "/images/guidance-introduction.webp";
  const isUploaded = image.startsWith("https://") && image.includes(".blob.vercel-storage.com");
  if (!isUploaded && !image.startsWith("/images/")) {
    return NextResponse.json({ error: "Geçersiz görsel adresi." }, { status: 400 });
  }

  try {
    const post = await createManagedPost({
      slug,
      title,
      description,
      category: text("category") || "Genel",
      body,
      image,
      imageAlt: text("imageAlt") || title,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Yazı kaydedilemedi:", error);
    return NextResponse.json({ error: "Yazı kaydedilemedi." }, { status: 500 });
  }
}
