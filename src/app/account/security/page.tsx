import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AccountSecurityPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Security" title="Password management" description="Secure password update surface for authenticated account holders." />
      <section className="site-shell mt-10 max-w-xl rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
        <div className="space-y-4">
          <Input placeholder="Current password" type="password" />
          <Input placeholder="New password" type="password" />
          <Input placeholder="Confirm new password" type="password" />
          <Button>Update password</Button>
        </div>
      </section>
    </div>
  );
}


