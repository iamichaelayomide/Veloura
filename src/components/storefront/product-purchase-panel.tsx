"use client";

import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const hasItem = useWishlistStore((state) => state.hasItem(product.slug));

  const activeVariant = useMemo(
    () => product.variants.find((variant) => variant.id === variantId) ?? product.variants[0],
    [product.variants, variantId],
  );

  if (!activeVariant) return null;

  return (
    <div className="space-y-6 rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#9f8a82]">{product.categorySlug.replace("-", " ")}</p>
        <h1 className="mt-3 font-display text-4xl text-[#f8efe8]">{product.name}</h1>
        <p className="mt-3 text-sm leading-7 text-[#bca79d]">{product.shortDescription}</p>
      </div>

      <div className="flex items-end gap-3">
        <p className="text-3xl text-[#f8efe8]">{formatPrice(activeVariant.price)}</p>
        {activeVariant.compareAtPrice ? <p className="pb-1 text-sm text-[#8f7a71] line-through">{formatPrice(activeVariant.compareAtPrice)}</p> : null}
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#9f8a82]">Select variant</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setVariantId(variant.id)}
              className={`rounded-2xl border px-4 py-4 text-left ${
                variant.id === activeVariant.id ? "border-[#c58b74] bg-[#2a1815]" : "border-white/10 bg-black/20"
              }`}
            >
              <p className="text-sm text-[#f8efe8]">{variant.label}</p>
              <p className="mt-1 text-xs text-[#9f8a82]">SKU {variant.sku}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-white/10 bg-black/20">
          <button type="button" className="p-3 text-[#f8efe8]" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-10 text-center">{quantity}</span>
          <button type="button" className="p-3 text-[#f8efe8]" onClick={() => setQuantity((value) => Math.min(activeVariant.stock, value + 1))}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-[#bca79d]">{activeVariant.stock} units ready to ship</p>
      </div>

      <div className="grid gap-3">
        <Button
          onClick={() =>
            addItem({
              id: `${product.id}-${activeVariant.id}`,
              productId: product.id,
              productSlug: product.slug,
              variantId: activeVariant.id,
              name: product.name,
              variantLabel: activeVariant.label,
              price: activeVariant.price,
              image: product.images[0],
              quantity,
              stock: activeVariant.stock,
            })
          }
        >
          Add to cart
        </Button>
        <Button variant="outline" onClick={() => toggleWishlist(product.slug)}>
          {hasItem ? "Saved to wishlist" : "Save to wishlist"}
        </Button>
      </div>
    </div>
  );
}


