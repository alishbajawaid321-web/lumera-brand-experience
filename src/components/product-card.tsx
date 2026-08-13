import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import { Stars } from "@/components/stars";
import { QuickView } from "@/components/quick-view";
import { useStore } from "@/lib/store";
import { formatPrice, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { toggleWishlist, isWishlisted } = useStore();
  const [quickView, setQuickView] = useState(false);
  const saved = isWishlisted(product.id);
  const hoverImage = product.images[1] ?? product.images[0];

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden bg-secondary">
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <div className="relative aspect-3/4 w-full overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              width={900}
              height={1200}
              loading={priority ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:opacity-0"
            />
            <img
              src={hoverImage}
              alt=""
              aria-hidden="true"
              width={900}
              height={1200}
              loading="lazy"
              className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition-all duration-[900ms] ease-out group-hover:scale-100 group-hover:opacity-100"
            />
          </div>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1">
          {product.salePrice ? (
            <span className="eyebrow bg-ink px-2 py-1 text-ink-foreground">Sale</span>
          ) : null}
          {product.isNew ? (
            <span className="eyebrow bg-background px-2 py-1 text-foreground">New</span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 backdrop-blur transition-transform duration-300 hover:scale-110"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              saved ? "fill-foreground text-foreground" : "text-foreground",
            )}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
          <button
            type="button"
            onClick={() => setQuickView(true)}
            className="eyebrow flex w-full items-center justify-center gap-2 bg-background/95 py-3 text-foreground backdrop-blur transition-colors hover:bg-foreground hover:text-background"
          >
            <Eye className="h-3.5 w-3.5" /> Quick view
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-1.5">
        <p className="eyebrow text-muted-foreground">{product.category}</p>
        <h3 className="font-display text-lg leading-tight">
          <Link
            to="/product/$productId"
            params={{ productId: product.id }}
            className="link-underline"
          >
            {product.name}
          </Link>
        </h3>
        <Stars rating={product.rating} reviews={product.reviews} />
        <p className="mt-1 text-sm">
          {product.salePrice ? (
            <>
              <span className="mr-2 font-normal">{formatPrice(product.salePrice)}</span>
              <span className="text-muted-foreground line-through">{formatPrice(product.price)}</span>
            </>
          ) : (
            formatPrice(product.price)
          )}
        </p>
      </div>

      <QuickView product={product} open={quickView} onOpenChange={setQuickView} />
    </article>
  );
}
