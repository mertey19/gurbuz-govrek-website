"use client";

import {
  Check,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { AdminComment, CommentStatus } from "@/lib/comment-types";

const statusLabels: Record<CommentStatus, string> = {
  pending: "Onay bekliyor",
  approved: "Yayında",
  rejected: "Reddedildi",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function CommentAdmin() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [filter, setFilter] = useState<CommentStatus>("pending");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const loadComments = useCallback(async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/comments", {
        cache: "no-store",
      });

      if (response.status === 401) {
        setAuthenticated(false);
        setComments([]);
        return;
      }

      const data = (await response.json()) as {
        comments?: AdminComment[];
        error?: string;
      };
      if (!response.ok) throw new Error(data.error || "Yorumlar yüklenemedi.");

      setAuthenticated(true);
      setComments(data.comments ?? []);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Yorumlar yüklenemedi.",
      );
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

  const visibleComments = useMemo(
    () => comments.filter((comment) => comment.status === filter),
    [comments, filter],
  );

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/comments/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Giriş yapılamadı.");
      setPassword("");
      await loadComments();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Giriş yapılamadı.");
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: CommentStatus) {
    setBusyId(id);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Yorum güncellenemedi.");
      setComments((current) =>
        current.map((comment) =>
          comment.id === id ? { ...comment, status } : comment,
        ),
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Yorum güncellenemedi.",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function removeComment(id: string) {
    if (!window.confirm("Bu yorumu kalıcı olarak silmek istiyor musunuz?")) return;

    setBusyId(id);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Yorum silinemedi.");
      setComments((current) => current.filter((comment) => comment.id !== id));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Yorum silinemedi.");
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/comments/logout", { method: "POST" });
    setAuthenticated(false);
    setComments([]);
  }

  if (authenticated === null || (loading && authenticated !== false)) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <LoaderCircle className="size-8 animate-spin text-gold" aria-label="Yükleniyor" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md rounded-sm border border-navy/10 bg-white p-7 shadow-[0_24px_70px_rgba(7,26,51,.1)] sm:p-9">
        <div className="flex size-12 items-center justify-center rounded-full bg-navy text-gold">
          <LockKeyhole className="size-5" aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-semibold text-navy">
          Yorum Yönetimi
        </h1>
        <p className="mt-3 text-sm leading-6 text-ink/60">
          Bekleyen yorumları görmek ve yayınlamak için yönetici parolanızı girin.
        </p>
        <form onSubmit={login} className="mt-7">
          <label className="text-sm font-semibold text-navy">
            Yönetici parolası
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-sm border border-navy/15 px-4 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </label>
          {message && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 min-h-12 w-full rounded-sm bg-navy px-5 font-bold text-white transition hover:bg-blue-deep disabled:opacity-60"
          >
            {loading ? "Kontrol ediliyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-navy/12 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Yönetim Paneli</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy">
            Ziyaretçi Yorumları
          </h1>
          <p className="mt-3 text-sm leading-6 text-ink/60">
            Yalnızca onayladığınız yorumlar ana sayfada görünür.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void loadComments()}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-navy/15 bg-white px-4 text-sm font-bold text-navy"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Yenile
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-navy/15 bg-white px-4 text-sm font-bold text-navy"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Çıkış
          </button>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {(Object.keys(statusLabels) as CommentStatus[]).map((status) => {
          const count = comments.filter((comment) => comment.status === status).length;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                filter === status
                  ? "bg-navy text-white"
                  : "border border-navy/12 bg-white text-navy"
              }`}
            >
              {statusLabels[status]} ({count})
            </button>
          );
        })}
      </div>

      {message && (
        <p role="alert" className="mt-5 rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {message}
        </p>
      )}

      <div className="mt-6 grid gap-4">
        {visibleComments.length === 0 ? (
          <div className="rounded-sm border border-dashed border-navy/20 bg-white/70 p-10 text-center text-ink/55">
            Bu durumda yorum bulunmuyor.
          </div>
        ) : (
          visibleComments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-sm border border-navy/10 bg-white p-6 shadow-[0_12px_35px_rgba(7,26,51,.04)]"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-navy">{comment.name}</p>
                  <p className="mt-1 text-xs font-bold tracking-wider text-gold uppercase">
                    {comment.role}
                  </p>
                </div>
                <time className="text-xs text-ink/42" dateTime={comment.createdAt}>
                  {formatDate(comment.createdAt)}
                </time>
              </div>
              <p className="mt-5 whitespace-pre-line leading-7 text-ink/72">
                {comment.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-navy/8 pt-4">
                {comment.status !== "approved" && (
                  <button
                    type="button"
                    disabled={busyId === comment.id}
                    onClick={() => void updateStatus(comment.id, "approved")}
                    className="inline-flex min-h-10 items-center gap-2 rounded-sm bg-emerald-700 px-4 text-sm font-bold text-white disabled:opacity-50"
                  >
                    <Check className="size-4" aria-hidden="true" />
                    Yayınla
                  </button>
                )}
                {comment.status !== "rejected" && (
                  <button
                    type="button"
                    disabled={busyId === comment.id}
                    onClick={() => void updateStatus(comment.id, "rejected")}
                    className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-navy/15 px-4 text-sm font-bold text-navy disabled:opacity-50"
                  >
                    <X className="size-4" aria-hidden="true" />
                    Reddet
                  </button>
                )}
                <button
                  type="button"
                  disabled={busyId === comment.id}
                  onClick={() => void removeComment(comment.id)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-red-200 px-4 text-sm font-bold text-red-700 disabled:opacity-50 sm:ml-auto"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Sil
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
