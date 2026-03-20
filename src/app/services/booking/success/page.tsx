import { PageHero } from "@/components/shared/page-hero";
import { ServiceBookingSuccessView } from "@/components/storefront/service-booking-success-view";

export default async function ServiceBookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ method?: string }>;
}) {
  const params = await searchParams;
  const method = params.method === "transfer" ? "transfer" : "paystack";

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Booking Confirmed"
        title="Your appointment has been booked."
        description="Your saved appointment details, payment status, and reminder information are all shown below."
      />
      <ServiceBookingSuccessView method={method} />
    </div>
  );
}
