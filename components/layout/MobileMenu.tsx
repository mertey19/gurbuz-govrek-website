"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menuRef, open, onClose);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div ref={menuRef} className="fixed inset-0 z-50 bg-navy lg:hidden" role="dialog" aria-modal="true" aria-label="Mobil menü">
      <div className="flex h-22 items-center justify-between border-b border-white/10 px-5">
        <div>
          <p className="font-serif text-xl font-semibold tracking-[0.08em] text-white">GÜRBÜZ GÖVREK</p>
          <p className="mt-1 text-[10px] tracking-[0.18em] text-gold-light uppercase">Matematik · Tercih</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          aria-label="Menüyü kapat"
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <nav className="flex h-[calc(100%-5.5rem)] flex-col justify-center px-6" aria-label="Mobil navigasyon">
        <ul className="space-y-1">
          {siteConfig.navigation.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className="group flex min-h-13 items-center gap-4 border-b border-white/8 py-3 font-serif text-2xl text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                <span className="text-xs font-sans tracking-widest text-gold">0{index + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Button href="#randevu" className="mt-8 w-full" onClick={onClose}>
          Randevu Oluştur
        </Button>
      </nav>
    </div>
  );
}
