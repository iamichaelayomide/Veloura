import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AccountProfilePage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Profile" title="Customer profile" description="Basic profile editing for account-based customer operations." />
      <section className="site-shell mt-10 max-w-2xl rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input defaultValue="Amina Yusuf" />
          <Input defaultValue="amina@yusufmail.com" />
          <Input defaultValue="+234 803 000 9001" />
          <Input defaultValue="Private Client" />
        </div>
        <Button className="mt-6">Save changes</Button>
      </section>
    </div>
  );
}


