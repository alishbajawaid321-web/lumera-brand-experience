import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";

const SHOP_LINKS = [
  { label: "All Products", to: "/shop" as const },
  { label: "New Arrivals", to: "/new-arrivals" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "Wishlist", to: "/wishlist" as const },
];

const CARE_LINKS = [
  { label: "Contact", to: "/contact" as const },
  { label: "FAQ", to: "/faq" as const },
  { label: "Shipping & Returns", to: "/shipping-returns" as const },
  { label: "My Account", to: "/account" as const },
];

const COMPANY_LINKS = [
  { label: "About", to: "/about" as const },
  { label: "Privacy Policy", to: "/privacy" as const },
  { label: "Terms & Conditions", to: "/terms" as const },
  { label: "Shopping Bag", to: "/cart" as const },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setEmail("");
    toast.success("Welcome to LUMÉRA", {
      description: "You're on the list — expect our next atelier letter soon.",
    });
  };

  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.4fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.3em]">LUMÉRA</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A modern atelier working in restrained silhouettes and considered materials, designed
              in Copenhagen and made in small European workshops.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "X" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LUMÉRA on ${label}`}
                  className="grid h-10 w-10 place-items-center border border-border transition-colors hover:border-foreground hover:bg-background"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Customer Care" links={CARE_LINKS} />
          <FooterColumn title="House" links={COMPANY_LINKS} />

          <div>
            <h2 className="eyebrow text-muted-foreground">The Atelier Letter</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Collection previews, studio notes and private access to seasonal releases.
            </p>
            <form onSubmit={subscribe} noValidate className="mt-4">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "footer-email-error" : undefined}
                  className="min-w-0 flex-1 border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                />
                <button
                  type="submit"
                  className="eyebrow shrink-0 bg-foreground px-5 text-background transition-opacity hover:opacity-85"
                >
                  Join
                </button>
              </div>
              {error && (
                <p id="footer-email-error" className="mt-2 text-xs text-destructive">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LUMÉRA. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="link-underline">
              Privacy
            </Link>
            <Link to="/terms" className="link-underline">
              Terms
            </Link>
            <Link to="/shipping-returns" className="link-underline">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <h2 className="eyebrow text-muted-foreground">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="link-underline text-foreground/80 hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
