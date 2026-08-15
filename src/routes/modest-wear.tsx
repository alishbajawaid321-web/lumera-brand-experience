import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/page-header";
import { ProductBrowser } from "@/components/product-browser";
import { Reveal } from "@/components/reveal";
import { MODEST_HERO, MODEST_PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/modest-wear")({
  head: () => ({
    meta: [
      { title: "Modest Wear — The LUMÉRA Modest Edit" },
      {
        name: "description",
        content:
          "Modern modest fashion from LUMÉRA: abayas, flowing maxi dresses, long tunics, kimono layers and modest evening gowns in a refined neutral palette.",
      },
      { property: "og:title", content: "Modest Wear — The LUMÉRA Modest Edit" },
      {
        property: "og:description",
        content: "Abayas, maxi dresses, tunics and modest evening wear from the LUMÉRA atelier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ModestWear,
});

function ModestWear() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Modest Wear" }]} />
      <section className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden">
          <img
            src={MODEST_HERO}
            alt="Model in a flowing kimono coat and ivory maxi dress from the LUMÉRA modest edit"
            width={1600}
            height={1000}
            className="h-[340px] w-full object-cover sm:h-[460px]"
          />
          <div className="absolute inset-0 bg-ink/25" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-ink-foreground sm:p-12">
            <p className="eyebrow">The Modest Edit</p>
            <h1 className="mt-3 font-display text-4xl sm:text-6xl">Modest Wear</h1>
            <p className="mt-3 max-w-lg text-sm text-ink-foreground/85">
              Full coverage, cut with the same precision as our tailoring. Abayas, flowing maxis,
              long tunics, layered co-ords and modest evening dressing — {MODEST_PRODUCTS.length}{" "}
              pieces designed to be elegant first.
            </p>
          </div>
        </Reveal>
      </section>
      <div className="pt-12">
        <ProductBrowser products={MODEST_PRODUCTS} />
      </div>
    </>
  );
}
