import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Check } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact LUMÉRA — Client Care" },
      {
        name: "description",
        content:
          "Reach LUMÉRA client care by email, phone or in person at our Copenhagen atelier. Send a message and we reply within one business day.",
      },
      { property: "og:title", content: "Contact LUMÉRA — Client Care" },
      {
        property: "og:description",
        content: "Email, phone, atelier address and a direct line to LUMÉRA client care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
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
];

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", handle: "@lumera" },
  { Icon: Facebook, label: "Facebook", handle: "LUMÉRA" },
  { Icon: Twitter, label: "X", handle: "@lumera" },
  { Icon: Youtube, label: "YouTube", handle: "LUMÉRA Atelier" },
];

type Errors = { name?: string; email?: string; subject?: string; message?: string };

function ContactPage() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof values) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10)
      next.message = "Please tell us a little more (at least 10 characters).";
    return next;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSent(true);
    setValues({ name: "", email: "", subject: "", message: "" });
    toast.success("Thank you! Your message has been received.", {
      description: "A member of our client care team will reply within one business day.",
    });
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <PageHeader
        eyebrow="Client care"
        title="Contact us"
        description="Questions on sizing, an order, a repair or a private appointment — our Copenhagen team answers every message personally, within one business day."
      />

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          {/* Form */}
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl">Send us a message</h2>

            {sent && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 border border-foreground px-5 py-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p className="text-sm">
                  <strong className="font-normal">Thank you! Your message has been received.</strong>{" "}
                  <span className="text-muted-foreground">
                    A member of our client care team will be in touch within one business day.
                  </span>
                </p>
              </div>
            )}

            <form onSubmit={submit} noValidate className="mt-6 grid gap-5">
              <Field
                id="contact-name"
                label="Name"
                value={values.name}
                onChange={set("name")}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="contact-email"
                label="Email"
                type="email"
                value={values.email}
                onChange={set("email")}
                error={errors.email}
                autoComplete="email"
              />
              <Field
                id="contact-subject"
                label="Subject (optional)"
                value={values.subject}
                onChange={set("subject")}
                required={false}
              />

              <div>
                <label htmlFor="contact-message" className="eyebrow text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  value={values.message}
                  onChange={(e) => set("message")(e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={cn(
                    "mt-2 w-full resize-y border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground",
                    errors.message ? "border-destructive" : "border-border",
                  )}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-2 text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="eyebrow justify-self-start bg-foreground px-10 py-4 text-background transition-opacity hover:opacity-85"
              >
                Send message
              </button>
            </form>
          </Reveal>

          {/* Details */}
          <Reveal delay={100} className="h-max border border-border p-7">
            <h2 className="font-display text-2xl">Contact information</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="eyebrow block text-muted-foreground">Email</span>
                  <a href="mailto:care@lumera.com" className="link-underline">
                    care@lumera.com
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="eyebrow block text-muted-foreground">Phone</span>
                  <a href="tel:+4532180440" className="link-underline">
                    +45 32 18 04 40
                  </a>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Mon–Fri, 09:00–18:00 CET
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="eyebrow block text-muted-foreground">Atelier</span>
                  Bredgade 42, 1st floor
                  <br />
                  1260 Copenhagen K, Denmark
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Private appointments Tue–Sat
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <p className="eyebrow text-muted-foreground">Follow us</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {SOCIALS.map(({ Icon, label, handle }) => (
                  <a
                    key={label}
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${label}: ${handle}`}
                    title={`${label} — ${handle}`}
                    className="grid h-10 w-10 place-items-center border border-border transition-colors hover:border-foreground"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <p className="eyebrow text-muted-foreground">Order enquiries</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Tracking an order? Your order history lives in your account.
              </p>
              <Link to="/account" className="eyebrow link-underline mt-3 inline-block">
                Go to my account
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-3xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-center text-muted-foreground">Answers</p>
          <h2 className="mt-3 text-center font-display text-3xl sm:text-4xl">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Still need help?{" "}
            <a href="mailto:care@lumera.com" className="link-underline text-foreground">
              Email client care
            </a>
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  type?: string;
  autoComplete?: string | undefined;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-2 w-full border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground",
          error ? "border-destructive" : "border-border",
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
