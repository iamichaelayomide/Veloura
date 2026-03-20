"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Store } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { hairHref } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";
import { useCheckoutStore } from "@/store/useCheckoutStore";

import { useCheckoutPreview } from "./checkout-preview";

type FulfillmentMethod = "delivery" | "pickup";

export function CheckoutExperience() {
  const { previewItems, shipping, displaySubtotal, displayTotal } = useCheckoutPreview();
  const [step, setStep] = useState<1 | 2>(1);
  const details = useCheckoutStore((state) => state.details);
  const setField = useCheckoutStore((state) => state.setField);
  const fulfillmentMethod = details.fulfillmentMethod as FulfillmentMethod;

  return (
    <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1.08fr_.92fr]">
      <div className="space-y-6">
        <div className="panel rounded-[30px] p-6">
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 1, label: "Delivery details" },
              { id: 2, label: "Payment selection" },
            ].map((entry) => (
              <div
                key={entry.id}
                className={`inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm ${
                  step >= entry.id ? "bg-[rgba(214,195,162,0.1)] text-[var(--veloura-text)]" : "bg-[rgba(255,255,255,0.04)] text-[var(--veloura-muted)]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                    step >= entry.id ? "border-[rgba(214,195,162,0.4)] bg-[var(--veloura-accent)] text-[#12141b]" : "border-[var(--veloura-line)]"
                  }`}
                >
                  {entry.id}
                </span>
                {entry.label}
              </div>
            ))}
          </div>
        </div>

        {step === 1 ? (
          <form
            className="panel animate-fade-up space-y-6 rounded-[30px] p-6"
            onSubmit={(event) => {
              event.preventDefault();
              setStep(2);
            }}
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">Client details</p>
              <h2 className="font-display text-3xl text-[var(--veloura-text)]">Where should the order land?</h2>
              <p className="text-sm leading-7 text-[var(--veloura-muted)]">Customers can choose delivery or a physical pickup appointment from the Veloura walk-in store.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="First name" value={details.firstName} onChange={(event) => setField("firstName", event.target.value)} />
              <Input placeholder="Last name" value={details.lastName} onChange={(event) => setField("lastName", event.target.value)} />
              <Input placeholder="Email address" type="email" value={details.email} onChange={(event) => setField("email", event.target.value)} />
              <Input placeholder="Phone number" value={details.phone} onChange={(event) => setField("phone", event.target.value)} />
              <Input placeholder="City" value={details.city} onChange={(event) => setField("city", event.target.value)} />
              <Input placeholder="State" value={details.state} onChange={(event) => setField("state", event.target.value)} />
            </div>
            <Input placeholder="Street address" value={details.address} onChange={(event) => setField("address", event.target.value)} />
            <Textarea placeholder="Delivery note, landmark, or customisation note" value={details.note} onChange={(event) => setField("note", event.target.value)} />

            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setField("fulfillmentMethod", "delivery")}
                className={`rounded-[24px] border p-4 text-left ${fulfillmentMethod === "delivery" ? "border-[rgba(214,195,162,0.32)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.025)]"}`}
              >
                <MapPin className="h-5 w-5 text-[var(--veloura-accent)]" />
                <p className="mt-4 text-sm text-[var(--veloura-text)]">Express delivery</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Doorstep dispatch and courier updates</p>
              </button>
              <button
                type="button"
                onClick={() => setField("fulfillmentMethod", "pickup")}
                className={`rounded-[24px] border p-4 text-left ${fulfillmentMethod === "pickup" ? "border-[rgba(214,195,162,0.32)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.025)]"}`}
              >
                <Store className="h-5 w-5 text-[var(--veloura-accent)]" />
                <p className="mt-4 text-sm text-[var(--veloura-text)]">Physical pickup</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Walk in or reserve showroom pickup in Lekki</p>
              </button>
            </div>

            {fulfillmentMethod === "pickup" ? (
              <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5 text-sm leading-7 text-[var(--veloura-muted)]">
                Pickup orders are reserved, then the team sends a confirmation time window, showroom directions, and collection instructions. A valid name and phone number are required before pickup is released.
              </div>
            ) : null}

            <Button type="submit" className="w-full sm:w-auto">
              Continue to payment
            </Button>
          </form>
        ) : (
          <div className="panel animate-fade-up space-y-6 rounded-[30px] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">Payment path</p>
                <h2 className="font-display text-3xl text-[var(--veloura-text)]">Choose how this order closes.</h2>
              </div>
              <Button variant="outline" onClick={() => setStep(1)}>
                Edit details
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Link href={hairHref(`/checkout/transfer?fulfillment=${fulfillmentMethod}`)} className="panel-soft rounded-[26px] p-5 transition hover:bg-white/8">
                <p className="text-lg text-[var(--veloura-text)]">Bank transfer</p>
                <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">See the account details, upload your receipt, or request automatic verification.</p>
              </Link>
              <Link href={hairHref(`/checkout/paystack?fulfillment=${fulfillmentMethod}`)} className="panel-soft rounded-[26px] p-5 transition hover:bg-white/8">
                <p className="text-lg text-[var(--veloura-text)]">Pay online</p>
                <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">Continue through a full card-payment flow with card number, expiry, CVV, and authorization.</p>
              </Link>
              <Link href={hairHref(`/checkout/whatsapp?fulfillment=${fulfillmentMethod}`)} className="panel-soft rounded-[26px] p-5 transition hover:bg-white/8">
                <p className="text-lg text-[var(--veloura-text)]">Send to WhatsApp</p>
                <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">Preview the order summary first, then hand it over to customer service on WhatsApp.</p>
              </Link>
            </div>

            <div className="rounded-[26px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5 text-sm leading-7 text-[var(--veloura-muted)]">
              {fulfillmentMethod === "pickup"
                ? "Pickup selected: once payment is confirmed, the team sends the showroom address, reservation window, and collection contact instructions."
                : "Delivery selected: once payment is confirmed, the team prepares dispatch and sends delivery updates by email or WhatsApp."}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="panel animate-glow rounded-[30px] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">Order summary</p>
              <h2 className="mt-2 text-2xl text-[var(--veloura-text)]">Clean, visible, conversion-ready.</h2>
            </div>
            <div className="rounded-full border border-[rgba(125,211,199,0.2)] bg-[rgba(125,211,199,0.08)] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[var(--veloura-highlight)]">
              {fulfillmentMethod === "pickup" ? "Pickup flow" : "Delivery flow"}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {previewItems.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.02)] p-3">
                <div className="relative h-24 w-20 overflow-hidden rounded-[18px]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex flex-1 items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-[var(--veloura-text)]">{item.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--veloura-muted)]">{item.variantLabel}</p>
                    <p className="mt-3 text-sm text-[var(--veloura-muted)]">Qty {item.quantity}</p>
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
              <span>{fulfillmentMethod === "pickup" ? "Pickup" : "Shipping"}</span>
              <span>{fulfillmentMethod === "pickup" ? "Complimentary" : shipping ? formatPrice(shipping) : "Complimentary"}</span>
            </div>
            <div className="flex justify-between border-t border-[var(--veloura-line)] pt-3 text-base text-[var(--veloura-text)]">
              <span>Total</span>
              <span>{formatPrice(fulfillmentMethod === "pickup" ? displaySubtotal : displayTotal)}</span>
            </div>
          </div>
        </div>

        <div className="panel-soft rounded-[30px] p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--veloura-accent)]">Physical store</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--veloura-muted)]">
            <p>Veloura has a walk-in store at 12A Admiralty Way, Lekki Phase 1, Lagos.</p>
            <p>Pickup clients get a reservation window and collection contact once payment or order confirmation is complete.</p>
          </div>
          <Button asChild variant="ghost" className="mt-4 px-0">
            <Link href={hairHref("/contact")}>
              View showroom details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
