import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/storefront/product-card";
import { PageHero } from "@/components/shared/page-hero";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/catalog";
import { hairHref } from "@/lib/routes";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="pb-16">
      <PageHero eyebrow={category.accent} title={category.name} description={category.description} />
      <section className="site-shell mt-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--veloura-muted)]">{products.length} product{products.length === 1 ? "" : "s"} in this category</p>
          <Link href={hairHref("/shop")} className="rounded-full border border-[var(--veloura-line)] px-4 py-2 text-sm text-[var(--veloura-text)]">
            Filter in shop
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </div>
  );
}


