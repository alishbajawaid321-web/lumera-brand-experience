import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/page-header";
import { ProductBrowser } from "@/components/product-browser";
import { Reveal } from "@/components/reveal";
import { COLLECTIONS, PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = COLLECTIONS.find((c) => c.slug === params.slug);
    if (!collection) throw notFound();
    return { name: collection.name, tagline: collection.tagline, description: collection.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Collection unavailable — LUMÉRA" }, { name: "robots", content: "noindex" }],
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
  notFoundComponent: CollectionNotFound,
  component: CollectionPage,
});

function CollectionNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <h1 className="font-display text-4xl">Collection not found</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This collection has been archived. Browse the current collections instead.
      </p>
      <Link
        to="/collections"
        className="eyebrow mt-8 inline-block bg-foreground px-9 py-4 text-background"
      >
        All collections
      </Link>
    </div>
  );
}

function CollectionPage() {
  const { slug } = Route.useParams();
  const collection = COLLECTIONS.find((c) => c.slug === slug)!;
  const products = PRODUCTS.filter((p) => p.collection === collection.name);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Collections", to: "/collections" }, { label: collection.name }]}
      />
      <section className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden">
          <img
            src={collection.image}
            alt={`${collection.name} campaign imagery`}
            width={1400}
            height={1000}
            className="h-[360px] w-full object-cover sm:h-[460px]"
          />
          <div className="absolute inset-0 bg-ink/35" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-ink-foreground sm:p-12">
            <p className="eyebrow">{collection.tagline}</p>
            <h1 className="mt-3 font-display text-4xl sm:text-6xl">{collection.name}</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-foreground/85">
              {collection.description}
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
