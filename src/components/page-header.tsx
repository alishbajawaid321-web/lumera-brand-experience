import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="link-underline hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            {item.to ? (
              <Link
                to={item.to}
                params={item.params as never}
                className="link-underline hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal as="header" className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {eyebrow && <p className="eyebrow text-muted-foreground">{eyebrow}</p>}
      <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
      {description && (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </Reveal>
  );
}
