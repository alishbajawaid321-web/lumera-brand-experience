import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import {
  CATEGORIES,
  COLOR_FILTERS,
  SIZES,
  effectivePrice,
  formatPrice,
  type Product,
} from "@/data/products";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const MAX_PRICE = 1200;

export function ProductBrowser({
  products,
  initialCategory = "All",
}: {
  products: Product[];
  initialCategory?: string | undefined;
}) {
  const [category, setCategory] = useState<string>(initialCategory ?? "All");
  const [query, setQuery] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (list: string[], value: string, set: (v: string[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = products.filter((p) => {
      if (category === "Sale" && !p.salePrice) return false;
      if (category === "New Arrivals" && !p.isNew) return false;
      if (
        category !== "All" &&
        category !== "Sale" &&
        category !== "New Arrivals" &&
        p.category !== category
      )
        return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (effectivePrice(p) > maxPrice) return false;
      if (
        q &&
        ![p.name, p.category, p.collection, ...p.keywords].join(" ").toLowerCase().includes(q)
      )
        return false;
      return true;
    });

    const sorted = [...result];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
        break;
      case "price-desc":
        sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
        break;
      default:
        sorted.sort(
          (a, b) => Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller)),
        );
    }
    return sorted;
  }, [products, category, query, sizes, colors, maxPrice, sort]);

  const activeCount =
    sizes.length + colors.length + (maxPrice < MAX_PRICE ? 1 : 0) + (category !== "All" ? 1 : 0);

  const reset = () => {
    setCategory("All");
    setSizes([]);
    setColors([]);
    setMaxPrice(MAX_PRICE);
    setQuery("");
  };

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <h3 className="eyebrow mb-3 text-muted-foreground">Category</h3>
        <ul className="space-y-2 text-sm">
          {["All", ...CATEGORIES, "New Arrivals", "Sale"].map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "link-underline text-left transition-colors",
                  category === c ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="eyebrow mb-3 text-muted-foreground">Size</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(sizes, s, setSizes)}
              aria-pressed={sizes.includes(s)}
              className={cn(
                "border px-3 py-2 text-xs transition-colors",
                sizes.includes(s)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="eyebrow mb-3 text-muted-foreground">Colour</h3>
        <div className="flex flex-wrap gap-3">
          {COLOR_FILTERS.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => toggle(colors, c.name, setColors)}
              aria-pressed={colors.includes(c.name)}
              aria-label={c.name}
              title={c.name}
              style={{ backgroundColor: c.hex }}
              className={cn(
                "h-7 w-7 rounded-full border border-border transition-transform hover:scale-110",
                colors.includes(c.name) && "ring-1 ring-foreground ring-offset-2",
              )}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="eyebrow mb-3 text-muted-foreground">Max price</h3>
        <label htmlFor="price-range" className="sr-only">
          Maximum price
        </label>
        <input
          id="price-range"
          type="range"
          min={100}
          max={MAX_PRICE}
          step={20}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-foreground"
        />
        <p className="mt-2 text-sm text-muted-foreground">Up to {formatPrice(maxPrice)}</p>
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={reset}
          className="eyebrow w-full border border-border py-3 transition-colors hover:border-foreground"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
      {/* Category chips */}
      <div className="-mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {["All", ...CATEGORIES, "New Arrivals", "Sale"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "eyebrow whitespace-nowrap border px-4 py-2.5 transition-colors",
                category === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 border-y border-border py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <label htmlFor="browser-search" className="sr-only">
            Search these products
          </label>
          <input
            id="browser-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this selection…"
            className="w-full min-w-0 border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="eyebrow flex shrink-0 items-center gap-2 border border-border px-4 py-2.5 lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            {activeCount > 0 && <span>({activeCount})</span>}
          </button>
          <label htmlFor="sort" className="eyebrow shrink-0 text-muted-foreground">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">{filterPanel}</aside>

        <div>
          <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>

          {filtered.length === 0 ? (
            <div className="border border-border px-6 py-20 text-center">
              <h2 className="font-display text-2xl">No products found</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Nothing matches this combination of filters. Adjust your selection or browse the
                full collection.
              </p>
              <button
                type="button"
                onClick={reset}
                className="eyebrow mt-6 bg-foreground px-8 py-3.5 text-background transition-opacity hover:opacity-85"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <ProductCard product={p} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          filtersOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!filtersOpen}
      >
        <button
          type="button"
          aria-label="Close filters"
          tabIndex={filtersOpen ? 0 : -1}
          onClick={() => setFiltersOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/40 transition-opacity duration-400",
            filtersOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-y-auto bg-background transition-transform duration-500 ease-out",
            filtersOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="eyebrow">Filters</span>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
              tabIndex={filtersOpen ? 0 : -1}
              className="grid h-9 w-9 place-items-center"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-5">{filterPanel}</div>
          <div className="sticky bottom-0 border-t border-border bg-background p-5">
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              tabIndex={filtersOpen ? 0 : -1}
              className="eyebrow w-full bg-foreground py-3.5 text-background"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
