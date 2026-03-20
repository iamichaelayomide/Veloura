import { PageHero } from "@/components/shared/page-hero";
import { TransferCheckout } from "@/components/storefront/transfer-checkout";

export default async function TransferPage({ searchParams }: { searchParams: Promise<{ fulfillment?: string }> }) {
  const params = await searchParams;

  return (
    <div className="pb-16">
      <PageHero eyebrow="Transfer" title="Manual transfer confirmation, handled properly." description="Review the account details, upload your receipt, or keep the order pending for automatic verification." />
      <TransferCheckout fulfillment={params.fulfillment} />
    </div>
  );
}
