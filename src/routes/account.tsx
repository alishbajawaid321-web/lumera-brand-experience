import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { useStore } from "@/lib/store";
import { formatPrice, getProduct } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — LUMÉRA" },
      {
        name: "description",
        content:
          "Manage your LUMÉRA profile, review past orders, saved pieces and delivery addresses.",
      },
      { property: "og:title", content: "My Account — LUMÉRA" },
      { property: "og:description", content: "Your LUMÉRA profile, orders and saved addresses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { account, signIn, signOut, updateAccount, orders, wishlist } = useStore();

  return (
    <>
      <Breadcrumbs items={[{ label: "Account" }]} />
      <PageHeader
        eyebrow={account ? `Welcome back, ${account.name.split(" ")[0]}` : "Client area"}
        title="My Account"
        description={
          account
            ? "Your profile, orders and saved details, kept privately on this device."
            : "Sign in to view your orders, saved addresses and wishlist."
        }
      />

      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-8">
        {!account ? <SignInPanel onSignIn={signIn} /> : null}

        {account ? (
          <div className="grid gap-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
            <Reveal className="h-max border border-border p-6">
              <h2 className="font-display text-2xl">Profile</h2>
              <ProfileForm account={account} onSave={updateAccount} />
              <button
                type="button"
                onClick={signOut}
                className="eyebrow mt-6 w-full border border-border py-3.5 transition-colors hover:border-foreground"
              >
                Sign out
              </button>
            </Reveal>

            <div className="space-y-12">
              <Reveal>
                <h2 className="font-display text-2xl">Order history</h2>
                {orders.length === 0 ? (
                  <div className="mt-5 border border-border px-6 py-14 text-center">
                    <p className="text-sm text-muted-foreground">
                      No orders yet — your first LUMÉRA order will appear here.
                    </p>
                    <Link
                      to="/shop"
                      className="eyebrow mt-6 inline-block bg-foreground px-8 py-3.5 text-background"
                    >
                      Start shopping
                    </Link>
                  </div>
                ) : (
                  <ul className="mt-5 divide-y divide-border border-y border-border">
                    {orders.map((order) => (
                      <li key={order.number} className="py-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <p className="font-display text-lg">{order.number}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {order.items.length} {order.items.length === 1 ? "piece" : "pieces"} ·{" "}
                          {formatPrice(order.total)}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {order.items.map((item) => {
                            const product = getProduct(item.id);
                            if (!product) return null;
                            return (
                              <li key={`${order.number}-${item.id}-${item.size}-${item.color}`}>
                                <Link
                                  to="/product/$productId"
                                  params={{ productId: product.id }}
                                  aria-label={product.name}
                                >
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={900}
                                    height={1200}
                                    loading="lazy"
                                    className="h-20 w-16 object-cover"
                                  />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>

              <Reveal>
                <h2 className="font-display text-2xl">Saved addresses</h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {account.addresses.map((a) => (
                    <li key={a.label} className="border border-border p-5">
                      <p className="eyebrow text-muted-foreground">{a.label}</p>
                      <p className="mt-2 text-sm leading-relaxed">{a.line}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <h2 className="font-display text-2xl">Wishlist</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {wishlist.length} saved {wishlist.length === 1 ? "piece" : "pieces"}.
                </p>
                <Link
                  to="/wishlist"
                  className="eyebrow link-underline mt-3 inline-block"
                >
                  View wishlist
                </Link>
              </Reveal>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

function SignInPanel({ onSignIn }: { onSignIn: (a: ReturnType<typeof buildAccount>) => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    onSignIn(buildAccount(name.trim(), email.trim()));
  };

  return (
    <Reveal className="mx-auto max-w-md border border-border p-7">
      <h2 className="font-display text-2xl">Sign in</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        This demo store keeps your details privately on this device — no password required.
      </p>
      <form onSubmit={submit} noValidate className="mt-6 grid gap-5">
        <div>
          <label htmlFor="acc-name" className="eyebrow text-muted-foreground">
            Name
          </label>
          <input
            id="acc-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={cn(
              "mt-2 w-full border bg-background px-4 py-3 text-sm outline-none focus:border-foreground",
              errors.name ? "border-destructive" : "border-border",
            )}
          />
          {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="acc-email" className="eyebrow text-muted-foreground">
            Email
          </label>
          <input
            id="acc-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={cn(
              "mt-2 w-full border bg-background px-4 py-3 text-sm outline-none focus:border-foreground",
              errors.email ? "border-destructive" : "border-border",
            )}
          />
          {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
        </div>
        <button
          type="submit"
          className="eyebrow bg-foreground py-4 text-background transition-opacity hover:opacity-85"
        >
          Sign in
        </button>
      </form>
    </Reveal>
  );
}

function buildAccount(name: string, email: string) {
  return {
    name,
    email,
    phone: "",
    addresses: [
      { label: "Default address", line: "Add your delivery address at checkout." },
    ],
  };
}

function ProfileForm({
  account,
  onSave,
}: {
  account: { name: string; email: string; phone: string };
  onSave: (patch: { name?: string; email?: string; phone?: string }) => void;
}) {
  const [form, setForm] = useState({
    name: account.name,
    email: account.email,
    phone: account.phone,
  });

  return (
    <form
      className="mt-5 grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      {(["name", "email", "phone"] as const).map((key) => (
        <div key={key}>
          <label htmlFor={`profile-${key}`} className="eyebrow text-muted-foreground capitalize">
            {key}
          </label>
          <input
            id={`profile-${key}`}
            value={form[key]}
            onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
            className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
          />
        </div>
      ))}
      <button
        type="submit"
        className="eyebrow bg-foreground py-3.5 text-background transition-opacity hover:opacity-85"
      >
        Save changes
      </button>
    </form>
  );
}
