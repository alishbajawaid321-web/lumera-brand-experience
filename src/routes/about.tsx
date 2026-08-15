import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Scissors, Compass, HandHeart } from "lucide-react";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import story from "@/assets/story.jpg";
import promo from "@/assets/promo.jpg";
import colSoft from "@/assets/col-soft.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About LUMÉRA — Our Story & Craft" },
      {
        name: "description",
        content:
          "The LUMÉRA story: a Copenhagen atelier working in restrained silhouettes, considered materials and responsible European craftsmanship.",
      },
      { property: "og:title", content: "About LUMÉRA — Our Story & Craft" },
      {
        property: "og:description",
        content: "Philosophy, craftsmanship, sustainability and the values behind LUMÉRA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    Icon: Compass,
    title: "Considered design",
    body: "Every piece begins with a question: will this still feel right in ten years? If the answer is no, it never leaves the studio.",
  },
  {
    Icon: Scissors,
    title: "Craft first",
    body: "We work with small family-run ateliers in Portugal and Italy, many of which have shaped the same cloth for three generations.",
  },
  {
    Icon: Leaf,
    title: "Responsible materials",
    body: "Certified wool, organic cotton, European linen and recycled hardware. We publish our mills and we visit them.",
  },
  {
    Icon: HandHeart,
    title: "Made to be kept",
    body: "Complimentary repairs for two years on every garment, because longevity is the most meaningful form of sustainability.",
  },
];

function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <PageHeader
        eyebrow="Our house"
        title="A quiet kind of luxury"
        description="LUMÉRA was founded in Copenhagen in 2016 around a single idea: that clothing should be calm, precise and made to outlast the season it was born in."
      />

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <img
            src={story}
            alt="LUMÉRA atelier, fabric laid out on a cutting table"
            width={1200}
            height={900}
            loading="lazy"
            className="aspect-4/3 w-full object-cover"
          />
          <div>
            <p className="eyebrow text-muted-foreground">The story</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">How LUMÉRA began</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Our founder, Elise Marchand, spent a decade in couture ateliers before returning to
                Copenhagen with a small collection of nine garments and a rented studio above a
                bookbinder. Those nine pieces — a coat, a column dress, a pair of pleated trousers —
                still define the house today.
              </p>
              <p>
                LUMÉRA grew slowly and on purpose. We release two considered collections a year
                rather than twelve, so each piece can be developed with the mill, sampled properly
                and worn by the studio before it reaches you.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="border-y border-border py-14 text-center">
          <p className="eyebrow text-muted-foreground">Philosophy</p>
          <blockquote className="mx-auto mt-5 max-w-3xl font-display text-2xl leading-snug sm:text-4xl">
            “Design should remove noise, not add it. What remains — the line, the cloth, the way a
            sleeve falls — is the whole point.”
          </blockquote>
          <p className="eyebrow mt-6 text-muted-foreground">Elise Marchand, Founder</p>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="eyebrow text-muted-foreground">Craftsmanship</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Made by hands we know</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Tailoring is cut in northern Portugal, knitwear in a mill outside Florence, and silk
                is woven in Como. Nothing is produced in volumes larger than the workshop can
                comfortably hold.
              </p>
              <p>
                A single LUMÉRA coat passes through eleven pairs of hands. The lapel is pressed
                three times, the buttonholes are finished by hand, and the finished garment is
                rested for 48 hours before it is packed.
              </p>
            </div>
          </div>
          <img
            src={promo}
            alt="Close detail of hand-finished tailoring in the LUMÉRA workshop"
            width={1200}
            height={900}
            loading="lazy"
            className="order-1 aspect-4/3 w-full object-cover lg:order-2"
          />
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-muted-foreground">What we stand for</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Our values</h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} className="bg-background p-8">
              <v.Icon className="h-6 w-6" aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <img
            src={colSoft}
            alt="Models wearing soft neutral LUMÉRA layers"
            width={1200}
            height={900}
            loading="lazy"
            className="aspect-4/3 w-full object-cover"
          />
          <div>
            <p className="eyebrow text-muted-foreground">Sustainability</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Fewer, better, longer</h2>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Traceable cloth.</strong> 92% of our fabrics are
                certified organic, recycled or mulesing-free, sourced within Europe.
              </li>
              <li>
                <strong className="text-foreground">Low-waste patterns.</strong> Our cutting plans
                are nested to keep offcuts under 8%; remnants become our scarves and pouches.
              </li>
              <li>
                <strong className="text-foreground">Repair, don't replace.</strong> Two years of
                complimentary repairs, and a re-dye service for pieces that have lost their depth.
              </li>
              <li>
                <strong className="text-foreground">Plastic-free delivery.</strong> Recycled paper,
                paper tape, and a garment bag made from remnant cotton.
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal className="border border-border px-6 py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Explore the collection</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Everything we make is here — tailoring, knitwear, evening pieces and our modest edit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="eyebrow bg-foreground px-9 py-4 text-background transition-opacity hover:opacity-85"
            >
              Shop all
            </Link>
            <Link
              to="/modest-wear"
              className="eyebrow border border-foreground px-9 py-4 transition-colors hover:bg-foreground hover:text-background"
            >
              The Modest Edit
            </Link>
            <Link
              to="/contact"
              className="eyebrow border border-border px-9 py-4 transition-colors hover:border-foreground"
            >
              Contact us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
