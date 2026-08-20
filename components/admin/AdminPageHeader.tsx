import { ArrowLeft, Eye, Settings2 } from "lucide-react";
import Link from "next/link";

export function AdminBackLink() {
  return (
    <Link
      href="/site-yonetimi"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-deep transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Site Yönetim Merkezine dön
    </Link>
  );
}

export function AdminPageHeader({
  title,
  description,
  destination,
  capability,
}: {
  title: string;
  description: string;
  destination: string;
  capability: string;
}) {
  return (
    <header>
      <AdminBackLink />

      <p className="mt-6 text-[11px] font-extrabold tracking-[.18em] text-gold uppercase">
        Yönetim paneli
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-navy sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{description}</p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <div className="rounded-sm border border-navy/10 bg-white p-5">
          <p className="flex items-center gap-2 text-xs font-extrabold tracking-[.12em] text-gold uppercase">
            <Eye className="size-4" aria-hidden="true" />
            Nerede görünür?
          </p>
          <p className="mt-2 text-sm leading-6 text-navy">{destination}</p>
        </div>
        <div className="rounded-sm border border-navy/10 bg-white p-5">
          <p className="flex items-center gap-2 text-xs font-extrabold tracking-[.12em] text-gold uppercase">
            <Settings2 className="size-4" aria-hidden="true" />
            Bu panel ne yapar?
          </p>
          <p className="mt-2 text-sm leading-6 text-navy">{capability}</p>
        </div>
      </div>
    </header>
  );
}
