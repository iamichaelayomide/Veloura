import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { hairHref } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Account" title="Sign in to orders, addresses, and saved products." description="Secure session handling plugs into the current auth layer and can be extended for production providers." />
      <section className="site-shell mt-10 max-w-xl rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
        <form className="space-y-4">
          <Input placeholder="Email address" type="email" />
          <Input placeholder="Password" type="password" />
          <Button type="submit">Sign in</Button>
        </form>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#bca79d]">
          <Link href={hairHref("/signup")}>Create account</Link>
          <Link href={hairHref("/forgot-password")}>Forgot password</Link>
        </div>
      </section>
    </div>
  );
}




