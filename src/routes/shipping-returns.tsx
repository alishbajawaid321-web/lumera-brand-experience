import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — LUMÉRA" },
      {
        name: "description",
        content: "LUMÉRA shipping times, rates and returns policy. Complimentary shipping over $250 and free returns within the EU, UK and US.",
      },
      { property: "og:title", content: "Shipping & Returns — LUMÉRA" },
      { property: "og:description", content: "Shipping times, rates and returns policy for LUMÉRA orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShippingReturnsPage,
});

function ShippingReturnsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Shipping & Returns" }]} />
      <PageHeader
        eyebrow="Client care"
        title="Shipping & Returns"
        description="Simple, transparent delivery and a generous returns window so you can order with confidence."
      />
      <section className="mx-auto max-w-3xl space-y-16 px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-2xl">Delivery</h2>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li><strong className="text-foreground">Standard delivery:</strong> 2–4 business days in Europe; 4–7 business days worldwide.</li>
            <li><strong className="text-foreground">Express delivery:</strong> 1–2 business days in Europe; 2–4 business days worldwide. Available at checkout.</li>
            <li><strong className="text-foreground">Complimentary shipping:</strong> On all orders over $250.</li>
            <li><strong className="text-foreground">Order tracking:</strong> You will receive a tracking link by email as soon as your order is dispatched.</li>
          </ul>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-2xl">Returns</h2>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li><strong className="text-foreground">Window:</strong> Returns are accepted within 30 days of delivery.</li>
            <li><strong className="text-foreground">Condition:</strong> Items must be unworn, unwashed and have all original tags attached.</li>
            <li><strong className="text-foreground">Free returns:</strong> Complimentary within the EU, UK and US. For other regions, return shipping is the customer's responsibility.</li>
            <li><strong className="text-foreground">Refunds:</strong> Processed within five business days of the return arriving at our atelier.</li>
          </ul>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-2xl">Exchanges</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            We do not process direct exchanges. If you need a different size or colour, please return the original item and place a new order to secure availability.
          </p>
        </Reveal>
        <Reveal className="border border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">Need help with an order?</p>
          <Link to="/contact" className="eyebrow link-underline mt-2 inline-block">
            Contact client care
          </Link>
        </Reveal>
      </section>
    </>
  );
}
