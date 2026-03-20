import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { hairHref } from "@/lib/routes";
import { Button } from "@/components/ui/button";

const methodCopy: Record<string, { title: string; payment: string; nextStep: string }> = {
  paystack: {
    title: "Your Paystack payment has been received.",
    payment: "Paid online via Paystack",
    nextStep: "A confirmation email and WhatsApp update will follow once the atelier schedules dispatch.",
  },
  transfer: {
    title: "Your transfer order is pending confirmation.",
    payment: "Bank transfer selected",
    nextStep: "Send your receipt on WhatsApp so the team can verify and release your unit for fulfillment.",
  },
  whatsapp: {
    title: "Your concierge order has been handed to customer service.",
    payment: "WhatsApp assisted order",
    nextStep: "A Veloura advisor will confirm availability, delivery, and payment details with you directly.",
  },
};

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ method?: string; fulfillment?: string }> }) {
  const params = await searchParams;
  const method = methodCopy[params.method ?? "paystack"] ? params.method ?? "paystack" : "paystack";
  const details = methodCopy[method];
  const fulfillment = params.fulfillment === "pickup" ? "pickup" : "delivery";

  return (
    <div className="pb-16">
      <PageHero eyebrow="Confirmed" title="Your order is in motion." description={`Order VEL-240320-1184 has been created. ${details.title}`} />
      <section className="site-shell panel mt-10 rounded-[32px] p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Delivery</p>
            <p className="mt-2 text-sm text-[var(--veloura-text)]">{fulfillment === "pickup" ? "Physical pickup at Lekki showroom" : "Lekki Phase 1, Lagos"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Payment</p>
            <p className="mt-2 text-sm text-[var(--veloura-text)]">{details.payment}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">Next Step</p>
            <p className="mt-2 text-sm text-[var(--veloura-text)]">
              {fulfillment === "pickup"
                ? `${details.nextStep} The pickup reservation window and collection contact will be sent next.`
                : details.nextStep}
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["1", "Order created", "Your checkout details have been captured and the team can now action the order."],
            ["2", fulfillment === "pickup" ? "Pickup preparation" : "Fulfillment in progress", fulfillment === "pickup" ? "The showroom team prepares the order and sends your collection window." : "The fulfillment team prepares dispatch and confirms shipment timing."],
            ["3", fulfillment === "pickup" ? "Ready for collection" : "Tracking updates", fulfillment === "pickup" ? "You receive the collection contact and walk-in pickup instructions." : "Tracking updates are sent by email or WhatsApp as dispatch progresses."],
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
            <Link href={hairHref("/account/orders")}>Track your order</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={hairHref("/shop")}>Continue shopping</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}




