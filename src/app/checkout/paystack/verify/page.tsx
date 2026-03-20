import { PageHero } from "@/components/shared/page-hero";
import { PaystackVerification } from "@/components/storefront/paystack-verification";

export default async function PaystackVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ fulfillment?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="pb-16">
      <PageHero eyebrow="Payment Processing" title="Finalizing your online payment." description="We are simulating the final approval step before showing your order-confirmation and tracking experience." />
      <PaystackVerification fulfillment={params.fulfillment} />
    </div>
  );
}
