"use client";

import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useToastStore } from "@/store/useToastStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useToastStore((state) => state.pushToast);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const hasItem = useWishlistStore((state) => state.hasItem(product.slug));

  const activeVariant = useMemo(
    () => product.variants.find((variant) => variant.id === variantId) ?? product.variants[0],
    [product.variants, variantId],
  );

  if (!activeVariant) return null;

  return (
    <div className="panel space-y-6 rounded-[30px] p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-muted)]">{product.categorySlug.replace("-", " ")}</p>
        <h1 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">{product.name}</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">{product.shortDescription}</p>
        <p className="mt-3 text-sm leading-7 text-[var(--veloura-accent)]">Pick your preferred length or lace option, add it to cart, and choose the payment route that feels easiest for you at checkout.</p>
      </div>

      <div className="flex items-end gap-3">
        <p className="text-3xl text-[var(--veloura-text)]">{formatPrice(activeVariant.price)}</p>
        {activeVariant.compareAtPrice ? <p className="pb-1 text-sm text-[var(--veloura-muted)] line-through">{formatPrice(activeVariant.compareAtPrice)}</p> : null}
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--veloura-muted)]">Select variant</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setVariantId(variant.id)}
              className={`rounded-2xl border px-4 py-4 text-left ${
                variant.id === activeVariant.id ? "border-[rgba(214,195,162,0.4)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.025)]"
              }`}
            >
              <p className="text-sm text-[var(--veloura-text)]">{variant.label}</p>
              <p className="mt-1 text-xs text-[var(--veloura-muted)]">SKU {variant.sku}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]">
          <button type="button" className="p-3 text-[var(--veloura-text)]" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-10 text-center">{quantity}</span>
          <button type="button" className="p-3 text-[var(--veloura-text)]" onClick={() => setQuantity((value) => Math.min(activeVariant.stock, value + 1))}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-[var(--veloura-muted)]">{activeVariant.stock} units available right now</p>
      </div>

      <div className="grid gap-3">
        <Button
          onClick={() => {
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
            });

            pushToast({
              title: `${product.name} added to cart`,
              description: `${activeVariant.label} has been added. Open your cart when you're ready to check out.`,
            });
          }}
        >
          Add this to cart
        </Button>
        <Button variant="outline" onClick={() => toggleWishlist(product.slug)}>
          {hasItem ? "Saved for later" : "Save for later"}
        </Button>
      </div>
    </div>
  );
}


