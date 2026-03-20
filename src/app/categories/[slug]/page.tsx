import { notFound } from "next/navigation";

import { ProductCard } from "@/components/storefront/product-card";
import { PageHero } from "@/components/shared/page-hero";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/catalog";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="pb-16">
      <PageHero eyebrow={category.accent} title={category.name} description={category.description} />
      <section className="site-shell mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</section>
    </div>
  );
}


