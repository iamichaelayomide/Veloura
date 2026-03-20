import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="border-b border-[var(--veloura-line)] bg-[rgba(8,10,15,0.95)] px-4 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--veloura-accent)]">
      {siteConfig.announcement}
    </div>
  );
}


