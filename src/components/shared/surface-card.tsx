import { cn } from "@/lib/utils";

type SurfaceCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SurfaceCard({ children, className }: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(41,28,24,0.92),rgba(19,12,11,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}


