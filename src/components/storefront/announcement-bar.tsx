import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="border-b border-white/10 bg-[#120c0b] px-4 py-3 text-center text-[11px] uppercase tracking-[0.28em] text-[#d9b29f]">
      {siteConfig.announcement}
    </div>
  );
}


