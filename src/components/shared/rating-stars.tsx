import { Star } from "lucide-react";

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={`${rating}-${index}`}
          className={`h-4 w-4 ${index < Math.round(rating) ? "fill-[var(--veloura-accent)] text-[var(--veloura-accent)]" : "text-[rgba(247,245,239,0.18)]"}`}
        />
      ))}
    </div>
  );
}
