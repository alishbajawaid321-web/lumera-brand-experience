import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { COLLECTIONS, PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — LUMÉRA" },
      {
        name: "description",
        content:
          "Explore the LUMÉRA collections: The Essential Edit, Midnight, Soft Minimalism, Urban Muse and Autumn Atelier.",
      },
      { property: "og:title", content: "Collections — LUMÉRA" },
      { property: "og:description", content: "Five collections from the LUMÉRA atelier." },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Collections" }]} />
      <PageHeader
        eyebrow="Editorial"
        title="Collections"
        description="Five distinct wardrobes, each developed around a single idea, a fabric family and a tightly held palette."
      />
      <div className="mx-auto max-w-[1400px] space-y-16 px-4 pb-20 sm:px-6 lg:px-8">
        {COLLECTIONS.map((c, i) => {
          const count = PRODUCTS.filter((p) => p.collection === c.name).length;
          return (
            <Reveal key={c.slug}>
              <article
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="overflow-hidden">
                  <img
                    src={c.image}
                    alt={`${c.name} campaign imagery`}
                    width={1400}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                  />
                </figure>
                <div className="lg:px-8">
                  <p className="eyebrow text-muted-foreground">{c.tagline}</p>
                  <h2 className="mt-3 font-display text-4xl sm:text-5xl">{c.name}</h2>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {c.description}
                  </p>
                  <p className="eyebrow mt-5 text-muted-foreground">{count} pieces</p>
                  <Link
                    to="/collections/$slug"
                    params={{ slug: c.slug }}
                    className="eyebrow mt-7 inline-block bg-foreground px-9 py-4 text-background transition-opacity hover:opacity-85"
                  >
                    Explore Collection
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
