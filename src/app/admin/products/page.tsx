import { AdminProductsPanel } from "@/components/admin/admin-panels";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminProductsPage() {
  return (
    <AdminShell title="Products" description="Add items, remove items, and promote selected products into featured positions from the admin workspace.">
      <AdminProductsPanel />
    </AdminShell>
  );
}
