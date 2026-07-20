"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { faqItems } from "@/data/faq";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="sss" className="section-space bg-cream">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div><SectionTitle eyebrow="Sık Sorulan Sorular" title="Karar Vermeden Önce Merak Ettikleriniz" description="Süreçle ilgili başka bir sorunuz varsa WhatsApp üzerinden doğrudan paylaşabilirsiniz." /></div>
          <div className="divide-y divide-navy/12 border-y border-navy/12">
            {faqItems.map((item, index) => {
              const open = openIndex === index;
              return (
                <div key={item.question}>
                  <h3>
                    <button type="button" onClick={() => setOpenIndex(open ? null : index)} className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-serif text-lg font-semibold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-xl" aria-expanded={open} aria-controls={`faq-panel-${index}`} id={`faq-button-${index}`}>
                      {item.question}<ChevronDown className={`size-5 shrink-0 text-gold transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={!open} className="pb-6 pr-10 text-sm leading-7 text-ink/64 sm:text-base">{item.answer}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
