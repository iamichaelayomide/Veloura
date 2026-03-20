import { AdminContentPanel } from "@/components/admin/admin-panels";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminContentPage() {
  return (
    <AdminShell title="Content" description="Track homepage sections and content surfaces so launch edits feel organized rather than scattered.">
      <AdminContentPanel />
    </AdminShell>
  );
}
