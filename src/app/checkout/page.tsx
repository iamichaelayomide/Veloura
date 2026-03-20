import { CheckoutExperience } from "@/components/storefront/checkout-experience";
import { PageHero } from "@/components/shared/page-hero";

export default function CheckoutPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Checkout" title="A polished finish from basket to payment." description="Delivery details first, then a dedicated payment decision screen for transfer, Paystack, or concierge WhatsApp ordering." />
      <CheckoutExperience />
    </div>
  );
}




