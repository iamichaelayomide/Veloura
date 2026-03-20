import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Password Reset" title="Request a reset link." description="Reset and recovery pages are scaffolded for production email flows." />
      <section className="site-shell mt-10 max-w-xl rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
        <form className="space-y-4">
          <Input placeholder="Email address" type="email" />
          <Button type="submit">Send reset link</Button>
        </form>
      </section>
    </div>
  );
}


