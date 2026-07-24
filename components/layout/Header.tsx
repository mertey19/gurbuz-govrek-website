"use client";

import { ChevronDown, Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteNavigationGroups, whatsappUrl } from "@/config/site";
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
        <Container className="site-header-inner flex h-20 max-w-[1500px] items-center justify-between gap-4 xl:h-22 xl:gap-5">
          <Link
            href="/"
            className="site-header-brand shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold xl:border-r xl:border-white/12 xl:pr-5 2xl:pr-8"
            aria-label="Gürbüz Gövrek ana sayfa"
          >
            <p className="font-serif text-lg font-semibold tracking-[0.11em] text-white sm:text-xl 2xl:text-[1.35rem]">GÜRBÜZ GÖVREK</p>
            <p className="mt-0.5 hidden whitespace-nowrap text-[9px] font-bold tracking-[0.18em] text-gold-light uppercase sm:block">Matematik Öğretmeni · Tercih Uzmanı</p>
          </Link>

          <nav className="hidden min-w-0 flex-1 lg:block" aria-label="Ana navigasyon">
            <ul className="flex items-center justify-center gap-2 xl:gap-3 2xl:gap-5">
              {siteNavigationGroups.map((group) => (
                <li key={group.label} className="group relative">
                  {"items" in group ? (
                    <>
                      <button
                        type="button"
                        className="relative flex min-h-12 items-center gap-1 whitespace-nowrap px-1.5 text-[11px] font-semibold text-white/78 transition after:absolute after:inset-x-1.5 after:bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform hover:text-white hover:after:origin-left hover:after:scale-x-100 focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold group-hover:text-white 2xl:px-2 2xl:text-sm"
                        aria-haspopup="true"
                      >
                        {group.label}
                        <ChevronDown
                          className="size-3.5 text-gold-light transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                          aria-hidden="true"
                        />
                      </button>
                      <div className="pointer-events-none invisible absolute top-full left-1/2 z-50 w-[21rem] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                        <div className="overflow-hidden rounded-sm border border-navy/10 bg-white p-2 text-navy shadow-[0_24px_70px_rgba(7,26,51,.24)]">
                          <div className="border-b border-navy/8 px-4 py-3">
                            <p className="text-[10px] font-extrabold tracking-[0.17em] text-gold uppercase">
                              {group.label}
                            </p>
                          </div>
                          <ul className="py-1">
                            {group.items.map((item) => (
                              <li key={`${group.label}-${item.label}`}>
                                <Link
                                  href={item.href}
                                  className="group/item block rounded-sm px-4 py-3 transition hover:bg-cream focus-visible:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-gold"
                                >
                                  <span className="block text-sm font-bold text-navy transition group-hover/item:text-blue-deep">
                                    {item.label}
                                  </span>
                                  <span className="mt-1 block text-[11px] leading-5 text-ink/50">
                                    {item.description}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={group.href}
                      className="relative flex min-h-12 items-center whitespace-nowrap px-1.5 text-[11px] font-semibold text-white/78 transition after:absolute after:inset-x-1.5 after:bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform hover:text-white hover:after:origin-left hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold 2xl:px-2 2xl:text-sm"
                    >
                      {group.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden xl:block">
              <Button href={whatsappUrl} external variant="whatsapp" className="whitespace-nowrap rounded-full px-4 2xl:px-5" showArrow={false}>
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="site-header-menu-button flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Menüyü aç"
            >
              <Menu className="size-5" aria-hidden="true" />
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
