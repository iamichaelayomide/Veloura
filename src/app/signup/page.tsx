import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { hairHref } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Create Account" title="Save orders, addresses, and wishlist details." description="Guest checkout stays available, but accounts support repeat customers and cleaner order tracking." />
      <section className="site-shell mt-10 max-w-xl rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
        <form className="space-y-4">
          <Input placeholder="Full name" />
          <Input placeholder="Email address" type="email" />
          <Input placeholder="Password" type="password" />
          <Button type="submit">Create account</Button>
        </form>
        <p className="mt-6 text-sm text-[#bca79d]">
          Already have an account? <Link href={hairHref("/login")} className="text-[#c58b74]">Sign in</Link>
        </p>
      </section>
    </div>
  );
}




