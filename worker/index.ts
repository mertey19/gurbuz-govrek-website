/** Cloudflare Worker entry point for the Gürbüz Gövrek site. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { createAppointment, type D1DatabaseLike } from "../db/appointments";
import { appointmentSchema } from "../lib/validations";

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
  DB?: D1DatabaseLike;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/appointments") {
      if (request.method !== "POST") {
        return Response.json(
          { ok: false, message: "Bu adres yalnızca randevu talepleri için kullanılabilir." },
          { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } },
        );
      }

      const origin = request.headers.get("Origin");
      if (origin) {
        try {
          if (new URL(origin).host !== url.host) {
            return Response.json(
              { ok: false, message: "Randevu talebi doğrulanamadı." },
              { status: 403, headers: { "Cache-Control": "no-store" } },
            );
          }
        } catch {
          return Response.json(
            { ok: false, message: "Randevu talebi doğrulanamadı." },
            { status: 403, headers: { "Cache-Control": "no-store" } },
          );
        }
      }

      if (!request.headers.get("Content-Type")?.includes("application/json")) {
        return Response.json(
          { ok: false, message: "Geçersiz form biçimi." },
          { status: 415, headers: { "Cache-Control": "no-store" } },
        );
      }

      const bodyText = await request.text();
      if (new TextEncoder().encode(bodyText).byteLength > 16_000) {
        return Response.json(
          { ok: false, message: "Form içeriği izin verilen boyutu aşıyor." },
          { status: 413, headers: { "Cache-Control": "no-store" } },
        );
      }

      let body: unknown;
      try {
        body = JSON.parse(bodyText);
      } catch {
        return Response.json(
          { ok: false, message: "Form bilgileri okunamadı." },
          { status: 400, headers: { "Cache-Control": "no-store" } },
        );
      }

      const parsed = appointmentSchema.safeParse(body);
      if (!parsed.success) {
        return Response.json(
          { ok: false, message: "Lütfen form alanlarını kontrol edin." },
          { status: 400, headers: { "Cache-Control": "no-store" } },
        );
      }

      if (!env.DB) {
        return Response.json(
          { ok: false, message: "Randevu sistemi hazırlanıyor. Lütfen kısa süre sonra tekrar deneyin." },
          { status: 503, headers: { "Cache-Control": "no-store" } },
        );
      }

      try {
        const result = await createAppointment(env.DB, parsed.data);
        if (result.duplicate) {
          return Response.json(
            { ok: false, message: "Bu iletişim bilgileriyle kısa süre önce bir talep alındı. Lütfen bir dakika sonra tekrar deneyin." },
            { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": "60" } },
          );
        }

        return Response.json(
          {
            ok: true,
            message: "Randevu talebiniz alındı. En kısa sürede sizinle iletişime geçilecektir.",
            referenceId: result.id,
          },
          { status: 201, headers: { "Cache-Control": "no-store" } },
        );
      } catch (error) {
        console.error(
          "Appointment request could not be stored:",
          error instanceof Error ? error.message : "Unknown error",
        );
        return Response.json(
          { ok: false, message: "Randevu talebi şu anda kaydedilemedi. Lütfen telefon veya e-posta üzerinden iletişime geçin." },
          { status: 500, headers: { "Cache-Control": "no-store" } },
        );
      }
    }

    if (url.pathname === "/_vinext/image" && env.ASSETS && env.IMAGES) {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
