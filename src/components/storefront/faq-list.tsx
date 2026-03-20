import { SurfaceCard } from "@/components/shared/surface-card";
import type { FaqItem } from "@/types";

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <SurfaceCard key={item.question} className="p-0">
          <details className="group p-6">
            <summary className="cursor-pointer list-none text-lg text-[var(--veloura-text)] marker:hidden">
              {item.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-[var(--veloura-muted)]">{item.answer}</p>
          </details>
        </SurfaceCard>
      ))}
    </div>
  );
}


