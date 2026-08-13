import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — LUMÉRA" },
      { name: "description", content: "Your LUMÉRA order has been confirmed." },
      { property: "og:title", content: "Order Confirmed — LUMÉRA" },
      { property: "og:description", content: "Thank you for your LUMÉRA order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const { orders, ready } = useStore();
  const order = orders[0];

  if (ready && !order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-28 text-center">
        <h1 className="font-display text-4xl">No recent order</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          You haven't placed an order yet in this session.
        </p>
        <Link to="/shop" className="eyebrow mt-8 inline-block bg-foreground px-9 py-4 text-background">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-28 text-center">
        <p className="eyebrow text-muted-foreground">Loading your order…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 animate-in zoom-in place-items-center rounded-full border border-foreground">
          <Check className="h-7 w-7" />
        </span>
        <p className="eyebrow mt-6 text-muted-foreground">Order confirmed</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Thank you, {order.name.split(" ")[0]}</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Your order is being prepared in our Copenhagen studio. A confirmation has been sent to{" "}
          {order.email}.
        </p>
      </div>

      <div className="mt-10 border border-border">
        <div className="grid grid-cols-2 gap-4 border-b border-border p-6 text-sm">
          <div>
            <p className="eyebrow text-muted-foreground">Order number</p>
            <p className="mt-1">{order.number}</p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Delivery to</p>
            <p className="mt-1 break-words">{order.address}</p>
          </div>
        </div>
        <ul className="divide-y divide-border">
          {order.items.map((item) => (
            <li
              key={`${item.id}-${item.size}-${item.color}`}
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 p-6 text-sm"
            >
              <span className="min-w-0">
                <span className="block font-display text-lg">{item.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {item.size} · {item.color} · Qty {item.quantity}
                </span>
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-3 border-t border-border p-6 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd>{order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3">
            <dt className="font-display text-lg">Total</dt>
            <dd className="font-display text-lg">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/shop"
          className="eyebrow bg-foreground px-9 py-4 text-background transition-opacity hover:opacity-85"
        >
          Continue shopping
        </Link>
        <Link
          to="/account"
          className="eyebrow border border-border px-9 py-4 transition-colors hover:border-foreground"
        >
          View my orders
        </Link>
      </div>
    </div>
  );
}
