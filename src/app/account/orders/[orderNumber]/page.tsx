import { notFound } from "next/navigation";

import { PageHero } from "@/components/shared/page-hero";
import { orders } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

export default async function AccountOrderDetailPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const order = orders.find((entry) => entry.orderNumber === orderNumber);
  if (!order) notFound();

  return (
    <div className="pb-16">
      <PageHero eyebrow="Order detail" title={order.orderNumber} description={`${order.paymentStatus} payment and ${order.fulfillmentStatus.toLowerCase()} fulfillment.`} />
      <section className="site-shell mt-10 rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={`${item.productName}-${item.variantLabel}`} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 text-sm text-[#bca79d]">
              <div>
                <p className="text-[#f8efe8]">{item.productName}</p>
                <p>{item.variantLabel}</p>
              </div>
              <p>{formatPrice(item.price)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


