import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { hairHref } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Checkout" title="Fast, quiet, trustworthy checkout." description="Guest checkout, returning customer entry, shipping details, payment preference, and a clear premium summary." />
      <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <form className="space-y-6 rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
            <Input placeholder="Email address" type="email" />
            <Input placeholder="Phone number" />
            <Input placeholder="City" />
            <Input placeholder="State" />
          </div>
          <Input placeholder="Street address" />
          <Textarea placeholder="Delivery note, landmark, or pickup instructions" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#c58b74] bg-[#2a1815] p-4">
              <p className="text-sm text-[#f8efe8]">Standard delivery</p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#c58b74]">2 to 5 business days</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-[#f8efe8]">Store pickup</p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#9f8a82]">Lekki showroom</p>
            </div>
          </div>
        </form>

        <div className="rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
          <h2 className="text-2xl text-[#f8efe8]">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm text-[#bca79d]">
            <div className="flex justify-between">
              <span>Velvet Bone Straight Wig</span>
              <span>{formatPrice(285000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatPrice(12000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Coupon</span>
              <span>- {formatPrice(15000)}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-base text-[#f8efe8]">
              <span>Total</span>
              <span>{formatPrice(282000)}</span>
            </div>
          </div>
          <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-[#bca79d]">
            <p>Payment-ready architecture: Paystack, Flutterwave, and Stripe extension points.</p>
            <p>Status model: pending, paid, failed, refunded.</p>
          </div>
          <div className="mt-6 grid gap-3">
            <Button asChild>
              <Link href={hairHref("/order-success")}>Complete order</Link>
            </Button>
            <Button variant="outline">Apply coupon</Button>
          </div>
        </div>
      </section>
    </div>
  );
}




