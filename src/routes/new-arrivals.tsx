import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/page-header";
import { ProductBrowser } from "@/components/product-browser";
import { Reveal } from "@/components/reveal";
import { PRODUCTS } from "@/data/products";
import banner from "@/assets/col-soft.jpg";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — LUMÉRA" },
      {
        name: "description",
        content:
          "The newest LUMÉRA pieces: fresh tailoring, silk and knitwear added to the atelier this season.",
      },
      { property: "og:title", content: "New Arrivals — LUMÉRA" },
      { property: "og:description", content: "The newest pieces from the LUMÉRA atelier." },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  const products = PRODUCTS.filter((p) => p.isNew);
  return (
    <>
      <Breadcrumbs items={[{ label: "New Arrivals" }]} />
      <section className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden">
          <img
            src={banner}
            alt="Models in soft neutral LUMÉRA layers"
            width={1400}
            height={1000}
            className="h-[340px] w-full object-cover sm:h-[420px]"
          />
          <div className="absolute inset-0 bg-ink/30" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-ink-foreground sm:p-12">
            <p className="eyebrow">Arrived this week</p>
            <h1 className="mt-3 font-display text-4xl sm:text-6xl">New Arrivals</h1>
            <p className="mt-3 max-w-lg text-sm text-ink-foreground/85">
              {products.length} new pieces, cut in the season's silks, wools and fine-gauge knits.
            </p>
          </div>
        </Reveal>
      </section>
      <div className="pt-12">
        <ProductBrowser products={products} />
      </div>
    </>
  );
}
