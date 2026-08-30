import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { ProductBrowser } from "@/components/product-browser";
import { PRODUCTS } from "@/data/products";

type ShopSearch = { category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch =>
    typeof search["category"] === "string" ? { category: search["category"] as string } : {},
  head: () => ({
    meta: [
      { title: "Shop All — LUMÉRA" },
      {
        name: "description",
        content:
          "Shop the full LUMÉRA collection: dresses, tops, bottoms, outerwear and accessories, with filters for size, colour and price.",
      },
      { property: "og:title", content: "Shop All — LUMÉRA" },
      {
        property: "og:description",
        content: "Dresses, tailoring, knitwear and accessories from the LUMÉRA atelier.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();
  return (
    <>
      <Breadcrumbs items={[{ label: "Shop" }]} />
      <PageHeader
        eyebrow="The collection"
        title="Shop All"
        description="Every piece currently in the atelier. Filter by category, size, colour and price to narrow the selection."
      />
      <ProductBrowser products={PRODUCTS} initialCategory={category ?? "All"} />
    </>
  );
}
