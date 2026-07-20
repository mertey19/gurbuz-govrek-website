import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 font-serif text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl lg:text-[3.6rem]",
          tone === "light" ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-8",
            tone === "light" ? "text-white/72" : "text-ink/68",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
