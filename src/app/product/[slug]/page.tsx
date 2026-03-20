import Image from "next/image";
import { notFound } from "next/navigation";

import { FaqList } from "@/components/storefront/faq-list";
import { ProductCard } from "@/components/storefront/product-card";
import { ProductPurchasePanel } from "@/components/storefront/product-purchase-panel";
import { SectionHeading } from "@/components/shared/section-heading";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(slug);

  return (
    <div className="pb-16">
      <section className="site-shell grid gap-8 pt-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 sm:col-span-2">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
          </div>
          {product.images.slice(1).map((image) => (
            <div key={image} className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10">
              <Image src={image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 30vw" />
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <ProductPurchasePanel product={product} />
          <div className="rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#c58b74]">Why it works</p>
            <p className="mt-4 text-sm leading-7 text-[#bca79d]">{product.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#9f8a82]">{spec.label}</p>
                  <p className="mt-2 text-sm text-[#f8efe8]">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell pt-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
            <SectionHeading eyebrow="Care Guide" title="Luxury wear, maintained properly." />
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[#bca79d]">
              {product.careGuide.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
            <SectionHeading eyebrow="Reviews" title={`${product.rating.toFixed(1)} average from ${product.reviewCount} reviews`} />
            <div className="mt-6 space-y-4">
              {product.reviews.length ? (
                product.reviews.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-[#f8efe8]">{review.title}</p>
                      <p className="text-xs uppercase tracking-[0.24em] text-[#c58b74]">{review.rating}/5</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#bca79d]">{review.comment}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8f7a71]">{review.customer}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-7 text-[#bca79d]">Fresh product page. Reviews will populate as orders convert and admin approves submissions.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell pt-16">
        <SectionHeading eyebrow="FAQ" title="Questions before checkout" />
        <div className="mt-8">
          <FaqList items={product.faq} />
        </div>
      </section>

      <section className="site-shell pt-16">
        <SectionHeading eyebrow="Related" title="Keep the basket elevated" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>

      <section className="site-shell pt-16">
        <div className="rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[#bca79d]">
            <span>Shipping calculated at checkout</span>
            <span>Secure payment support for Paystack, Flutterwave, and Stripe-ready architecture</span>
            <span>From {formatPrice(product.basePrice)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}


