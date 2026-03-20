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
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#120c0b]">
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
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 p-2 text-white backdrop-blur"
          aria-label="Toggle wishlist"
        >
          <Heart className={`h-4 w-4 ${hasItem ? "fill-[#c58b74] text-[#c58b74]" : ""}`} />
        </button>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2 pr-12">
          {product.badges.slice(0, 2).map((badge) => (
            <span key={badge} className="rounded-full bg-[#f6efe9] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-[#241615]">
              {getBadgeLabel(badge)}
            </span>
          ))}
          {discount ? (
            <span className="rounded-full bg-[#c58b74] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-black">
              {discount}% off
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#9f8a82]">{product.categorySlug.replace("-", " ")}</p>
          <Link href={hairHref(`/product/${product.slug}`)} className="mt-2 block text-lg text-[#f8efe8] transition group-hover:text-[#d8b3a2]">
            {product.name}
          </Link>
          <p className="mt-2 text-sm leading-6 text-[#bca79d]">{product.shortDescription}</p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-base font-medium text-[#f8efe8]">{formatPrice(product.basePrice)}</p>
            {product.compareAtPrice ? <p className="text-sm text-[#8f7a71] line-through">{formatPrice(product.compareAtPrice)}</p> : null}
          </div>
          <Button asChild size="sm" variant="ghost" className="border border-white/10">
            <Link href={hairHref(`/product/${product.slug}`)}>View</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}




