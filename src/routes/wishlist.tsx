import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Stars } from "@/components/stars";
import { useStore } from "@/lib/store";
import { formatPrice, getProduct } from "@/data/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — LUMÉRA" },
      {
        name: "description",
        content: "The LUMÉRA pieces you have saved. Move them to your bag whenever you are ready.",
      },
      { property: "og:title", content: "Wishlist — LUMÉRA" },
      { property: "og:description", content: "Your saved LUMÉRA pieces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  const items = wishlist.map((id) => getProduct(id)).filter(Boolean);

  return (
    <>
      <Breadcrumbs items={[{ label: "Wishlist" }]} />
      <PageHeader
        eyebrow="Saved for later"
        title="Wishlist"
        description="Pieces you have saved are kept on this device, so they will still be here when you return."
      />

      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="border border-border px-6 py-24 text-center">
            <h2 className="font-display text-3xl">Your wishlist is empty</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Tap the heart on any piece to save it here for later.
            </p>
            <Link
              to="/shop"
              className="eyebrow mt-8 inline-block bg-foreground px-9 py-4 text-background transition-opacity hover:opacity-85"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-8 text-sm text-muted-foreground" aria-live="polite">
              {items.length} saved {items.length === 1 ? "piece" : "pieces"}
            </p>
            <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((product, i) => {
                if (!product) return null;
                return (
                  <Reveal as="li" key={product.id} delay={(i % 4) * 70}>
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
                    <div className="mt-4">
                      <p className="eyebrow text-muted-foreground">{product.category}</p>
                      <h2 className="mt-1 font-display text-lg">
                        <Link
                          to="/product/$productId"
                          params={{ productId: product.id }}
                          className="link-underline"
                        >
                          {product.name}
                        </Link>
                      </h2>
                      <Stars rating={product.rating} reviews={product.reviews} />
                      <p className="mt-1 text-sm">
                        {formatPrice(product.salePrice ?? product.price)}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            addToCart(
                              product,
                              product.sizes[0] ?? "One Size",
                              product.colors[0]?.name ?? "Black",
                              1,
                            )
                          }
                          className="eyebrow flex-1 bg-foreground py-3 text-background transition-opacity hover:opacity-85"
                        >
                          Move to bag
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product.id)}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="grid h-11 w-11 place-items-center border border-border transition-colors hover:border-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
