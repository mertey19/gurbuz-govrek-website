import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";
import type { CommentStatus } from "@/lib/comment-types";
import { deleteComment, updateCommentStatus } from "@/lib/comments-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function getValidId(context: RouteContext) {
  const { id } = await context.params;
  return /^\d+$/.test(id) ? id : null;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const id = await getValidId(context);
  if (!id) {
    return NextResponse.json({ error: "Geçersiz yorum kimliği." }, { status: 400 });
  }

  let status: CommentStatus;
  try {
    const payload = (await request.json()) as { status?: unknown };
    status = payload.status as CommentStatus;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!["pending", "approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Geçersiz yorum durumu." }, { status: 400 });
  }

  try {
    const updated = await updateCommentStatus(id, status);
    return updated
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Yorum bulunamadı." }, { status: 404 });
  } catch (error) {
    console.error("Comment status could not be updated", error);
    return NextResponse.json({ error: "Yorum güncellenemedi." }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const id = await getValidId(context);
  if (!id) {
    return NextResponse.json({ error: "Geçersiz yorum kimliği." }, { status: 400 });
  }

  try {
    const deleted = await deleteComment(id);
    return deleted
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Yorum bulunamadı." }, { status: 404 });
  } catch (error) {
    console.error("Comment could not be deleted", error);
    return NextResponse.json({ error: "Yorum silinemedi." }, { status: 503 });
  }
}

