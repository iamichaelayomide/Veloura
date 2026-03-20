import { AdminCustomersPanel } from "@/components/admin/admin-panels";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminCustomersPage() {
  return (
    <AdminShell title="Customers" description="See customer records, spend levels, loyalty tiers, and contact information in one place.">
      <AdminCustomersPanel />
    </AdminShell>
  );
}
