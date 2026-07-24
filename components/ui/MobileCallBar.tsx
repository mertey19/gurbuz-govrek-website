import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MobileCallBar() {
  return (
    <div className="mobile-call-bar fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-navy/96 px-3 pt-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] shadow-[0_-12px_35px_rgba(7,26,51,.24)] backdrop-blur-md md:hidden">
      <a
        href={siteConfig.contact.phoneHref}
        className="mobile-call-button flex min-h-13 w-full items-center justify-center gap-3 rounded-sm bg-gold px-5 py-2.5 text-navy transition active:scale-[.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={`${siteConfig.contact.phone} numarasını hemen ara`}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy text-gold-light">
          <Phone className="size-[18px]" aria-hidden="true" />
        </span>
        <span className="text-left">
          <span className="block text-sm font-extrabold leading-4">Hemen Ara</span>
          <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-navy/70">
            {siteConfig.contact.phone}
          </span>
        </span>
      </a>
    </div>
  );
}
