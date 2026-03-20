"use client";

import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import { useServiceBookingStore } from "@/store/useServiceBookingStore";

import { ServiceBookingRecap } from "./service-booking-recap";

export function ServicePaystackVerification() {
  const booking = useServiceBookingStore((state) => state.booking);

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
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">Payment confirmation</p>
        <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Confirm that the online payment went through.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--veloura-muted)]">
          Once the client confirms successful payment here, the appointment moves into the booked state and the final screen can show the reminder details.
        </p>

        <div className="mt-6 rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
          <p className="text-[var(--veloura-text)]">Before you continue</p>
          <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">Make sure the card payment was approved. The next screen will show that the appointment is booked and remind the client to check SMS and email for the date and time details.</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href={hairHref("/services/booking/success?method=paystack")}>Payment was successful</a>
          </Button>
          <Button asChild variant="outline">
            <a href={hairHref("/services/checkout/paystack")}>Go back to payment</a>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <ServiceBookingRecap />
      </div>
    </section>
  );
}
