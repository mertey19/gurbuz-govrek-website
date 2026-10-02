"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Bölüm giriş animasyonu.
 *
 * Sunucu çıktısı içeriği görünür bırakır ve animasyonu CSS'e devreder; önceki
 * sürüm `opacity: 0` basıp animasyonu hydration'a bağladığı için ilk ekran
 * JavaScript inene kadar boş görünüyordu. Artık ilk ekran boyanır boyanmaz
 * okunabilir durumda.
 *
 * Görüş alanının altındaki bölümler eski davranışını korur: bağlandıktan sonra
 * gizlenip kaydırmayla açılırlar. Gizleme yalnızca ekran dışındaki öğelere
 * uygulandığı için kullanıcı hiçbir sıçrama görmez; JavaScript çalışmazsa da
 * içerik görünür kalır.
 */
type RevealState = "enter" | "hidden";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("enter");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Ekranda görünen bölüm CSS animasyonunu zaten oynatıyor; ona dokunulmaz.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setState("enter");
        observer.disconnect();
      },
      // Yüksek bölümler de tetiklensin diye oran yerine alt kenar payı kullanılır.
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={state}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
