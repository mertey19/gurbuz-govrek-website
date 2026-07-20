import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline" | "navy" | "light";
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
};

const variants = {
  gold: "bg-gold text-navy hover:bg-gold-light",
  outline: "border border-white/45 bg-white/5 text-white hover:bg-white/12",
  navy: "bg-navy text-white hover:bg-blue-deep",
  light: "border border-navy/15 bg-white text-navy hover:border-gold hover:text-blue-deep",
};

export function Button({
  href,
  children,
  variant = "gold",
  className,
  showArrow = true,
  onClick,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-bold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        variants[variant],
        className,
      )}
    >
      {children}
      {showArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
