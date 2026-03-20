"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { hairHref } from "@/lib/routes";
import { useCheckoutStore } from "@/store/useCheckoutStore";

import { useCheckoutPreview } from "./checkout-preview";

export function PaystackCheckout({ fulfillment = "delivery" }: { fulfillment?: string }) {
  const details = useCheckoutStore((state) => state.details);
  const { displaySubtotal, displayTotal, shipping, previewItems } = useCheckoutPreview();
  const [cardholder, setCardholder] = useState(`${details.firstName} ${details.lastName}`.trim());
  const [cardNumber, setCardNumber] = useState("5123 4567 8901 2345");
  const [expiry, setExpiry] = useState("08/29");
  const [cvv, setCvv] = useState("123");
  const [processing, setProcessing] = useState(false);

  function handleMockPayment() {
    setProcessing(true);
    window.setTimeout(() => {
      window.location.href = hairHref(`/checkout/paystack/verify?fulfillment=${fulfillment}`);
    }, 900);
  }

  return (
    <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1fr_.85fr]">
      <div className="panel rounded-[30px] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">Online payment</p>
        <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Finish this order with a clean card-payment flow.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--veloura-muted)]">
          This is a mock Paystack experience for now. You can still walk through the payment steps, review your amount, and move into the order-confirmation flow like a real shopper would.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input placeholder="Cardholder name" value={cardholder} onChange={(event) => setCardholder(event.target.value)} />
          <Input placeholder="Billing email" type="email" value={details.email} readOnly />
          <Input placeholder="Card number" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} />
          <Input placeholder="Expiry date" value={expiry} onChange={(event) => setExpiry(event.target.value)} />
          <Input placeholder="CVV" value={cvv} onChange={(event) => setCvv(event.target.value)} />
          <Input placeholder="Billing phone" value={details.phone} readOnly />
        </div>

        <div className="mt-4 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 text-sm leading-7 text-[var(--veloura-muted)]">
          {fulfillment === "pickup"
            ? "You selected physical pickup. After this mock payment step, the order moves into pickup preparation and you will see the next-step tracking flow."
            : "You selected delivery. After this mock payment step, the order moves into dispatch preparation and you will see the next-step tracking flow."}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleMockPayment} disabled={processing}>
            {processing ? "Processing payment..." : `Pay ${formatPrice(displayTotal)}`}
          </Button>
          <Button asChild variant="outline">
            <a href={hairHref("/checkout")}>Edit checkout</a>
          </Button>
        </div>
      </div>

      <div className="panel rounded-[30px] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--veloura-accent)]">Order summary</p>
        <div className="mt-5 space-y-4">
          {previewItems.map((item) => (
            <div key={item.id} className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-sm text-[var(--veloura-text)]">{item.name}</p>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">
                {item.variantLabel} | Qty {item.quantity}
              </p>
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
            <span>{formatPrice(displayTotal)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
