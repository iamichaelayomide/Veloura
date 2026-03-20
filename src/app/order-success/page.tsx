import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { hairHref } from "@/lib/routes";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Confirmed" title="Your order is in motion." description="Order VEL-240318-1024 has been received, payment captured, and the fulfillment team has been notified." />
      <section className="site-shell mt-10 rounded-[28px] border border-white/10 bg-[#120c0b] p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#9f8a82]">Delivery</p>
            <p className="mt-2 text-sm text-[#f8efe8]">Lekki Phase 1, Lagos</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#9f8a82]">Payment</p>
            <p className="mt-2 text-sm text-[#f8efe8]">Paid via Paystack</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#9f8a82]">Next Step</p>
            <p className="mt-2 text-sm text-[#f8efe8]">Shipment update will be sent by email and WhatsApp.</p>
          </div>
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




