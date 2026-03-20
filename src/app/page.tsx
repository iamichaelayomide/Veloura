import Image from "next/image";
import Link from "next/link";

import { FaqList } from "@/components/storefront/faq-list";
import { NewsletterBlock } from "@/components/storefront/newsletter-block";
import { ProductCard } from "@/components/storefront/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { categories, collections, homepageTestimonials, storefrontFaqs } from "@/data/catalog";
import { getBestSellerProducts, getFeaturedProducts, getNewArrivalProducts } from "@/lib/catalog";
import { hairHref } from "@/lib/routes";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellerProducts();
  const newArrivals = getNewArrivalProducts();

  return (
    <div className="pb-16">
      <section className="site-shell pt-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative overflow-hidden rounded-[40px] border border-[#d2a28e]/20 bg-[radial-gradient(circle_at_top_left,rgba(214,164,141,0.24),transparent_35%),linear-gradient(135deg,#170f0e_0%,#0e0807_52%,#1d1210_100%)] p-8 md:p-12">
            <div className="max-w-2xl space-y-7">
              <p className="text-xs uppercase tracking-[0.45em] text-[#d9a995]">Private Client Hair Room</p>
              <h1 className="font-display text-5xl leading-[0.95] text-[#f8efe8] md:text-7xl">
                Luxury installs,
                <br />
                sculpted like a label.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-[#c9b0a4] md:text-base">
                Veloura is a dedicated hair storefront for women buying wigs, bundles, frontals, closures, and finishing essentials with a sharper eye for finish, density, and presence.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-[#f3e4d9] text-[#221311] hover:bg-[#fff3eb]">
                  <Link href={hairHref("/shop")}>Shop the collection</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#d9a995]/40 text-[#f3e8df] hover:bg-[#2a1917]">
                  <Link href={hairHref("/collections/best-sellers")}>View best sellers</Link>
                </Button>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["HD lace fronts", "Precise melt, cleaner installs."],
                ["Virgin bundles", "Soft luster and stronger longevity."],
                ["Ready dispatch", "Fast Lagos delivery, nationwide reach."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[24px] border border-white/10 bg-black/20 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d9a995]">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-[#baa49a]">{copy}</p>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute -right-10 top-0 hidden h-full w-[42%] lg:block">
              <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80" alt="Veloura luxury hair editorial" fill className="object-cover object-center opacity-90" sizes="40vw" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#170f0e]" />
            </div>
          </div>

          <div className="grid gap-6">
            <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[#140d0c]">
              <div className="relative aspect-[5/4]">
                <Image src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80" alt="Glossy luxury wig texture" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 32vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120c0b] via-[#120c0b]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#d9a995]">Editorial Drop</p>
                  <h2 className="mt-3 font-display text-3xl text-[#f8efe8]">The Bridal Edit</h2>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#cfb9af]">Soft sheen, polished lengths, and camera-ready density for ceremonies and event weekends.</p>
                  <Button asChild variant="ghost" className="mt-4 px-0 text-[#f8efe8] hover:bg-transparent hover:text-[#d9a995]">
                    <Link href={hairHref("/collections/bridal-edit")}>Explore the edit</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-[#120c0b] p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-[#d9a995]">Store Notes</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="font-display text-3xl text-[#f8efe8]">220%</p>
                  <p className="mt-2 text-sm text-[#bca79d]">Density-led options for fuller installs and stronger silhouette.</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-[#f8efe8]">72 hrs</p>
                  <p className="mt-2 text-sm text-[#bca79d]">Bespoke customisation window for tinting, prep, and finish styling.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell pt-20">
        <SectionHeading eyebrow="Categories" title="Shop by category" description="Structured for fast browsing, premium visuals, and cleaner decision-making." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.slice(0, 4).map((category) => (
            <Link key={category.id} href={hairHref(`/categories/${category.slug}`)} className="group relative overflow-hidden rounded-[28px] border border-white/10">
              <div className="relative aspect-[4/5]">
                <Image src={category.image} alt={category.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#d8b3a2]">{category.accent}</p>
                <h3 className="mt-2 text-2xl text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell pt-20">
        <SectionHeading eyebrow="Best Sellers" title="Most wanted units and textures" description="The pieces clients reorder because they perform beautifully and wear well." />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{bestSellers.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="site-shell pt-20">
        <div className="grid gap-6 lg:grid-cols-[.85fr,1.15fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#201413] p-8">
            <SectionHeading eyebrow={collections[0].eyebrow} title={collections[0].name} description={collections[0].description} />
            <Button asChild className="mt-6">
              <Link href={hairHref(`/collections/${collections[0].slug}`)}>Shop collection</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="site-shell pt-20">
        <SectionHeading eyebrow="New Arrivals" title="Fresh drops with stronger density and cleaner finish" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="site-shell pt-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {homepageTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
              <p className="text-sm leading-7 text-[#e6d7cf]">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="text-sm text-[#f8efe8]">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-[#9f8a82]">
                  {testimonial.location} | {testimonial.install}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="site-shell pt-20">
        <SectionHeading eyebrow="FAQ" title="Support that keeps the shopping flow calm" description="Direct answers on shipping, customisation, and care." />
        <div className="mt-8">
          <FaqList items={storefrontFaqs} />
        </div>
      </section>

      <section className="site-shell pt-20">
        <NewsletterBlock />
      </section>
    </div>
  );
}

