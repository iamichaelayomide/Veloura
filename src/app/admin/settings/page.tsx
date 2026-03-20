import { AdminSettingsPanel } from "@/components/admin/admin-panels";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Settings" description="Store communication channels, showroom direction links, pickup guidance, and support details can be managed from one persistent admin surface.">
      <AdminSettingsPanel />
    </AdminShell>
  );
}
