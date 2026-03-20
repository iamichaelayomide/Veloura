"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/storefront/product-card";
import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import type { OccasionEdit, Product } from "@/types";

type OccasionWithProducts = OccasionEdit & {
  products: Product[];
};

export function HomeOccasionShowcase({ occasions }: { occasions: OccasionWithProducts[] }) {
  const [activeOccasionId, setActiveOccasionId] = useState(occasions[0]?.id ?? "");

  const activeOccasion = useMemo(
    () => occasions.find((occasion) => occasion.id === activeOccasionId) ?? occasions[0],
    [activeOccasionId, occasions],
  );

  if (!activeOccasion) {
    return null;
  }

  return (
    <section className="site-shell pt-14">
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="panel rounded-[30px] p-6 md:rounded-[34px] md:p-8">
          <SectionHeading
            eyebrow="Occasion Hair"
            title="Shop by what you are going out for."
            description="Pick the occasion first and we will narrow the hair recommendations to three strong options."
          />
          <div className="mt-6 grid gap-3">
            {occasions.map((occasion) => {
              const isActive = occasion.id === activeOccasion.id;
              return (
                <button
                  key={occasion.id}
                  type="button"
                  onClick={() => setActiveOccasionId(occasion.id)}
                  className={`rounded-[22px] border p-4 text-left transition ${
                    isActive
                      ? "border-[rgba(214,195,162,0.55)] bg-[rgba(214,195,162,0.14)] shadow-[0_0_0_1px_rgba(214,195,162,0.12)]"
                      : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.08)] active:scale-[0.99] active:bg-[rgba(214,195,162,0.16)]"
                  }`}
                >
                  <p className="text-base text-[var(--veloura-text)]">{occasion.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--veloura-muted)]">{occasion.mood}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-6 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">{activeOccasion.name}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">{activeOccasion.description}</p>
          </div>
          <Button asChild className="mt-6">
            <Link href={hairHref("/collections/bridal-edit")}>Open occasion edit</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {activeOccasion.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
