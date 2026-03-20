"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product } from "@/types";
import { calculateDiscountPercent, formatPrice, getBadgeLabel } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const hasItem = useWishlistStore((state) => state.hasItem(product.slug));
  const discount = calculateDiscountPercent(product.basePrice, product.compareAtPrice);

  return (
    <article className="panel group overflow-hidden rounded-[30px]">
      <div className="relative">
        <Link href={hairHref(`/product/${product.slug}`)} className="block">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </Link>

        <button
          type="button"
          onClick={() => toggleItem(product.slug)}
          className="absolute right-4 top-4 rounded-full border border-[var(--veloura-line)] bg-black/30 p-2 text-white backdrop-blur"
          aria-label="Toggle wishlist"
        >
          <Heart className={`h-4 w-4 ${hasItem ? "fill-[var(--veloura-accent)] text-[var(--veloura-accent)]" : ""}`} />
        </button>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2 pr-12">
          {product.badges.slice(0, 2).map((badge) => (
            <span key={badge} className="rounded-full bg-[rgba(247,245,239,0.92)] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-[#181a22]">
              {getBadgeLabel(badge)}
            </span>
          ))}
          {discount ? (
            <span className="rounded-full bg-[var(--veloura-accent)] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-[#111319]">
              {discount}% off
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-3 p-4 md:p-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--veloura-muted)]">{product.categorySlug.replace("-", " ")}</p>
          <Link href={hairHref(`/product/${product.slug}`)} className="mt-2 block text-base leading-6 text-[var(--veloura-text)] transition group-hover:text-[var(--veloura-accent)] md:text-lg">
            {product.name}
          </Link>
          <p className="mt-2 text-sm leading-6 text-[var(--veloura-muted)]">{product.shortDescription}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--veloura-accent)]">Best for {product.variants[0]?.label.toLowerCase() ?? "a polished everyday finish"}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[var(--veloura-text)] md:text-base">{formatPrice(product.basePrice)}</p>
            {product.compareAtPrice ? <p className="text-xs text-[var(--veloura-muted)] line-through md:text-sm">{formatPrice(product.compareAtPrice)}</p> : null}
          </div>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="h-8 rounded-full border border-[rgba(214,195,162,0.18)] px-2.5 text-[10px] uppercase tracking-[0.18em] text-[var(--veloura-accent)] hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.08)]"
          >
            <Link href={hairHref(`/product/${product.slug}`)}>See details</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}




