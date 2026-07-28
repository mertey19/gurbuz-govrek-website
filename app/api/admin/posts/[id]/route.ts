import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";
import { deleteManagedPost } from "@/lib/posts/service";

/** Tek yazının silinmesi. Yetki, listeleme ucuyla aynı çerezden doğrulanır. */
export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId <= 0) {
    return NextResponse.json({ error: "Geçersiz yazı." }, { status: 400 });
  }

  try {
    const deleted = await deleteManagedPost(postId);
    if (!deleted) {
      return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Yazı silinemedi:", error);
    return NextResponse.json({ error: "Yazı silinemedi." }, { status: 500 });
  }
}
