import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { itemKey, useStore } from "@/lib/store";
import { effectivePrice, formatPrice, getProduct } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Bag — LUMÉRA" },
      { name: "description", content: "Review the pieces in your LUMÉRA shopping bag before checkout." },
      { property: "og:title", content: "Shopping Bag — LUMÉRA" },
      { property: "og:description", content: "Review your LUMÉRA bag before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQuantity, removeFromCart, subtotal, cartCount } = useStore();
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 18;

  return (
    <>
      <Breadcrumbs items={[{ label: "Shopping Bag" }]} />
      <PageHeader eyebrow="Your selection" title="Shopping Bag" />

      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-8">
        {cart.length === 0 ? (
          <div className="border border-border px-6 py-24 text-center">
            <h2 className="font-display text-3xl">Your bag is empty</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Nothing here yet. Explore the collection and add the pieces you love.
            </p>
            <Link
              to="/shop"
              className="eyebrow mt-8 inline-block bg-foreground px-9 py-4 text-background transition-opacity hover:opacity-85"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
            <ul className="divide-y divide-border border-y border-border">
              {cart.map((item) => {
                const product = getProduct(item.id);
                if (!product) return null;
                const key = itemKey(item);
                const price = effectivePrice(product);
                return (
                  <li
                    key={key}
                    className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:gap-6"
                  >
                    <Link to="/product/$productId" params={{ productId: product.id }}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        width={900}
                        height={1200}
                        loading="lazy"
                        className="aspect-3/4 w-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0">
                      <h2 className="font-display text-xl">
                        <Link
                          to="/product/$productId"
                          params={{ productId: product.id }}
                          className="link-underline"
                        >
                          {product.name}
                        </Link>
                      </h2>
                      <p className="eyebrow mt-1 text-muted-foreground">
                        {item.size} · {item.color}
                      </p>
                      <p className="mt-2 text-sm">{formatPrice(price)}</p>

                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            onClick={() => setQuantity(key, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                            className="grid h-10 w-10 place-items-center transition-colors hover:bg-secondary"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(key, item.quantity + 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                            className="grid h-10 w-10 place-items-center transition-colors hover:bg-secondary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(key)}
                          className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                    <p className="col-span-2 text-right text-sm sm:col-span-1 sm:text-left">
                      {formatPrice(price * item.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <aside className="h-max border border-border p-6 lg:sticky lg:top-28">
              <h2 className="font-display text-2xl">Order summary</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <Row label={`Items (${cartCount})`} value={formatPrice(subtotal)} />
                <Row label="Shipping" value={shipping === 0 ? "Complimentary" : formatPrice(shipping)} />
                <div className="border-t border-border pt-3">
                  <Row label="Total" value={formatPrice(subtotal + shipping)} strong />
                </div>
              </dl>
              <Link
                to="/checkout"
                className="eyebrow mt-6 block bg-foreground py-4 text-center text-background transition-opacity hover:opacity-85"
              >
                Proceed to checkout
              </Link>
              <Link
                to="/shop"
                className="eyebrow mt-3 block border border-border py-4 text-center transition-colors hover:border-foreground"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className={strong ? "font-display text-lg" : "text-muted-foreground"}>{label}</dt>
      <dd className={strong ? "font-display text-lg" : ""}>{value}</dd>
    </div>
  );
}
