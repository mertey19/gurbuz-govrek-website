"use client";

import { Menu } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-white/10 bg-navy/95 shadow-lg backdrop-blur"
            : "border-white/10 bg-navy/30 backdrop-blur-sm",
        )}
      >
        <Container className="flex h-20 items-center justify-between gap-6 xl:h-22">
          <a
            href="#ana-sayfa"
            className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-label="Gürbüz Gövrek ana sayfa"
          >
            <p className="font-serif text-lg font-semibold tracking-[0.11em] text-white sm:text-xl">GÜRBÜZ GÖVREK</p>
            <p className="mt-0.5 hidden text-[9px] font-bold tracking-[0.18em] text-gold-light uppercase sm:block">Matematik Öğretmeni · Tercih Uzmanı</p>
          </a>

          <nav className="hidden lg:block" aria-label="Ana navigasyon">
            <ul className="flex items-center gap-5 xl:gap-7">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative py-3 text-xs font-semibold text-white/78 transition after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform hover:text-white hover:after:origin-left hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold xl:text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button href={whatsappUrl} external className="hidden xl:inline-flex" showArrow={false}>
              WhatsApp&apos;tan Görüş
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Menüyü aç"
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>
      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={closeMenu} />
      </div>
    </>
  );
}
