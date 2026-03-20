import { cn } from "@/lib/utils";

type StatusChipProps = {
  label: string;
  tone?: "default" | "success" | "warning" | "danger";
};

export function StatusChip({ label, tone = "default" }: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]",
        tone === "default" && "bg-white/5 text-[#d8c2b6]",
        tone === "success" && "bg-emerald-500/10 text-emerald-300",
        tone === "warning" && "bg-amber-500/10 text-amber-300",
        tone === "danger" && "bg-rose-500/10 text-rose-300",
      )}
    >
      {label}
    </span>
  );
}


