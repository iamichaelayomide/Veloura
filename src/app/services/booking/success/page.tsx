import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { ServiceBookingRecap } from "@/components/storefront/service-booking-recap";
import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";

const paymentCopy = {
  paystack: {
    title: "Your booking has been confirmed.",
    payment: "Paid online",
    nextStep: "Your time slot is locked in and the team can prepare for your appointment.",
  },
  transfer: {
    title: "Your transfer booking has been recorded.",
    payment: "Paid by transfer",
    nextStep: "Your payment note has been saved and the appointment is now waiting for confirmation review.",
  },
} as const;

export default async function ServiceBookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ method?: string }>;
}) {
  const params = await searchParams;
  const method = params.method === "transfer" ? "transfer" : "paystack";
  const details = paymentCopy[method];

  return (
    <div className="pb-16">
      <PageHero eyebrow="Booking Confirmed" title="Your appointment is saved." description={details.title} />
      <section className="site-shell mt-10 space-y-6">
        <ServiceBookingRecap />

        <div className="panel rounded-[32px] p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-accent)]">Payment</p>
              <p className="mt-3 text-base text-[var(--veloura-text)]">{details.payment}</p>
            </div>
            <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-accent)]">Where to see it</p>
              <p className="mt-3 text-base text-[var(--veloura-text)]">Your appointment details now stay saved on this page and in your account screen.</p>
            </div>
            <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-accent)]">Next step</p>
              <p className="mt-3 text-base text-[var(--veloura-text)]">{details.nextStep}</p>
            </div>
            <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-accent)]">Reminder</p>
              <p className="mt-3 text-base text-[var(--veloura-text)]">Check your SMS and email for the appointment date, time, and follow-up reminder details.</p>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
            <p className="text-sm leading-7 text-[var(--veloura-text)]">A confirmation email will be sent with your appointment details, and a reminder will be sent again before your booking date.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={hairHref("/account")}>View saved appointment</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={hairHref("/services")}>Book another service</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={hairHref("/contact")}>Contact support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
