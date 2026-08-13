import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Stars } from "@/components/stars";
import { useStore } from "@/lib/store";
import { formatPrice, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addToCart } = useStore();
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const [color, setColor] = useState(product.colors[0]?.name ?? "Black");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (open) setQty(1);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto rounded-none p-0 sm:max-w-3xl">
        <div className="grid gap-0 sm:grid-cols-2">
          <img
            src={product.images[0]}
            alt={product.name}
            width={900}
            height={1200}
            loading="lazy"
            className="h-56 w-full object-cover sm:h-full"
          />
          <div className="p-6 sm:p-8">
            <DialogHeader className="space-y-2 text-left">
              <p className="eyebrow text-muted-foreground">{product.category}</p>
              <DialogTitle className="font-display text-2xl font-light">{product.name}</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex items-center gap-4">
              <p className="text-base">
                {product.salePrice ? (
                  <>
                    <span className="mr-2">{formatPrice(product.salePrice)}</span>
                    <span className="text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  formatPrice(product.price)
                )}
              </p>
              <Stars rating={product.rating} reviews={product.reviews} />
            </div>

            <fieldset className="mt-6">
              <legend className="eyebrow mb-2 text-muted-foreground">Colour: {color}</legend>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    style={{ backgroundColor: c.hex }}
                    className={cn(
                      "h-7 w-7 rounded-full border transition-transform hover:scale-110",
                      color === c.name ? "ring-1 ring-foreground ring-offset-2" : "",
                    )}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="eyebrow mb-2 text-muted-foreground">Size</legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={cn(
                      "min-w-11 border px-3 py-2 text-xs transition-colors",
                      size === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-10 w-10 place-items-center transition-colors hover:bg-secondary"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="grid h-10 w-10 place-items-center transition-colors hover:bg-secondary"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, size, color, qty);
                  onOpenChange(false);
                }}
                className="eyebrow flex-1 bg-foreground py-3.5 text-background transition-opacity hover:opacity-85"
              >
                Add to bag
              </button>
            </div>

            <Link
              to="/product/$productId"
              params={{ productId: product.id }}
              onClick={() => onOpenChange(false)}
              className="eyebrow link-underline mt-5 inline-block text-muted-foreground"
            >
              View full details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
