"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hairHref } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";
import { useServiceBookingStore } from "@/store/useServiceBookingStore";

import { ServiceBookingRecap } from "./service-booking-recap";

export function ServicePaystackCheckout() {
  const booking = useServiceBookingStore((state) => state.booking);
  const [cardholder, setCardholder] = useState(booking.customerName);
  const [cardNumber, setCardNumber] = useState("5123 4567 8901 2345");
  const [expiry, setExpiry] = useState("08/29");
  const [cvv, setCvv] = useState("123");
  const [processing, setProcessing] = useState(false);

  function handleContinue() {
    setProcessing(true);
    window.setTimeout(() => {
      window.location.href = hairHref("/services/checkout/paystack/verify");
    }, 900);
  }

  if (!booking.serviceSlug) {
    return (
      <section className="site-shell mt-10">
        <ServiceBookingRecap />
      </section>
    );
  }

  return (
    <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1fr_.92fr]">
      <div className="panel rounded-[30px] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">Online payment</p>
        <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Finish the payment flow before the appointment is confirmed.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--veloura-muted)]">
          This mock payment step lets the client move through a real-looking card flow first, then confirm that payment was successful before the appointment is marked as booked.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input placeholder="Cardholder name" value={cardholder} onChange={(event) => setCardholder(event.target.value)} />
          <Input placeholder="Billing email" type="email" value={booking.email} readOnly />
          <Input placeholder="Card number" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} />
          <Input placeholder="Expiry date" value={expiry} onChange={(event) => setExpiry(event.target.value)} />
          <Input placeholder="CVV" value={cvv} onChange={(event) => setCvv(event.target.value)} />
          <Input placeholder="Billing phone" value={booking.phone} readOnly />
        </div>

        <div className="mt-6 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 text-sm leading-7 text-[var(--veloura-muted)]">
          <p className="text-[var(--veloura-text)]">Payment steps</p>
          <p className="mt-2">1. Review your appointment details.</p>
          <p>2. Enter card details and continue.</p>
          <p>3. Confirm that the payment was successful on the next screen.</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleContinue} disabled={processing}>
            {processing ? "Processing payment..." : `Pay ${formatPrice(booking.servicePrice)}`}
          </Button>
          <Button asChild variant="outline">
            <a href={hairHref(`/services/${booking.serviceSlug}#booking-flow`)}>Back to appointment</a>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <ServiceBookingRecap />
      </div>
    </section>
  );
}
