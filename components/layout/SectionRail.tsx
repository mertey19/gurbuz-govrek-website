"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  CircleHelp,
  Home,
  Layers3,
  MessageCircle,
  Presentation,
  Trophy,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

const sectionLinks = [
  { href: "#ana-sayfa", label: "Ana Sayfa", icon: Home },
  { href: "#hakkinda", label: "Hakkında", icon: UserRound },
  { href: "#hizmetler", label: "Hizmetler", icon: Layers3 },
  { href: "#meslek-kosesi", label: "Meslekler", icon: BriefcaseBusiness },
  { href: "#sunum-kosesi", label: "Sunumlar", icon: Presentation },
  { href: "#basari", label: "Başarı Hikâyeleri", icon: Trophy },
  { href: "#etkinlikler", label: "Etkinlikler", icon: CalendarDays },
  { href: "#sss", label: "Sık Sorulanlar", icon: CircleHelp },
  { href: "#iletisim", label: "İletişim", icon: MessageCircle },
] as const;

export function SectionRail() {
  const [activeHref, setActiveHref] = useState<string>(sectionLinks[0].href);

  useEffect(() => {
    const sections = sectionLinks
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-24% 0px -62%", threshold: [0, 0.1, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className="fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 min-[1320px]:block 2xl:right-6"
      aria-label="Hızlı bölüm bağlantıları"
    >
      <nav className="rounded-full border border-white/15 bg-navy/92 p-1.5 shadow-[0_18px_55px_rgba(7,26,51,.28)] backdrop-blur-md">
        <ul className="flex flex-col gap-1">
          {sectionLinks.map(({ href, label, icon: Icon }) => {
            const active = activeHref === href;

            return (
              <li key={href}>
                <a
                  href={href}
                  className={`group relative flex size-10 items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    active
                      ? "bg-gold text-navy"
                      : "text-white/62 hover:bg-white/10 hover:text-white"
                  }`}
                  aria-label={label}
                  aria-current={active ? "location" : undefined}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                  <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-sm bg-navy px-3 py-2 text-xs font-semibold text-white shadow-xl group-hover:block group-focus-visible:block">
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
