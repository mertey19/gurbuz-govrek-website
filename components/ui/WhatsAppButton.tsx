import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { toWhatsAppUrl } from "@/lib/utils";

export function WhatsAppButton() {
  const url = toWhatsAppUrl(
    siteConfig.whatsappNumber,
    siteConfig.whatsappMessage,
  );

  if (!url) {
    return (
      <span
        className="fixed right-4 bottom-4 z-40 hidden size-12 cursor-not-allowed items-center justify-center rounded-full border border-white/20 bg-navy/75 text-white/55 shadow-xl backdrop-blur sm:flex"
        title="WhatsApp numarası tanımlandığında aktif olacaktır."
        aria-label="WhatsApp iletişimi henüz aktif değil"
      >
        <MessageCircle aria-hidden="true" className="size-5" />
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 bottom-4 z-40 flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
      aria-label="WhatsApp üzerinden bilgi alın"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
    </a>
  );
}
