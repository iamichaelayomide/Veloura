"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { createCheckoutOrder } from "@/lib/checkout";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useToastStore } from "@/store/useToastStore";

import { useCheckoutPreview } from "./checkout-preview";

export function WhatsAppCheckout({ fulfillment = "delivery" }: { fulfillment?: string }) {
  const details = useCheckoutStore((state) => state.details);
  const removeCartItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const pushToast = useToastStore((state) => state.pushToast);
  const { displaySubtotal, displayTotal, previewItems, shipping } = useCheckoutPreview();

  const whatsappHref = useMemo(() => {
    const summary = previewItems.map((item) => `${item.name} (${item.variantLabel}) x${item.quantity}`).join(", ");
    const pickupNote = fulfillment === "pickup" ? "I want physical pickup from the walk-in store." : "I want delivery to my address.";
    const text = `Hello Veloura, I want to place this order: ${summary}. Subtotal: ${formatPrice(displaySubtotal)}. Total: ${formatPrice(displayTotal)}. ${pickupNote}`;
    return `${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [displaySubtotal, displayTotal, fulfillment, previewItems]);

  async function handleContinueToWhatsApp() {
    try {
      await createCheckoutOrder({
        details: {
          ...details,
          fulfillmentMethod: fulfillment === "pickup" ? "pickup" : "delivery",
        },
        paymentMethod: "whatsapp",
        paymentStatus: "support_requested",
        fulfillmentStatus: fulfillment === "pickup" ? "ready_for_pickup" : "pending",
        amount: fulfillment === "pickup" ? displaySubtotal : displayTotal,
        cartSnapshot: previewItems,
      });

      window.open(whatsappHref, "_blank", "noopener,noreferrer");
    } catch {
      pushToast({
        title: "Could not save WhatsApp order",
        description: "The message link is ready, but the order snapshot could not be saved first.",
      });
    }
  }

  return (
    <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <div className="panel rounded-[30px] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">WhatsApp preview</p>
        <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Preview the order before it goes to customer service.</h2>
        <div className="mt-6 space-y-4">
          {previewItems.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-3">
              <div className="relative h-24 w-20 overflow-hidden rounded-[18px]">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex flex-1 items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--veloura-text)]">{item.name}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--veloura-muted)]">{item.variantLabel}</p>
                  <p className="mt-3 text-sm text-[var(--veloura-muted)]">Qty {item.quantity}</p>
                  <button type="button" onClick={() => removeCartItem(item.id)} className="mt-3 text-sm text-[var(--veloura-accent)]">
                    Delete from order
                  </button>
                </div>
                <p className="text-sm text-[var(--veloura-text)]">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-sm text-[var(--veloura-muted)]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(displaySubtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>{fulfillment === "pickup" ? "Pickup" : "Shipping"}</span>
            <span>{fulfillment === "pickup" ? "Complimentary" : shipping ? formatPrice(shipping) : "Complimentary"}</span>
          </div>
          <div className="flex justify-between border-t border-[var(--veloura-line)] pt-3 text-base text-[var(--veloura-text)]">
            <span>Total</span>
            <span>{formatPrice(fulfillment === "pickup" ? displaySubtotal : displayTotal)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleContinueToWhatsApp}>Continue to WhatsApp</Button>
          <Button asChild variant="outline">
            <Link href={hairHref("/checkout")}>Edit order</Link>
          </Button>
          <Button variant="ghost" onClick={() => clearCart()}>
            Clear order
          </Button>
          <Button asChild variant="ghost">
            <Link href={hairHref("/shop")}>Shop more</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
