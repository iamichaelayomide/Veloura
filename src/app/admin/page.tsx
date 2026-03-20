import { AdminOverviewPanel, AdminAnalyticsPanel } from "@/components/admin/admin-panels";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminPage() {
  return (
    <AdminShell title="Overview" description="The main Veloura control room: revenue, inventory depth, customer count, order activity, and top-performing products.">
      <AdminOverviewPanel />
      <AdminAnalyticsPanel />
    </AdminShell>
  );
}
