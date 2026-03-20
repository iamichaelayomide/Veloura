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
      {eyebrow ? <p className="text-xs uppercase tracking-[0.35em] text-[#c58b74]">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl text-[#f8efe8] md:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-7 text-[#bca79d] md:text-base">{description}</p> : null}
    </div>
  );
}


