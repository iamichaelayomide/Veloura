import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SurfaceCard } from "@/components/shared/surface-card";

export function NewsletterBlock() {
  return (
    <SurfaceCard className="veloura-grid relative overflow-hidden grid gap-6 p-8 lg:grid-cols-[1.1fr_.9fr] lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,195,162,0.14),transparent_28%)]" />
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">Private List</p>
        <h3 className="font-display text-3xl text-[var(--veloura-text)]">Get first access to the drops, restocks, and care tips that help your hair stay expensive-looking.</h3>
        <p className="max-w-xl text-sm leading-7 text-[var(--veloura-muted)]">
          Join for sale alerts, product drops, pickup updates, and simple guidance on what to buy if you want something fuller, softer, or easier to maintain.
        </p>
      </div>

      <form className="grid gap-3 self-end sm:grid-cols-[1fr_auto]">
        <Input placeholder="Email address" type="email" />
        <Button type="submit">Join the list</Button>
      </form>
    </SurfaceCard>
  );
}


