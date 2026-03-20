"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { ProductCard } from "@/components/storefront/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import type { Category, Product } from "@/types";

const FILTER_LIMIT = 8;

export function HomeProductShowcase({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    const source =
      activeCategory === "all"
        ? products
        : products.filter((product) => product.categorySlug === activeCategory);

    return source.slice(0, FILTER_LIMIT);
  }, [activeCategory, products]);

  return (
    <section id="products" className="site-shell pt-14">
      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <div className="panel rounded-[30px] p-6 md:rounded-[34px] md:p-8">
          <SectionHeading
            eyebrow="Products"
            title="Start with a category, then let the page narrow the products for you."
            description="Tap a category below to filter what you are seeing here without leaving the homepage."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeCategory === "all"
                  ? "border-[rgba(214,195,162,0.4)] bg-[rgba(214,195,162,0.08)] text-[var(--veloura-text)]"
                  : "border-[var(--veloura-line)] text-[var(--veloura-muted)] hover:border-[rgba(214,195,162,0.4)] hover:text-[var(--veloura-text)]"
              }`}
            >
              All products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeCategory === category.slug
                    ? "border-[rgba(214,195,162,0.4)] bg-[rgba(214,195,162,0.08)] text-[var(--veloura-text)]"
                    : "border-[var(--veloura-line)] text-[var(--veloura-muted)] hover:border-[rgba(214,195,162,0.4)] hover:text-[var(--veloura-text)]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={hairHref("/shop")}>Open full shop</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={hairHref("/categories")}>View all categories</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
