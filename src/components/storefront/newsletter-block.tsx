import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SurfaceCard } from "@/components/shared/surface-card";

export function NewsletterBlock() {
  return (
    <SurfaceCard className="grid gap-6 p-8 lg:grid-cols-[1.1fr_.9fr] lg:p-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c58b74]">Private List</p>
        <h3 className="font-display text-3xl text-[#f8efe8]">New textures, private restocks, and premium care notes.</h3>
        <p className="max-w-xl text-sm leading-7 text-[#bca79d]">
          Join the list for curated launch alerts, styling edits, and first access to limited drops.
        </p>
      </div>

      <form className="grid gap-3 self-end sm:grid-cols-[1fr_auto]">
        <Input placeholder="Email address" type="email" />
        <Button type="submit">Join</Button>
      </form>
    </SurfaceCard>
  );
}


