import { AdminDiscountsPanel } from "@/components/admin/admin-panels";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminDiscountsPage() {
  return (
    <AdminShell title="Sales" description="Create and remove promotional codes, and keep the sales menu aligned with what is live, upcoming, or closed.">
      <AdminDiscountsPanel />
    </AdminShell>
  );
}
