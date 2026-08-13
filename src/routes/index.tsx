import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { COLLECTIONS, PRODUCTS } from "@/data/products";
import hero from "@/assets/hero.jpg";
import promo from "@/assets/promo.jpg";
import story from "@/assets/story.jpg";
import colMidnight from "@/assets/col-midnight.jpg";
import colSoft from "@/assets/col-soft.jpg";
import colUrban from "@/assets/col-urban.jpg";
import colAutumn from "@/assets/col-autumn.jpg";
import colEssential from "@/assets/col-essential.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMÉRA — Modern Luxury Fashion House" },
      {
        name: "description",
        content:
          "Discover LUMÉRA: refined tailoring, silk and cashmere in a restrained neutral palette. Shop new arrivals, seasonal collections and best sellers.",
      },
      { property: "og:title", content: "LUMÉRA — Modern Luxury Fashion House" },
      {
        property: "og:description",
        content: "Refined tailoring, silk and cashmere in a restrained neutral palette.",
      },
    ],
  }),
  component: Home,
});

const testimonials = [
  {
    quote:
      "The Élan blazer is the best-cut jacket I own. Three seasons in and it still looks like it left the atelier yesterday.",
    name: "Amara Osei",
    location: "London",
  },
  {
    quote:
      "Everything arrives beautifully finished. The silk weight, the hand-rolled edges — you can feel where the money went.",
    name: "Ines Farrow",
    location: "Paris",
  },
  {
    quote:
      "I bought one dress and ended up rebuilding my wardrobe around the palette. Nothing clashes, everything lasts.",
    name: "Sofia Lindqvist",
    location: "Stockholm",
  },
];

function Home() {
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const seasonal = PRODUCTS.filter((p) => p.collection === "Autumn Atelier").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
          <img
            src={hero}
            alt="Model wearing an ivory silk LUMÉRA dress in a sunlit gallery"
            width={1920}
            height={1200}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-ink/45 via-ink/20 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
            <Reveal className="max-w-xl text-ink-foreground">
              <p className="eyebrow">Autumn / Winter Collection</p>
              <h1 className="mt-5 font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                Dressing quietly,
                <br />
                built to last
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-foreground/85 sm:text-base">
                LUMÉRA makes a small number of pieces each season — precisely cut, honestly made,
                and designed to be worn far beyond the season they arrived in.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="eyebrow bg-background px-9 py-4 text-foreground transition-transform hover:-translate-y-0.5"
                >
                  Shop Collection
                </Link>
                <Link
                  to="/new-arrivals"
                  className="eyebrow border border-ink-foreground/60 px-9 py-4 text-ink-foreground transition-colors hover:bg-ink-foreground hover:text-ink"
                >
                  Explore New Arrivals
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <Section
        eyebrow="Just landed"
        title="New Arrivals"
        link={{ to: "/new-arrivals", label: "View all new arrivals" }}
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {newArrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured collection */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="grid items-center gap-8 lg:grid-cols-2">
          <div className="overflow-hidden">
            <img
              src={colMidnight}
              alt="Model in an all-black Midnight Collection look"
              width={1400}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
            />
          </div>
          <div className="lg:pl-10">
            <p className="eyebrow text-muted-foreground">Featured collection</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Midnight Collection</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Liquid satin, deep black wool and quiet drama. An after-dark wardrobe cut for movement
              and shaped by shadow — eleven pieces, made in limited runs.
            </p>
            <Link
              to="/collections/$slug"
              params={{ slug: "midnight" }}
              className="eyebrow mt-8 inline-block bg-foreground px-9 py-4 text-background transition-opacity hover:opacity-85"
            >
              Explore Collection
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Best sellers */}
      <Section eyebrow="Most wanted" title="Best Sellers" link={{ to: "/shop", label: "Shop all" }}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Seasonal */}
      <Section
        eyebrow="Season edit"
        title="Autumn Atelier"
        link={{ to: "/collections/$slug", params: { slug: "autumn-atelier" }, label: "See the edit" }}
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3">
          {seasonal.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Promo banner */}
      <section className="relative mt-8">
        <div className="relative h-[380px] w-full overflow-hidden sm:h-[440px]">
          <img
            src={promo}
            alt="Model in flowing beige silk against a warm backdrop"
            width={1920}
            height={900}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/25" />
          <div className="relative mx-auto flex h-full max-w-[1400px] items-center justify-end px-4 sm:px-6 lg:px-8">
            <Reveal className="max-w-sm text-right text-ink-foreground">
              <p className="eyebrow">Private release</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">The Silk Archive</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-foreground/85">
                Twelve archive silks re-cut in limited quantities. Once they're gone, the cloth
                doesn't return.
              </p>
              <Link
                to="/shop"
                className="eyebrow mt-7 inline-block bg-background px-9 py-4 text-foreground transition-transform hover:-translate-y-0.5"
              >
                Shop the release
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="eyebrow text-muted-foreground">Our house</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Made slowly, in small numbers
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              LUMÉRA began in a two-room studio in Copenhagen with a single rule: make fewer things,
              and make them properly. Every pattern is drafted in-house, sampled three times, and
              produced by workshops we visit each season.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We work with certified mills, natural fibres and a palette that stays consistent
              year to year, so pieces bought seasons apart still belong together.
            </p>
            <Link to="/about" className="eyebrow link-underline mt-8 inline-block">
              Read our story
            </Link>
          </div>
          <div className="order-1 overflow-hidden lg:order-2">
            <img
              src={story}
              alt="A tailor smoothing ivory fabric across an atelier table"
              width={1400}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
            />
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-center text-muted-foreground">In their words</p>
            <h2 className="mt-4 text-center font-display text-4xl sm:text-5xl">Worn and kept</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="h-full border border-border bg-background p-8">
                  <blockquote className="font-display text-xl leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="eyebrow mt-6 text-muted-foreground">
                    {t.name} — {t.location}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social gallery */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow text-muted-foreground">@lumera.atelier</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Seen in the wild</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-5">
          {[colEssential, colSoft, colUrban, colAutumn, colMidnight].map((img, i) => (
            <Reveal key={i} delay={i * 60}>
              <Link
                to="/collections"
                aria-label="Browse LUMÉRA collections"
                className="group block aspect-square overflow-hidden"
              >
                <img
                  src={img}
                  alt="LUMÉRA campaign photography"
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal className="border border-border bg-sand px-6 py-16 text-center sm:px-12">
          <p className="eyebrow text-muted-foreground">The Atelier Letter</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl sm:text-5xl">
            Collection previews, before anyone else
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Join the list for studio notes, early access and private seasonal releases. Sign up in
            the footer below — one letter a month, never more.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/collections"
              className="eyebrow bg-foreground px-9 py-4 text-background transition-opacity hover:opacity-85"
            >
              Browse collections
            </Link>
            <Link
              to="/about"
              className="eyebrow border border-foreground px-9 py-4 transition-colors hover:bg-foreground hover:text-background"
            >
              About LUMÉRA
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Section({
  eyebrow,
  title,
  link,
  children,
}: {
  eyebrow: string;
  title: string;
  link: { to: string; params?: Record<string, string>; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="eyebrow text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{title}</h2>
        </div>
        <Link
          to={link.to}
          params={link.params as never}
          className="eyebrow link-underline shrink-0 pb-2 text-muted-foreground hover:text-foreground"
        >
          {link.label}
        </Link>
      </Reveal>
      {children}
    </section>
  );
}
