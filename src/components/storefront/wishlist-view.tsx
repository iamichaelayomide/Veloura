"use client";

import { ProductCard } from "@/components/storefront/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { products } from "@/data/catalog";
import { hairHref } from "@/lib/routes";
import { useWishlistStore } from "@/store/useWishlistStore";

export function WishlistView() {
  const wishlistItems = useWishlistStore((state) => state.items);
  const mapped = products.filter((product) => wishlistItems.some((item) => item.productSlug === product.slug));

  if (!mapped.length) {
    return (
      <EmptyState
        title="Your wishlist is still quiet"
        description="Save units you want to compare later, then move them into checkout when the moment feels right."
        ctaLabel="Browse products"
        ctaHref={hairHref("/shop")}
      />
    );
  }

  return <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{mapped.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}




