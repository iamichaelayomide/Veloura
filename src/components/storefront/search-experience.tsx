"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/storefront/product-card";
import { categories } from "@/data/catalog";
import { getSuggestedProducts, searchProducts } from "@/lib/catalog";
import { hairHref } from "@/lib/routes";

export function SearchExperience({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchProducts(query), [query]);
  const suggestions = useMemo(() => getSuggestedProducts(query), [query]);

  return (
    <section className="site-shell mt-10 space-y-6">
      <div className="panel rounded-[30px] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--veloura-muted)]" />
            <Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search wigs, bundles, frontals, accessories, body wave, HD lace..." className="pl-11" />
          </div>
          <Button asChild variant="outline">
            <Link href={hairHref("/shop")}>Open full shop filters</Link>
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.slice(0, 6).map((category) => (
            <button key={category.slug} type="button" onClick={() => setQuery(category.name)} className="rounded-full border border-[var(--veloura-line)] px-3 py-1 text-sm text-[var(--veloura-muted)]">
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{results.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className="panel rounded-[30px] p-6">
          <p className="text-lg text-[var(--veloura-text)]">No exact matches for &ldquo;{query}&rdquo;.</p>
          <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">Try broader terms like &ldquo;body wave&rdquo;, &ldquo;HD lace&rdquo;, or &ldquo;accessories&rdquo;. Similar options are below.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {suggestions.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      )}
    </section>
  );
}
