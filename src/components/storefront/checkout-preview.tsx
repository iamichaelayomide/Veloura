"use client";

import { useMemo } from "react";

import { calculateCheckoutTotal } from "@/lib/checkout";
import { useCartStore } from "@/store/useCartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";

export function useCheckoutPreview() {
  const items = useCartStore((state) => state.items);
  const fulfillmentMethod = useCheckoutStore((state) => state.details.fulfillmentMethod);

  const previewItems = useMemo(
    () =>
      items.length
        ? items
        : [
            {
              id: "preview-1",
              productId: "prod-001",
              productSlug: "velvet-bone-straight-wig",
              variantId: "var-001-a",
              name: "Velvet Bone Straight Wig",
              variantLabel: "22 in / HD / 180%",
              price: 285000,
              image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
              quantity: 1,
              stock: 1,
            },
          ],
    [items],
  );

  const { shipping, subtotal: displaySubtotal, total: displayTotal } = calculateCheckoutTotal(items, fulfillmentMethod);

  return {
    previewItems,
    shipping,
    displaySubtotal,
    displayTotal,
  };
}
