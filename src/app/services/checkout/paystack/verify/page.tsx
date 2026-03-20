import { PageHero } from "@/components/shared/page-hero";
import { ServicePaystackVerification } from "@/components/storefront/service-paystack-verification";

export default function ServicePaystackVerifyPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Confirm Payment"
        title="One last confirmation before the appointment is booked."
        description="Confirm that the online payment succeeded, then move into the final appointment-confirmation screen."
      />
      <ServicePaystackVerification />
    </div>
  );
}
