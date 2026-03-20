import { PageHero } from "@/components/shared/page-hero";
import { PaystackCheckout } from "@/components/storefront/paystack-checkout";

export default async function PaystackPage({ searchParams }: { searchParams: Promise<{ fulfillment?: string }> }) {
  const params = await searchParams;

  return (
    <div className="pb-16">
      <PageHero eyebrow="Pay Online" title="Review the amount, enter your card details, and finish the flow." description="This screen currently uses a mock Paystack-style experience so shoppers can still move through online payment and into confirmation without a live gateway dependency." />
      <PaystackCheckout fulfillment={params.fulfillment} />
    </div>
  );
}
