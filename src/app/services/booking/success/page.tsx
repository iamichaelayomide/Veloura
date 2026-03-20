import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";

const paymentCopy = {
  paystack: {
    title: "Your booking has been confirmed.",
    payment: "Paid online",
    nextStep: "Your time slot is now locked and the service team can prepare for your appointment.",
  },
  transfer: {
    title: "Your transfer booking has been recorded.",
    payment: "Paid by transfer",
    nextStep: "Your payment note has been captured and the appointment moves into confirmation review.",
  },
} as const;

export default async function ServiceBookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ method?: string; service?: string; day?: string; time?: string; stylist?: string }>;
}) {
  const params = await searchParams;
  const method = params.method === "transfer" ? "transfer" : "paystack";
  const details = paymentCopy[method];

  return (
    <div className="pb-16">
      <PageHero eyebrow="Booking Confirmed" title="Your appointment is in the calendar." description={details.title} />
      <section className="site-shell panel mt-10 rounded-[32px] p-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Service</p>
            <p className="mt-2 text-sm text-[var(--veloura-text)]">{params.service ?? "Booked service"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Appointment time</p>
            <p className="mt-2 text-sm text-[var(--veloura-text)]">
              {params.day && params.time ? `${params.day}, ${params.time}` : "Scheduled slot confirmed"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Stylist</p>
            <p className="mt-2 text-sm text-[var(--veloura-text)]">{params.stylist ?? "Assigned service specialist"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Payment</p>
            <p className="mt-2 text-sm text-[var(--veloura-text)]">{details.payment}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Next step</p>
            <p className="mt-2 text-sm text-[var(--veloura-text)]">{details.nextStep}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Reminder</p>
            <p className="mt-2 text-sm text-[var(--veloura-text)]">Please arrive a little early and message support if you need to reschedule.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["1", "Booking captured", "Your selected service, slot, and contact details have been saved into the booking flow."],
            ["2", "Appointment reserved", "That day and time are now tied to your payment-confirmed booking experience."],
            ["3", "Service day", "The team expects you for the appointment and can follow up if there is any change."],
          ].map(([step, title, copy]) => (
            <div key={step} className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-accent)]">Step {step}</p>
              <p className="mt-3 text-base text-[var(--veloura-text)]">{title}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={hairHref("/services")}>Book another service</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={hairHref("/contact")}>Contact support</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
