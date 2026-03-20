import { AdminOrdersPanel } from "@/components/admin/admin-panels";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminOrdersPage() {
  return (
    <AdminShell title="Orders" description="Review order activity and update fulfillment and payment states from a single queue.">
      <AdminOrdersPanel />
    </AdminShell>
  );
}
