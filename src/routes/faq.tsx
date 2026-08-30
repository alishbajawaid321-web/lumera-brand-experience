import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — LUMÉRA" },
      {
        name: "description",
        content: "Answers to common questions about LUMÉRA orders, shipping, returns, sizing and care.",
      },
      { property: "og:title", content: "FAQ — LUMÉRA" },
      { property: "og:description", content: "Common questions about LUMÉRA orders, shipping and returns." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FAQPage,
});

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery is 2–4 business days in Europe and 4–7 days worldwide. Orders over $250 ship complimentary; express is available at checkout.",
  },
  {
    q: "What is your returns policy?",
    a: "Pieces can be returned within 30 days, unworn and with tags attached. Returns are free within the EU, UK and US, and refunds are issued within five business days of arrival.",
  },
  {
    q: "How do I find my size?",
    a: "Each product page lists garment measurements alongside the model's height and size. If you are between sizes in tailoring, we recommend sizing up and having the waist taken in.",
  },
  {
    q: "Do you offer repairs or alterations?",
    a: "Yes. Every LUMÉRA garment includes two years of complimentary repairs. Write to care@lumera.com with your order number and photographs and we will arrange collection.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Orders can be amended within two hours of being placed. Contact client care as quickly as possible and we will do everything we can before the order enters packing.",
  },
  {
    q: "What materials do you use?",
    a: "We use certified wool, organic cotton, European linen, silk from Como and recycled hardware. 92% of our fabrics are certified organic, recycled or mulesing-free.",
  },
  {
    q: "Where are your pieces made?",
    a: "Tailoring is cut in northern Portugal, knitwear in a mill outside Florence, and silk is woven in Como. All production takes place in small European workshops.",
  },
];

function FAQPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <PageHeader
        eyebrow="Answers"
        title="Frequently asked questions"
        description="Everything you might want to know before ordering from the atelier."
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <Accordion type="single" collapsible>
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </>
  );
}
