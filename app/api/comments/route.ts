import { NextResponse, type NextRequest } from "next/server";
import { createSubmitterHash } from "@/lib/comment-auth";
import { COMMENT_ROLES, type CommentRole } from "@/lib/comment-types";
import {
  CommentsDatabaseNotConfiguredError,
  createPendingComment,
  listApprovedComments,
} from "@/lib/comments-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanSingleLine(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanComment(value: unknown) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r/g, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 700);
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function serviceUnavailable(error: unknown) {
  const detail =
    error instanceof CommentsDatabaseNotConfiguredError
      ? "Yorum veritabanı henüz bağlanmadı."
      : "Yorum sistemi şu anda kullanılamıyor.";

  return NextResponse.json(
    { error: detail },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET() {
  try {
    const comments = await listApprovedComments();
    return NextResponse.json(
      { comments },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Approved comments could not be loaded", error);
    return serviceUnavailable(error);
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Geçersiz form verisi." }, { status: 400 });
  }

  // Botların doldurduğu görünmez bal küpü alanı.
  if (cleanSingleLine(payload.website, 120)) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const name = cleanSingleLine(payload.name, 80);
  const role = cleanSingleLine(payload.role, 24) as CommentRole;
  const body = cleanComment(payload.body);
  const consent = payload.consent === true;

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Lütfen adınızı en az 2 karakter olacak şekilde yazın." },
      { status: 400 },
    );
  }

  if (!COMMENT_ROLES.includes(role)) {
    return NextResponse.json(
      { error: "Lütfen ziyaretçi türünü seçin." },
      { status: 400 },
    );
  }

  if (body.length < 10) {
    return NextResponse.json(
      { error: "Yorumunuz en az 10 karakter olmalıdır." },
      { status: 400 },
    );
  }

  if (!consent) {
    return NextResponse.json(
      { error: "Yorumun kaydedilmesi için onay kutusunu işaretleyin." },
      { status: 400 },
    );
  }

  const submitterHash = createSubmitterHash(request);
  if (!submitterHash) {
    return NextResponse.json(
      { error: "Yorum güvenlik ayarları henüz tamamlanmadı." },
      { status: 503 },
    );
  }

  try {
    const result = await createPendingComment({
      name,
      role,
      body,
      submitterHash,
    });

    if (!result.ok && result.reason === "rate-limit") {
      return NextResponse.json(
        {
          error:
            "Çok kısa sürede çok fazla yorum gönderdiniz. Lütfen daha sonra tekrar deneyin.",
        },
        { status: 429 },
      );
    }

    if (!result.ok && result.reason === "duplicate") {
      return NextResponse.json(
        { error: "Bu yorum daha önce alınmış görünüyor." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Yorumunuz alındı. Onaylandıktan sonra yayınlanacaktır.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Comment could not be created", error);
    return serviceUnavailable(error);
  }
}

