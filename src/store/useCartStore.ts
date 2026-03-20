import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItemType } from "@/types";

interface CartState {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((entry) => entry.variantId === item.variantId);

        if (existing) {
          set({
            items: get().items.map((entry) =>
              entry.variantId === item.variantId
                ? { ...entry, quantity: Math.min(entry.quantity + item.quantity, entry.stock) }
                : entry,
            ),
          });
          return;
        }

        set({ items: [...get().items, item] });
      },
      removeItem: (itemId) => set({ items: get().items.filter((item) => item.id !== itemId && item.productId !== itemId) }),
      updateQuantity: (itemId, quantity) =>
        set({
          items: get().items.map((item) =>
            item.id === itemId || item.productId === itemId ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item,
          ),
        }),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      subtotal: () => get().items.reduce((total, item) => total + item.quantity * item.price, 0),
      totalPrice: () => get().items.reduce((total, item) => total + item.quantity * item.price, 0),
    }),
    {
      name: "veloura-cart-storage",
    },
  ),
);

