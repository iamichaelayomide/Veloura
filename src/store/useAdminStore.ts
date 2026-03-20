"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { categories, customers, discounts, orders, products } from "@/data/catalog";
import { generateSlug } from "@/lib/utils";
import type { CustomerProfile, Discount, OrderSummary, Product } from "@/types";

type AdminStoreSettings = {
  storeName: string;
  supportPhone: string;
  supportEmail: string;
  showroomAddress: string;
  mapsLink: string;
  pickupWindow: string;
  instagram: string;
};

interface AdminState {
  products: Product[];
  customers: CustomerProfile[];
  orders: OrderSummary[];
  discounts: Discount[];
  settings: AdminStoreSettings;
  addProduct: (input: { name: string; categorySlug: string; price: number; shortDescription: string }) => void;
  updateProduct: (id: string, input: { name: string; categorySlug: string; price: number; stock: number; shortDescription: string; featured: boolean; newArrival: boolean; sale: boolean }) => void;
  removeProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  updateOrderStatus: (id: string, fulfillmentStatus: OrderSummary["fulfillmentStatus"], paymentStatus: OrderSummary["paymentStatus"]) => void;
  addDiscount: (input: { code: string; type: Discount["type"]; value: number; status: Discount["status"] }) => void;
  updateDiscountStatus: (id: string, status: Discount["status"]) => void;
  removeDiscount: (id: string) => void;
  updateSettings: (input: Partial<AdminStoreSettings>) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      products,
      customers,
      orders,
      discounts,
      settings: {
        storeName: "Veloura",
        supportPhone: "0703 289 1651",
        supportEmail: "hello@veloura.co",
        showroomAddress: "12A Admiralty Way, Lekki Phase 1, Lagos",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=12A+Admiralty+Way,+Lekki+Phase+1,+Lagos",
        pickupWindow: "Pickup orders are held for 48 hours after confirmation.",
        instagram: "https://instagram.com/veloura.co",
      },
      addProduct: (input) =>
        set((state) => {
          const category = categories.find((item) => item.slug === input.categorySlug) ?? categories[0];
          const slug = generateSlug(input.name);
          const id = `admin-${slug}-${Date.now()}`;

          const product: Product = {
            id,
            name: input.name,
            slug,
            categorySlug: category.slug,
            collectionSlugs: [],
            shortDescription: input.shortDescription,
            description: `${input.name} has been added from the Veloura admin dashboard and is ready for further merchandising updates.`,
            specs: [
              { label: "Category", value: category.name },
              { label: "Launch Source", value: "Veloura Admin" },
            ],
            careGuide: ["Add detailed care instructions from the product editor."],
            faq: [{ question: "Is this item ready to ship?", answer: "Update this answer from the admin workspace once stock details are confirmed." }],
            badges: [],
            basePrice: input.price,
            featured: false,
            newArrival: true,
            bestSeller: false,
            images: [category.image],
            variants: [{ id: `${id}-variant`, sku: slug.toUpperCase(), label: "Default", price: input.price, stock: 5, attributes: {} }],
            rating: 5,
            reviewCount: 0,
            reviews: [],
            seoTitle: `${input.name} | Veloura`,
            seoDescription: input.shortDescription,
          };

          return { products: [product, ...state.products] };
        }),
      updateProduct: (id, input) =>
        set((state) => ({
          products: state.products.map((product) => {
            if (product.id !== id) return product;

            const category = categories.find((item) => item.slug === input.categorySlug) ?? categories[0];
            const updatedVariant = product.variants[0]
              ? {
                  ...product.variants[0],
                  label: product.variants[0].label || "Default",
                  price: input.price,
                  stock: input.stock,
                }
              : {
                  id: `${id}-variant`,
                  sku: generateSlug(input.name).toUpperCase(),
                  label: "Default",
                  price: input.price,
                  stock: input.stock,
                  attributes: {},
                };

            return {
              ...product,
              name: input.name,
              slug: generateSlug(input.name),
              categorySlug: category.slug,
              shortDescription: input.shortDescription,
              description: `${input.name} has been refined from the Veloura admin dashboard and is ready for storefront presentation.`,
              basePrice: input.price,
              featured: input.featured,
              newArrival: input.newArrival,
              badges: input.sale
                ? Array.from(new Set([...product.badges.filter((badge) => badge !== "sale"), "sale"]))
                : product.badges.filter((badge) => badge !== "sale"),
              compareAtPrice: input.sale ? Math.round(input.price * 1.14) : undefined,
              variants: [updatedVariant, ...product.variants.slice(1)],
              seoTitle: `${input.name} | Veloura`,
              seoDescription: input.shortDescription,
            };
          }),
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
      toggleFeatured: (id) =>
        set((state) => ({
          products: state.products.map((product) => (product.id === id ? { ...product, featured: !product.featured } : product)),
        })),
      updateOrderStatus: (id, fulfillmentStatus, paymentStatus) =>
        set((state) => ({
          orders: state.orders.map((order) => (order.id === id ? { ...order, fulfillmentStatus, paymentStatus } : order)),
        })),
      addDiscount: (input) =>
        set((state) => ({
          discounts: [
            {
              id: `disc-${Date.now()}`,
              code: input.code,
              type: input.type,
              value: input.value,
              startsAt: new Date().toISOString().slice(0, 10),
              endsAt: new Date().toISOString().slice(0, 10),
              usage: "0 / 100",
              status: input.status,
            },
            ...state.discounts,
          ],
        })),
      updateDiscountStatus: (id, status) =>
        set((state) => ({
          discounts: state.discounts.map((discount) => (discount.id === id ? { ...discount, status } : discount)),
        })),
      removeDiscount: (id) =>
        set((state) => ({
          discounts: state.discounts.filter((discount) => discount.id !== id),
        })),
      updateSettings: (input) =>
        set((state) => ({
          settings: { ...state.settings, ...input },
        })),
    }),
    {
      name: "veloura-admin-storage",
    },
  ),
);
