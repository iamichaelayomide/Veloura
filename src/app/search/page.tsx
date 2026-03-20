import { ProductCard } from "@/components/storefront/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHero } from "@/components/shared/page-hero";
import { searchProducts } from "@/lib/catalog";
import { hairHref } from "@/lib/routes";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchProducts(q);

  return (
    <div className="pb-16">
      <PageHero eyebrow="Search" title="Search by texture, category, or product name." description="Predictive search can layer on later. The structure is already in place for a real indexed search experience." />
      <section className="site-shell mt-10">
        {results.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{results.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        ) : (
          <EmptyState title="No results found" description={`No products matched "${q}". Try "body wave", "HD lace", or "wigs".`} ctaLabel="Browse all products" ctaHref={hairHref("/shop")} />
        )}
      </section>
    </div>
  );
}




