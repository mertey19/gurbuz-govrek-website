"use client";

import {
  CheckCircle2,
  MessageSquareText,
  Quote,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  COMMENT_ROLES,
  type PublicComment,
} from "@/lib/comment-types";

type FormState = {
  name: string;
  role: (typeof COMMENT_ROLES)[number];
  body: string;
  website: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  role: "Öğrenci",
  body: "",
  website: "",
  consent: false,
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function Comments() {
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadComments = useCallback(async () => {
    try {
      const response = await fetch("/api/comments", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { comments?: PublicComment[] };
      setComments(data.comments ?? []);
    } catch {
      // Gönderim sırasında API, kullanıcıya daha ayrıntılı hata gösterecek.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadComments();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadComments]);

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormMessage(null);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Yorumunuz gönderilemedi.");
      }

      setForm(initialForm);
      setFormMessage({
        type: "success",
        text:
          data.message ||
          "Yorumunuz alındı. Onaylandıktan sonra yayınlanacaktır.",
      });
    } catch (error) {
      setFormMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Yorumunuz gönderilemedi.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="yorumlar" className="section-space bg-cream/65">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionTitle
              eyebrow="Öğrenci ve Veli Görüşleri"
              title="Deneyiminizi Paylaşın"
              description="Görüşünüz, bu yolculuğa başlayacak öğrenci ve velilere yol gösterebilir. Gönderilen yorumlar, güvenli bir ortam için yayınlanmadan önce incelenir."
            />

            <div className="mt-9 flex gap-4 rounded-sm border border-gold/35 bg-white p-5">
              <ShieldCheck
                className="mt-0.5 size-6 shrink-0 text-gold"
                aria-hidden="true"
              />
              <div>
                <p className="font-bold text-navy">Güvenli ve kontrollü paylaşım</p>
                <p className="mt-1 text-sm leading-6 text-ink/62">
                  E-posta adresiniz istenmez. Yorumunuz onaylandıktan sonra
                  yalnızca adınız, ziyaretçi türünüz ve görüşünüz yayınlanır.
                </p>
              </div>
            </div>

            <form
              onSubmit={submitComment}
              className="mt-6 rounded-sm border border-navy/10 bg-white p-6 shadow-[0_20px_60px_rgba(7,26,51,.07)] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-navy">
                  Adınız
                  <input
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    className="mt-2 min-h-12 w-full rounded-sm border border-navy/15 bg-cream/35 px-4 font-normal outline-none transition placeholder:text-ink/35 focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="Adınızı yazın"
                  />
                </label>

                <label className="text-sm font-semibold text-navy">
                  Ziyaretçi türü
                  <select
                    value={form.role}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        role: event.target.value as FormState["role"],
                      }))
                    }
                    className="mt-2 min-h-12 w-full rounded-sm border border-navy/15 bg-cream/35 px-4 font-normal outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                  >
                    {COMMENT_ROLES.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-5 block text-sm font-semibold text-navy">
                Yorumunuz
                <textarea
                  required
                  minLength={10}
                  maxLength={700}
                  rows={5}
                  value={form.body}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      body: event.target.value,
                    }))
                  }
                  className="mt-2 w-full resize-y rounded-sm border border-navy/15 bg-cream/35 px-4 py-3 font-normal leading-6 outline-none transition placeholder:text-ink/35 focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="Deneyiminizi paylaşın..."
                />
                <span className="mt-1 block text-right text-xs font-normal text-ink/40">
                  {form.body.length}/700
                </span>
              </label>

              <label
                aria-hidden="true"
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
              >
                Web sitesi
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      website: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink/62">
                <input
                  required
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      consent: event.target.checked,
                    }))
                  }
                  className="mt-1 size-4 shrink-0 accent-[#0b2c54]"
                />
                <span>
                  Adımın ve yorumumun incelenmek üzere kaydedilmesini ve
                  onaylanırsa bu sayfada yayınlanmasını kabul ediyorum.
                </span>
              </label>

              {formMessage && (
                <div
                  role="status"
                  className={`mt-5 flex gap-3 rounded-sm border p-4 text-sm leading-6 ${
                    formMessage.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {formMessage.type === "success" ? (
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <MessageSquareText
                      className="mt-0.5 size-5 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span>{formMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-navy px-6 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-blue-deep disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                <Send className="size-4" aria-hidden="true" />
                {submitting ? "Gönderiliyor..." : "Yorumu Gönder"}
              </button>
            </form>
          </div>

          <div className="lg:pt-10">
            <div className="flex items-center justify-between border-b border-navy/12 pb-4">
              <h3 className="font-serif text-2xl font-semibold text-navy">
                Yayınlanan Görüşler
              </h3>
              {comments.length > 0 && (
                <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
                  {comments.length} yorum
                </span>
              )}
            </div>

            {loading ? (
              <div className="mt-6 space-y-4" aria-label="Yorumlar yükleniyor">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-40 animate-pulse rounded-sm bg-white/75"
                  />
                ))}
              </div>
            ) : comments.length === 0 ? (
              <div className="mt-6 rounded-sm border border-dashed border-navy/20 bg-white/60 p-9 text-center">
                <MessageSquareText
                  className="mx-auto size-9 text-gold"
                  aria-hidden="true"
                />
                <p className="mt-4 font-serif text-xl text-navy">
                  İlk görüşü siz paylaşın
                </p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink/55">
                  Onaylanan ziyaretçi yorumları burada yayınlanacak.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                {comments.map((comment) => (
                  <article
                    key={comment.id}
                    className="rounded-sm border border-navy/9 bg-white p-6 shadow-[0_12px_40px_rgba(7,26,51,.045)] sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-navy">{comment.name}</p>
                        <p className="mt-1 text-xs font-bold tracking-[0.12em] text-gold uppercase">
                          {comment.role}
                        </p>
                      </div>
                      <Quote
                        className="size-7 shrink-0 text-gold/55"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-5 whitespace-pre-line leading-7 text-ink/72">
                      “{comment.body}”
                    </p>
                    <time
                      className="mt-5 block text-xs text-ink/38"
                      dateTime={comment.createdAt}
                    >
                      {formatDate(comment.createdAt)}
                    </time>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
