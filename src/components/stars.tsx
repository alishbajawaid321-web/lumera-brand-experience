import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  reviews,
  className,
}: {
  rating: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              "h-3 w-3",
              i <= Math.round(rating) ? "fill-foreground text-foreground" : "text-border",
            )}
          />
        ))}
      </span>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}
        {reviews !== undefined ? ` (${reviews})` : ""}
      </span>
      <span className="sr-only">
        Rated {rating} out of 5{reviews !== undefined ? ` from ${reviews} reviews` : ""}
      </span>
    </div>
  );
}
