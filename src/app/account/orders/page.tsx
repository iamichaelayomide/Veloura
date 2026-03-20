import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { orders } from "@/data/catalog";
import { hairHref } from "@/lib/routes";
import { formatDate, formatPrice } from "@/lib/utils";

export default function AccountOrdersPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Orders" title="Order history" description="Track each order number, payment state, and fulfillment progress." />
      <section className="site-shell mt-10 space-y-4">
        {orders.map((order) => (
          <Link key={order.id} href={hairHref(`/account/orders/${order.orderNumber}`)} className="block rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg text-[#f8efe8]">{order.orderNumber}</p>
                <p className="mt-1 text-sm text-[#bca79d]">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#f8efe8]">{formatPrice(order.total)}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#c58b74]">{order.fulfillmentStatus}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}




