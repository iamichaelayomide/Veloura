import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/shared/surface-card";

type EmptyStateProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function EmptyState({ title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <SurfaceCard className="p-8 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">Empty state</p>
      <h3 className="mt-4 font-display text-3xl text-[var(--veloura-text)]">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--veloura-muted)]">{description}</p>
      {ctaLabel && ctaHref ? (
        <Button asChild className="mt-6">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      ) : null}
    </SurfaceCard>
  );
}


