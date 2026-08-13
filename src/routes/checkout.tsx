import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { useStore } from "@/lib/store";
import { effectivePrice, formatPrice, getProduct } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — LUMÉRA" },
      { name: "description", content: "Complete your LUMÉRA order with secure checkout." },
      { property: "og:title", content: "Checkout — LUMÉRA" },
      { property: "og:description", content: "Complete your LUMÉRA order." },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
  address: z.string().trim().min(4, "Enter your street address").max(160),
  city: z.string().trim().min(2, "Enter your city").max(80),
  country: z.string().trim().min(2, "Enter your country").max(80),
  postal: z.string().trim().min(3, "Enter your postal code").max(16),
});

const FIELDS = [
  { name: "fullName", label: "Full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "address", label: "Address", type: "text", autoComplete: "street-address" },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2" },
  { name: "country", label: "Country", type: "text", autoComplete: "country-name" },
  { name: "postal", label: "Postal code", type: "text", autoComplete: "postal-code" },
] as const;

const SHIPPING_METHODS = [
  { id: "standard", label: "Standard delivery", note: "3–5 working days", cost: 0 },
  { id: "express", label: "Express delivery", note: "1–2 working days", cost: 25 },
];

function Checkout() {
  const { cart, subtotal, placeOrder } = useStore();
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, string>>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postal: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState("standard");
  const [payment, setPayment] = useState("card");

  const shippingCost =
    method === "express" ? 25 : subtotal > 250 || subtotal === 0 ? 0 : 18;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    const data = result.data;
    placeOrder(
      {
        name: data.fullName,
        email: data.email,
        address: `${data.address}, ${data.city} ${data.postal}, ${data.country}`,
      },
      shippingCost,
    );
    navigate({ to: "/order-confirmation" });
  };

  if (cart.length === 0) {
    return (
      <>
        <Breadcrumbs items={[{ label: "Checkout" }]} />
        <div className="mx-auto max-w-xl px-4 py-28 text-center">
          <h1 className="font-display text-4xl">Nothing to check out</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Your bag is empty. Add a piece to continue to checkout.
          </p>
          <Link
            to="/shop"
            className="eyebrow mt-8 inline-block bg-foreground px-9 py-4 text-background"
          >
            Continue shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Shopping Bag", to: "/cart" }, { label: "Checkout" }]} />
      <PageHeader eyebrow="Secure checkout" title="Checkout" />

      <form
        onSubmit={submit}
        noValidate
        className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8"
      >
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl">Customer information</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.name} className={f.name === "address" ? "sm:col-span-2" : ""}>
                  <label htmlFor={f.name} className="eyebrow text-muted-foreground">
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    value={values[f.name] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                    aria-invalid={Boolean(errors[f.name])}
                    aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                    className={cn(
                      "mt-2 w-full border bg-background px-4 py-3 text-sm outline-none focus:border-foreground",
                      errors[f.name] ? "border-destructive" : "border-border",
                    )}
                  />
                  {errors[f.name] && (
                    <p id={`${f.name}-error`} className="mt-1.5 text-xs text-destructive">
                      {errors[f.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Shipping method</h2>
            <div className="mt-6 space-y-3">
              {SHIPPING_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 border p-4 transition-colors",
                    method === m.id ? "border-foreground" : "border-border hover:border-foreground/50",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={m.id}
                      checked={method === m.id}
                      onChange={() => setMethod(m.id)}
                      className="accent-foreground"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm">{m.label}</span>
                      <span className="block text-xs text-muted-foreground">{m.note}</span>
                    </span>
                  </span>
                  <span className="shrink-0 text-sm">
                    {m.id === "express"
                      ? formatPrice(25)
                      : subtotal > 250
                        ? "Complimentary"
                        : formatPrice(18)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Payment</h2>
            <div className="mt-6 space-y-3">
              {[
                { id: "card", label: "Credit or debit card", note: "Visa, Mastercard, Amex" },
                { id: "paypal", label: "PayPal", note: "Redirects at confirmation" },
                { id: "transfer", label: "Bank transfer", note: "Ships once cleared" },
              ].map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 border p-4 transition-colors",
                    payment === p.id ? "border-foreground" : "border-border hover:border-foreground/50",
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p.id}
                    checked={payment === p.id}
                    onChange={() => setPayment(p.id)}
                    className="accent-foreground"
                  />
                  <span>
                    <span className="block text-sm">{p.label}</span>
                    <span className="block text-xs text-muted-foreground">{p.note}</span>
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              This is a front-end demonstration — no payment is processed and no card details are
              collected.
            </p>
          </section>
        </div>

        <aside className="h-max border border-border p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Order summary</h2>
          <ul className="mt-5 space-y-4">
            {cart.map((item) => {
              const product = getProduct(item.id);
              if (!product) return null;
              return (
                <li
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 text-sm"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    width={900}
                    height={1200}
                    loading="lazy"
                    className="h-16 w-13 object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate">{product.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {item.size} · {item.color} · ×{item.quantity}
                    </span>
                  </span>
                  <span>{formatPrice(effectivePrice(product) * item.quantity)}</span>
                </li>
              );
            })}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <dt className="font-display text-lg">Total</dt>
              <dd className="font-display text-lg">{formatPrice(subtotal + shippingCost)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            className="eyebrow mt-6 w-full bg-foreground py-4 text-background transition-opacity hover:opacity-85"
          >
            Place order
          </button>
          <Link
            to="/cart"
            className="eyebrow mt-3 block border border-border py-4 text-center transition-colors hover:border-foreground"
          >
            Back to bag
          </Link>
        </aside>
      </form>
    </>
  );
}
