"use client";

import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteNavigationGroups, whatsappUrl } from "@/config/site";
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
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeMenu = useCallback(() => {
    setOpenGroup(null);
    onClose();
  }, [onClose]);
  useFocusTrap(menuRef, open, closeMenu);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, open]);

  if (!open) return null;

  return (
    <div ref={menuRef} className="mobile-menu-shell fixed inset-0 z-50 bg-navy lg:hidden" role="dialog" aria-modal="true" aria-label="Mobil menü">
      <div className="mobile-menu-header flex h-22 items-center justify-between border-b border-white/10 px-5">
        <div>
          <p className="font-serif text-xl font-semibold tracking-[0.08em] text-white">GÜRBÜZ GÖVREK</p>
          <p className="mt-1 text-[10px] tracking-[0.18em] text-gold-light uppercase">Matematik · Tercih</p>
        </div>
        <button
          type="button"
          onClick={closeMenu}
          className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          aria-label="Menüyü kapat"
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <nav className="mobile-menu-nav flex h-[calc(100%-5.5rem)] flex-col justify-start overflow-y-auto px-6 py-5" aria-label="Mobil navigasyon">
        <ul className="mobile-menu-links space-y-1">
          {siteNavigationGroups.map((group, index) => {
            const expanded = openGroup === group.label;
            const submenuId = `mobile-submenu-${index + 1}`;

            return (
              <li key={group.label} className="border-b border-white/8">
                {"items" in group ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenGroup(expanded ? null : group.label)}
                      className="mobile-menu-link group flex min-h-13 w-full items-center gap-4 py-3 text-left font-serif text-xl text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                      aria-expanded={expanded}
                      aria-controls={submenuId}
                    >
                      <span className="text-xs font-sans tracking-widest text-gold">0{index + 1}</span>
                      <span className="min-w-0 flex-1">{group.label}</span>
                      <ChevronDown
                        className={`size-4 shrink-0 text-gold-light transition-transform ${expanded ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {expanded && (
                      <ul id={submenuId} className="mb-3 ml-8 grid gap-1 border-l border-gold/35 pl-4">
                        {group.items.map((item) => (
                          <li key={`${group.label}-${item.label}`}>
                            <Link
                              href={item.href}
                              onClick={closeMenu}
                              className="block rounded-sm px-3 py-2.5 text-sm font-semibold text-white/72 transition hover:bg-white/6 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={group.href}
                    onClick={closeMenu}
                    className="mobile-menu-link group flex min-h-13 items-center gap-4 py-3 font-serif text-xl text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <span className="text-xs font-sans tracking-widest text-gold">0{index + 1}</span>
                    {group.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <Button href={whatsappUrl} external variant="whatsapp" className="mobile-menu-cta mt-8 w-full" onClick={closeMenu}>
          WhatsApp&apos;tan Görüş
        </Button>
      </nav>
    </div>
  );
}
