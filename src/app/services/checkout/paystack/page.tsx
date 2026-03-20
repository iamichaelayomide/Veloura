import { PageHero } from "@/components/shared/page-hero";
import { ServicePaystackCheckout } from "@/components/storefront/service-paystack-checkout";

export default function ServicePaystackPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Pay Online"
        title="Review the appointment, enter payment details, and continue."
        description="This appointment payment flow now behaves like a proper online-payment step before the booking is confirmed."
      />
      <ServicePaystackCheckout />
    </div>
  );
}
