import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { formatPrice, searchProducts, CATEGORIES } from "@/data/products";
import { cn } from "@/lib/utils";

export function SearchOverlay({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query).slice(0, 8), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-400",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close search"
        tabIndex={open ? 0 : -1}
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-ink/40"
      />
      <div
        role="dialog"
        aria-label="Search products"
        aria-modal={open}
        className={cn(
          "absolute inset-x-0 top-0 max-h-[92vh] overflow-y-auto bg-background transition-transform duration-500 ease-out",
          open ? "translate-y-0" : "-translate-y-6",
        )}
      >
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-muted-foreground">Search LUMÉRA</p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close search"
              tabIndex={open ? 0 : -1}
              className="grid h-9 w-9 place-items-center"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 border-b border-foreground pb-3">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <label htmlFor="site-search" className="sr-only">
              Search for products
            </label>
            <input
              id="site-search"
              value={query}
              autoComplete="off"
              tabIndex={open ? 0 : -1}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dresses, tailoring, silk…"
              className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-muted-foreground sm:text-3xl"
            />
          </div>

          {!query && (
            <div className="mt-8">
              <p className="eyebrow text-muted-foreground">Popular categories</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => setQuery(c)}
                    className="border border-border px-4 py-2 text-sm transition-colors hover:border-foreground"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="mt-12 border border-border px-6 py-14 text-center">
              <h2 className="font-display text-2xl">No products found</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                We couldn't find anything matching “{query}”. Try a different word, or explore the
                full collection.
              </p>
              <Link
                to="/shop"
                tabIndex={open ? 0 : -1}
                onClick={() => onOpenChange(false)}
                className="eyebrow mt-6 inline-block bg-foreground px-8 py-3.5 text-background transition-opacity hover:opacity-85"
              >
                Continue shopping
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <ul className="mt-8 divide-y divide-border">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/product/$productId"
                    params={{ productId: p.id }}
                    tabIndex={open ? 0 : -1}
                    onClick={() => onOpenChange(false)}
                    className="group grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 py-4"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      width={900}
                      height={1200}
                      loading="lazy"
                      className="h-20 w-16 object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-display text-lg group-hover:underline">
                        {p.name}
                      </span>
                      <span className="eyebrow block text-muted-foreground">{p.category}</span>
                    </span>
                    <span className="text-sm">{formatPrice(p.salePrice ?? p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
