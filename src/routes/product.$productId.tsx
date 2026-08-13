import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Stars } from "@/components/stars";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useStore } from "@/lib/store";
import { PRODUCTS, formatPrice, getProduct } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { name: product.name, description: product.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — LUMÉRA" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} — LUMÉRA`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This piece is no longer available. Explore the current collection instead.
      </p>
      <Link to="/shop" className="eyebrow mt-8 inline-block bg-foreground px-9 py-4 text-background">
        Continue shopping
      </Link>
    </div>
  );
}

function ProductPage() {
  const { productId } = Route.useParams();
  const product = getProduct(productId)!;
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, markViewed, recentlyViewed } = useStore();

  const [image, setImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const [color, setColor] = useState(product.colors[0]?.name ?? "Black");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setImage(0);
    setSize(product.sizes[0] ?? "One Size");
    setColor(product.colors[0]?.name ?? "Black");
    setQty(1);
    markViewed(product.id);
  }, [product.id, product.sizes, product.colors, markViewed]);

  const saved = isWishlisted(product.id);
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.collection === product.collection || p.category === product.category),
  ).slice(0, 4);
  const viewed = recentlyViewed
    .filter((id) => id !== product.id)
    .map((id) => getProduct(id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Shop", to: "/shop" },
          { label: product.category },
          { label: product.name },
        ]}
      />

      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <div className="overflow-hidden bg-secondary">
            <img
              src={product.images[image]}
              alt={`${product.name}, view ${image + 1}`}
              width={900}
              height={1200}
              className="aspect-3/4 w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImage(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={image === i}
                className={cn(
                  "h-24 w-20 overflow-hidden border transition-colors",
                  image === i ? "border-foreground" : "border-transparent hover:border-border",
                )}
              >
                <img
                  src={img}
                  alt=""
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">{product.collection}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <p className="text-lg">
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

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <fieldset className="mt-8">
            <legend className="eyebrow mb-3 text-muted-foreground">Colour: {color}</legend>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  style={{ backgroundColor: c.hex }}
                  className={cn(
                    "h-8 w-8 rounded-full border border-border transition-transform hover:scale-110",
                    color === c.name && "ring-1 ring-foreground ring-offset-2",
                  )}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="eyebrow mb-3 text-muted-foreground">Size</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={cn(
                    "min-w-12 border px-4 py-3 text-xs transition-colors",
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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-12 w-12 place-items-center transition-colors hover:bg-secondary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                aria-label="Increase quantity"
                className="grid h-12 w-12 place-items-center transition-colors hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product, size, color, qty)}
              className="eyebrow min-w-40 flex-1 bg-foreground py-4 text-background transition-opacity hover:opacity-85"
            >
              Add to bag
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              className="grid h-12 w-12 place-items-center border border-border transition-colors hover:border-foreground"
            >
              <Heart className={cn("h-4 w-4", saved && "fill-foreground")} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              addToCart(product, size, color, qty);
              navigate({ to: "/checkout" });
            }}
            className="eyebrow mt-3 w-full border border-foreground py-4 transition-colors hover:bg-foreground hover:text-background"
          >
            Buy now
          </button>

          <ul className="mt-8 grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 shrink-0" /> Free shipping over $250
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 shrink-0" /> 30-day returns
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0" /> 2-year repair service
            </li>
          </ul>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="details">
              <AccordionTrigger className="eyebrow">Composition & care</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {product.composition}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="eyebrow">Shipping</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Standard delivery in 3–5 working days, express in 1–2. Complimentary on orders over
                $250. All orders ship carbon-neutral from our Copenhagen studio.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger className="eyebrow">Returns</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Return unworn pieces within 30 days for a full refund. Return labels are included in
                every parcel, and refunds are issued within five working days of arrival.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">You may also like</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {viewed.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">Recently viewed</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
            {viewed.map((p, i) => (
              <Reveal key={p!.id} delay={i * 70}>
                <ProductCard product={p!} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
