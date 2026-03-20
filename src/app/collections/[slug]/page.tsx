import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/storefront/product-card";
import { PageHero } from "@/components/shared/page-hero";
import { getCollectionBySlug, getOccasionEdits, getProductsByCollection } from "@/lib/catalog";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);
  const occasionEdits = slug === "bridal-edit" ? getOccasionEdits() : [];

  return (
    <div className="pb-16">
      <PageHero eyebrow={collection.eyebrow} title={collection.name} description={collection.description} />
      {slug === "bridal-edit" ? (
        <section className="site-shell mt-10 space-y-10">
          {occasionEdits.map((occasion) => (
            <div key={occasion.id} className="panel rounded-[30px] p-6 md:p-8">
              <SectionHeading eyebrow={occasion.name} title={occasion.mood} description={occasion.description} />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {occasion.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="site-shell mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</section>
      )}
    </div>
  );
}


