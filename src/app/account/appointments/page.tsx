import { PageHero } from "@/components/shared/page-hero";
import { AppointmentsView } from "@/components/storefront/appointments-view";

export default function AccountAppointmentsPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Appointments"
        title="Check your booked appointments in one place."
        description="See the hairdresser, date, time, payment status, and reminder details for every saved appointment."
      />
      <AppointmentsView />
    </div>
  );
}
