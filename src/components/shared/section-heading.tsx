import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", align === "center" && "mx-auto max-w-2xl text-center")}>
      {eyebrow ? <p className="text-xs uppercase tracking-[0.38em] text-[var(--veloura-accent)]">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl text-[var(--veloura-text)] md:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-7 text-[var(--veloura-muted)] md:text-base">{description}</p> : null}
    </div>
  );
}


