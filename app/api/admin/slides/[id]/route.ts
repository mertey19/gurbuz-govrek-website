import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";
import { deleteManagedCollection } from "@/lib/slides/service";

/** Tek serinin silinmesi. Yetki, listeleme ucuyla aynı çerezden doğrulanır. */
export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  const collectionId = Number(id);

  if (!Number.isInteger(collectionId) || collectionId <= 0) {
    return NextResponse.json({ error: "Geçersiz seri." }, { status: 400 });
  }

  try {
    const deleted = await deleteManagedCollection(collectionId);
    if (!deleted) {
      return NextResponse.json({ error: "Seri bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Seri silinemedi:", error);
    return NextResponse.json({ error: "Seri silinemedi." }, { status: 500 });
  }
}
