import Link from "next/link";
import { Search } from "lucide-react";

import { ProductCard } from "@/components/storefront/product-card";
import { PageHero } from "@/components/shared/page-hero";
import { categories } from "@/data/catalog";
import { getAllProducts, searchProducts } from "@/lib/catalog";
import { hairHref } from "@/lib/routes";

const priceFilters = [
  { label: "Under 20k", value: "under-20" },
  { label: "20k to 100k", value: "20-100" },
  { label: "100k to 250k", value: "100-250" },
  { label: "250k and above", value: "250-plus" },
];

function filterByPrice(price: number, range?: string) {
  if (!range) return true;
  if (range === "under-20") return price < 20000;
  if (range === "20-100") return price >= 20000 && price <= 100000;
  if (range === "100-250") return price > 100000 && price <= 250000;
  if (range === "250-plus") return price > 250000;
  return true;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; price?: string; q?: string }>;
}) {
  const { category, price, q = "" } = await searchParams;
  const sourceProducts = q ? searchProducts(q) : getAllProducts();
  const products = sourceProducts.filter((product) => {
    const categoryMatch = category ? product.categorySlug === category : true;
    const priceMatch = filterByPrice(product.basePrice, price);
    return categoryMatch && priceMatch;
  });

  return (
    <div className="pb-16">
      <PageHero eyebrow="Shop" title="Shop by category, narrow by price, and keep the page feeling lighter." description="Use the quick chips first if you already know what you want, or open the filters when you need a narrower search." />
      <section className="site-shell mt-8">
        <div className="panel flex gap-2 overflow-x-auto rounded-[24px] px-4 py-4 text-sm text-[var(--veloura-muted)]">
          <Link href={hairHref("/shop")} className={`shrink-0 rounded-full border px-4 py-2 ${!category ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}>
            All products
          </Link>
          <Link href={hairHref("/sales")} className="shrink-0 rounded-full border border-[var(--veloura-line)] px-4 py-2">
            Sales
          </Link>
          {categories.slice(0, 6).map((item) => (
            <Link
              key={item.slug}
              href={hairHref(`/shop?category=${item.slug}${price ? `&price=${price}` : ""}`)}
              className={`shrink-0 rounded-full border px-4 py-2 ${category === item.slug ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>
      <section className="site-shell mt-8 grid gap-8 lg:grid-cols-[320px,1fr]">
        <aside className="panel hidden rounded-[28px] p-6 lg:block">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Filters</p>
          <div className="mt-6 space-y-6 text-sm text-[var(--veloura-muted)]">
            <form action={hairHref("/shop")} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-text)]">Search</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--veloura-muted)]" />
                <input name="q" defaultValue={q} placeholder="Search within shop" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] pl-10 pr-4 text-sm text-[var(--veloura-text)]" />
                {category ? <input type="hidden" name="category" value={category} /> : null}
                {price ? <input type="hidden" name="price" value={price} /> : null}
              </div>
            </form>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[var(--veloura-text)]">Category</p>
              <div className="flex flex-wrap gap-2">
                <Link href={hairHref("/shop")} className={`rounded-full border px-3 py-1 ${!category ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}>
                  All
                </Link>
                {categories.map((item) => (
                  <Link
                    key={item.slug}
                    href={hairHref(`/shop?category=${item.slug}${price ? `&price=${price}` : ""}`)}
                    className={`rounded-full border px-3 py-1 ${category === item.slug ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[var(--veloura-text)]">Price</p>
              <div className="flex flex-wrap gap-2">
                <Link href={hairHref(category ? `/shop?category=${category}` : "/shop")} className={`rounded-full border px-3 py-1 ${!price ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}>
                  All prices
                </Link>
                {priceFilters.map((item) => (
                  <Link
                    key={item.value}
                    href={hairHref(`/shop?${category ? `category=${category}&` : ""}price=${item.value}`)}
                    className={`rounded-full border px-3 py-1 ${price === item.value ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <details className="panel rounded-[24px] p-5 lg:hidden">
            <summary className="cursor-pointer list-none text-sm uppercase tracking-[0.24em] text-[var(--veloura-accent)]">
              Open filters
            </summary>
            <div className="mt-5 space-y-6 text-sm text-[var(--veloura-muted)]">
              <form action={hairHref("/shop")} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-text)]">Search</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--veloura-muted)]" />
                  <input name="q" defaultValue={q} placeholder="Search within shop" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] pl-10 pr-4 text-sm text-[var(--veloura-text)]" />
                  {category ? <input type="hidden" name="category" value={category} /> : null}
                  {price ? <input type="hidden" name="price" value={price} /> : null}
                </div>
              </form>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[var(--veloura-text)]">Category</p>
                <div className="flex flex-wrap gap-2">
                  <Link href={hairHref("/shop")} className={`rounded-full border px-3 py-1 ${!category ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}>
                    All
                  </Link>
                  {categories.map((item) => (
                    <Link
                      key={item.slug}
                      href={hairHref(`/shop?category=${item.slug}${price ? `&price=${price}` : ""}`)}
                      className={`rounded-full border px-3 py-1 ${category === item.slug ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[var(--veloura-text)]">Price</p>
                <div className="flex flex-wrap gap-2">
                  <Link href={hairHref(category ? `/shop?category=${category}` : "/shop")} className={`rounded-full border px-3 py-1 ${!price ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}>
                    All prices
                  </Link>
                  {priceFilters.map((item) => (
                    <Link
                      key={item.value}
                      href={hairHref(`/shop?${category ? `category=${category}&` : ""}price=${item.value}`)}
                      className={`rounded-full border px-3 py-1 ${price === item.value ? "border-[rgba(214,195,162,0.4)] text-[var(--veloura-text)]" : "border-[var(--veloura-line)]"}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </details>

          <div className="panel flex flex-wrap items-center justify-between gap-3 rounded-[28px] px-5 py-4 text-sm text-[var(--veloura-muted)]">
            <span>{products.length} products</span>
            <div className="flex flex-wrap gap-2">
              {q ? <span className="rounded-full border border-[rgba(214,195,162,0.4)] px-3 py-1 text-[var(--veloura-text)]">Search: {q}</span> : null}
              {category ? <span className="rounded-full border border-[rgba(214,195,162,0.4)] px-3 py-1 text-[var(--veloura-text)]">Category: {category.replace(/-/g, " ")}</span> : null}
              {price ? <span className="rounded-full border border-[rgba(214,195,162,0.4)] px-3 py-1 text-[var(--veloura-text)]">Price filter active</span> : null}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>
    </div>
  );
}
