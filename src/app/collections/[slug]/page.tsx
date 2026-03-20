import { notFound } from "next/navigation";

import { ProductCard } from "@/components/storefront/product-card";
import { PageHero } from "@/components/shared/page-hero";
import { getCollectionBySlug, getProductsByCollection } from "@/lib/catalog";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);

  return (
    <div className="pb-16">
      <PageHero eyebrow={collection.eyebrow} title={collection.name} description={collection.description} />
      <section className="site-shell mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</section>
    </div>
  );
}


