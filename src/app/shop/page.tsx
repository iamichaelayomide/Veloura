import { ProductCard } from "@/components/storefront/product-card";
import { PageHero } from "@/components/shared/page-hero";
import { categories } from "@/data/catalog";
import { getAllProducts } from "@/lib/catalog";

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="pb-16">
      <PageHero eyebrow="Shop" title="Premium textures, clean structure, easy comparison." description="Filter-ready product architecture with wigs, bundles, frontals, closures, accessories, and care." />
      <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[280px,1fr]">
        <aside className="rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c58b74]">Filters</p>
          <div className="mt-6 space-y-6 text-sm text-[#bca79d]">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#f8efe8]">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category.slug} className="rounded-full border border-white/10 px-3 py-1">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#f8efe8]">Popular filters</p>
              <div className="flex flex-wrap gap-2">
                {["HD Lace", "Body Wave", "22 in", "220% Density", "Ready to Ship"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-white/10 bg-[#120c0b] px-5 py-4 text-sm text-[#bca79d]">
            <span>{products.length} products</span>
            <div className="flex gap-2">
              {["Newest", "Best Selling", "Price: Low to High"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>
    </div>
  );
}


