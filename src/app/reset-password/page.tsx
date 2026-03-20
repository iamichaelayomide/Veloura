import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Reset Password" title="Choose a new password." description="Form state is ready to connect to token-based recovery handling." />
      <section className="site-shell mt-10 max-w-xl rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
        <form className="space-y-4">
          <Input placeholder="New password" type="password" />
          <Input placeholder="Confirm password" type="password" />
          <Button type="submit">Update password</Button>
        </form>
      </section>
    </div>
  );
}


