import { cn } from "@/lib/utils";

type SurfaceCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SurfaceCard({ children, className }: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "panel rounded-[30px]",
        className,
      )}
    >
      {children}
    </div>
  );
}


