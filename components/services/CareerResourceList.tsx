"use client";

import { FileText, Search } from "lucide-react";
import { useState } from "react";
import type { CareerResource } from "@/data/careerResources";

export function CareerResourceList({
  resources,
  categoryLabel,
}: {
  resources: readonly CareerResource[];
  categoryLabel: string;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const visibleResources = normalizedQuery
    ? resources.filter((resource) =>
        resource.title.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
      )
    : resources;

  return (
    <div>
      <label className="relative block max-w-md">
        <span className="sr-only">{categoryLabel} içinde meslek ara</span>
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-blue-deep/45"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Meslek adıyla ara"
          className="w-full rounded-sm border border-navy/12 bg-white py-3.5 pr-4 pl-11 text-sm text-navy placeholder:text-ink/38 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        />
      </label>

      <p className="mt-4 text-xs font-bold tracking-[.12em] text-blue-deep/60 uppercase" aria-live="polite">
        {visibleResources.length} meslek listeleniyor
      </p>

      {visibleResources.length === 0 ? (
        <p className="mt-8 rounded-sm border border-navy/10 bg-cream/60 px-6 py-8 text-center text-sm text-ink/60">
          Aramanıza uyan meslek bulunamadı. Farklı bir anahtar kelime deneyebilirsiniz.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleResources.map((resource) => (
            <li key={resource.href}>
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start gap-3 rounded-sm border border-navy/10 bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_14px_35px_rgba(7,26,51,.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="text-sm leading-6 font-semibold text-navy">
                  {resource.title}
                  <span className="sr-only"> — meslek tanıtım dosyası (PDF, yeni sekmede açılır)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
