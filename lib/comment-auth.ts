import {
  createHash,
  createHmac,
  timingSafeEqual,
} from "node:crypto";
import type { NextRequest } from "next/server";

export const COMMENT_ADMIN_COOKIE = "comment_admin";
export const COMMENT_ADMIN_COOKIE_MAX_AGE = 60 * 60 * 12;

function digest(value: string) {
  return createHash("sha256").update(value, "utf8").digest();
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(digest(left), digest(right));
}

export function isCommentAdminConfigured() {
  return Boolean(
    process.env.COMMENTS_ADMIN_PASSWORD &&
      process.env.COMMENTS_COOKIE_SECRET,
  );
}

function getCookieSecret() {
  return process.env.COMMENTS_COOKIE_SECRET || null;
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.COMMENTS_ADMIN_PASSWORD;
  return Boolean(expected && safeEqual(password, expected));
}

export function createAdminCookieToken() {
  const secret = getCookieSecret();
  if (!secret) return null;

  return createHmac("sha256", secret)
    .update("gurbuz-govrek-comments-admin-v1", "utf8")
    .digest("hex");
}

export function isAdminRequest(request: NextRequest) {
  const supplied = request.cookies.get(COMMENT_ADMIN_COOKIE)?.value;
  const expected = createAdminCookieToken();
  return Boolean(supplied && expected && safeEqual(supplied, expected));
}

export function createSubmitterHash(request: NextRequest) {
  const secret = getCookieSecret();
  if (!secret) return null;

  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = request.headers.get("user-agent")?.slice(0, 200) || "";

  return createHmac("sha256", secret)
    .update(`${ip}|${userAgent}`, "utf8")
    .digest("hex");
}

