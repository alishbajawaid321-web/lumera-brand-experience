import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — LUMÉRA" },
      {
        name: "description",
        content: "LUMÉRA privacy policy: how we collect, use and protect your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — LUMÉRA" },
      { property: "og:description", content: "How LUMÉRA collects, uses and protects your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your privacy matters. This policy explains what information we collect and how we use it."
      />
      <section className="mx-auto max-w-3xl space-y-10 px-4 pb-24 text-sm leading-relaxed text-muted-foreground sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-xl text-foreground">Information we collect</h2>
          <p className="mt-3">
            We collect information you provide directly, such as your name, email, shipping address and payment details when you place an order or subscribe to our atelier letter.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-foreground">How we use your information</h2>
          <p className="mt-3">
            We use your information to process orders, communicate with you, improve our products and services, and send you marketing communications if you have opted in.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-foreground">Data sharing</h2>
          <p className="mt-3">
            We do not sell your personal information. We share data only with trusted service providers who help us operate our business, such as payment processors and shipping carriers.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-foreground">Your rights</h2>
          <p className="mt-3">
            You have the right to access, correct or delete your personal information. To exercise these rights, contact us at care@lumera.com.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-xl text-foreground">Changes to this policy</h2>
          <p className="mt-3">
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>
        </Reveal>
      </section>
    </>
  );
}
