import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WishlistItem } from "@/types";

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (productSlug: string) => void;
  hasItem: (productSlug: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productSlug) => {
        const exists = get().items.some((item) => item.productSlug === productSlug);
        set({
          items: exists
            ? get().items.filter((item) => item.productSlug !== productSlug)
            : [...get().items, { productSlug }],
        });
      },
      hasItem: (productSlug) => get().items.some((item) => item.productSlug === productSlug),
    }),
    {
      name: "veloura-wishlist-storage",
    },
  ),
);

