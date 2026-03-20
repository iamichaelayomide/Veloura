import { AdminAnalyticsPanel } from "@/components/admin/admin-panels";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminAnalyticsPage() {
  return (
    <AdminShell title="Analytics" description="A tighter snapshot of revenue movement, best-performing products, and order flow signals.">
      <AdminAnalyticsPanel />
    </AdminShell>
  );
}
