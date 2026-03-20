import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Contact" title="Need styling, order, or customisation support?" description="Reach the team through form, WhatsApp, or email. Structured support helps premium service stay premium." />
      <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <form className="space-y-4 rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
          <Input placeholder="Your name" />
          <Input placeholder="Email address" type="email" />
          <Input placeholder="Phone number" />
          <Textarea placeholder="Tell us what you need help with" />
          <Button type="submit">Send message</Button>
        </form>
        <div className="space-y-4 rounded-[28px] border border-white/10 bg-[#120c0b] p-6 text-sm text-[#bca79d]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#c58b74]">WhatsApp</p>
            <p className="mt-2 text-[#f8efe8]">{siteConfig.phone}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#c58b74]">Email</p>
            <p className="mt-2 text-[#f8efe8]">{siteConfig.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#c58b74]">Showroom</p>
            <p className="mt-2 text-[#f8efe8]">{siteConfig.address}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#c58b74]">Hours</p>
            <p className="mt-2 text-[#f8efe8]">Mon to Sat, 10 AM to 7 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
}


