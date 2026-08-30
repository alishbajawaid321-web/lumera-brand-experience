import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — LUMÉRA" },
      {
        name: "description",
        content: "LUMÉRA terms and conditions of sale, use of the website and intellectual property.",
      },
      { property: "og:title", content: "Terms & Conditions — LUMÉRA" },
      { property: "og:description", content: "Terms of sale and use for the LUMÉRA website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The terms that govern your use of the LUMÉRA website and purchases from our atelier."
      />
      <section className="mx-auto max-w-3xl space-y-10 px-4 pb-24 text-sm leading-relaxed text-muted-foreground sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-xl text-foreground">Use of the website</h2>
          <p className="mt-3">
            By accessing this website, you agree to these terms. You may not use the site for any unlawful purpose or in a way that could damage or impair the site.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-foreground">Orders and pricing</h2>
          <p className="mt-3">
            All orders are subject to acceptance and availability. Prices are shown in USD and include applicable taxes where required. We reserve the right to correct pricing errors.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-foreground">Intellectual property</h2>
          <p className="mt-3">
            All content on this website, including images, text, designs and logos, is the property of LUMÉRA or its licensors and is protected by copyright and trademark laws.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-foreground">Limitation of liability</h2>
          <p className="mt-3">
            LUMÉRA is not liable for any indirect, incidental or consequential damages arising from your use of the website or purchase of products.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-foreground">Governing law</h2>
          <p className="mt-3">
            These terms are governed by the laws of Denmark. Any disputes shall be resolved in the courts of Copenhagen.
          </p>
        </Reveal>
      </section>
    </>
  );
}
