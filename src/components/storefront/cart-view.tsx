"use client";

import Image from "next/image";
import Link from "next/link";

import { EmptyState } from "@/components/shared/empty-state";
import { hairHref } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export function CartView() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.subtotal());

  if (!items.length) {
    return <EmptyState title="Your bag is empty" description="Save a few premium textures and return when you're ready to checkout." ctaLabel="Continue shopping" ctaHref={hairHref("/shop")} />;
  }

  const shipping = subtotal > 250000 ? 0 : 12000;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="grid gap-4 rounded-[28px] border border-white/10 bg-[#120c0b] p-5 sm:grid-cols-[120px,1fr]">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="120px" />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg text-[#f8efe8]">{item.name}</p>
                <p className="mt-1 text-sm text-[#bca79d]">{item.variantLabel}</p>
                <p className="mt-3 text-sm text-[#f8efe8]">{formatPrice(item.price)}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button type="button" className="text-sm text-[#c58b74]" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
        <h2 className="text-2xl text-[#f8efe8]">Order summary</h2>
        <div className="mt-6 space-y-3 text-sm text-[#bca79d]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping ? formatPrice(shipping) : "Free"}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3 text-base text-[#f8efe8]">
            <span>Total</span>
            <span>{formatPrice(subtotal + shipping)}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <Button asChild>
            <Link href={hairHref("/checkout")}>Proceed to checkout</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={hairHref("/shop")}>Continue shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}




