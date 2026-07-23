import { NextResponse, type NextRequest } from "next/server";
import {
  COMMENT_ADMIN_COOKIE,
  COMMENT_ADMIN_COOKIE_MAX_AGE,
  createAdminCookieToken,
  isCommentAdminConfigured,
  verifyAdminPassword,
} from "@/lib/comment-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isCommentAdminConfigured()) {
    return NextResponse.json(
      { error: "Yorum yönetimi için gerekli güvenlik ayarları yapılmamış." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const payload = (await request.json()) as { password?: unknown };
    password = typeof payload.password === "string" ? payload.password : "";
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Parola hatalı." }, { status: 401 });
  }

  const token = createAdminCookieToken();
  if (!token) {
    return NextResponse.json(
      { error: "Güvenlik ayarları tamamlanmamış." },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COMMENT_ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: COMMENT_ADMIN_COOKIE_MAX_AGE,
  });
  return response;
}

