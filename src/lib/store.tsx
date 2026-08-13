import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { effectivePrice, getProduct, type Product } from "@/data/products";

export type CartItem = {
  id: string;
  size: string;
  color: string;
  quantity: number;
};

export type Order = {
  number: string;
  date: string;
  items: (CartItem & { name: string; price: number })[];
  subtotal: number;
  shipping: number;
  total: number;
  name: string;
  email: string;
  address: string;
};

export type Account = {
  name: string;
  email: string;
  phone: string;
  addresses: { label: string; line: string }[];
};

type StoreValue = {
  ready: boolean;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  recentlyViewed: string[];
  account: Account | null;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
  markViewed: (id: string) => void;
  placeOrder: (details: Omit<Order, "number" | "date" | "items" | "subtotal" | "shipping" | "total">, shipping: number) => Order;
  signIn: (account: Account) => void;
  signOut: () => void;
  updateAccount: (patch: Partial<Account>) => void;
  cartCount: number;
  subtotal: number;
};

const StoreContext = createContext<StoreValue | null>(null);

export const itemKey = (i: Pick<CartItem, "id" | "size" | "color">) =>
  `${i.id}__${i.size}__${i.color}`;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

const K = {
  cart: "lumera:cart",
  wishlist: "lumera:wishlist",
  orders: "lumera:orders",
  viewed: "lumera:viewed",
  account: "lumera:account",
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    setCart(read<CartItem[]>(K.cart, []));
    setWishlist(read<string[]>(K.wishlist, []));
    setOrders(read<Order[]>(K.orders, []));
    setRecentlyViewed(read<string[]>(K.viewed, []));
    setAccount(read<Account | null>(K.account, null));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(K.cart, cart);
  }, [cart, ready]);
  useEffect(() => {
    if (ready) write(K.wishlist, wishlist);
  }, [wishlist, ready]);
  useEffect(() => {
    if (ready) write(K.orders, orders);
  }, [orders, ready]);
  useEffect(() => {
    if (ready) write(K.viewed, recentlyViewed);
  }, [recentlyViewed, ready]);
  useEffect(() => {
    if (ready) write(K.account, account);
  }, [account, ready]);

  const addToCart = useCallback(
    (product: Product, size: string, color: string, quantity = 1) => {
      setCart((prev) => {
        const key = itemKey({ id: product.id, size, color });
        const existing = prev.find((i) => itemKey(i) === key);
        if (existing) {
          return prev.map((i) =>
            itemKey(i) === key ? { ...i, quantity: i.quantity + quantity } : i,
          );
        }
        return [...prev, { id: product.id, size, color, quantity }];
      });
      toast.success(`${product.name} added to bag`, {
        description: `${size} · ${color}`,
      });
    },
    [],
  );

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => itemKey(i) !== key));
    toast("Removed from bag");
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((i) => itemKey(i) !== key)
        : prev.map((i) => (itemKey(i) === key ? { ...i, quantity: Math.min(quantity, 10) } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        toast(`${product.name} removed from wishlist`);
        return prev.filter((id) => id !== product.id);
      }
      toast.success(`${product.name} saved to wishlist`);
      return [...prev, product.id];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((x) => x !== id));
    toast("Removed from wishlist");
  }, []);

  const markViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProduct(item.id);
        return product ? sum + effectivePrice(product) * item.quantity : sum;
      }, 0),
    [cart],
  );

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.quantity, 0), [cart]);

  const placeOrder: StoreValue["placeOrder"] = useCallback(
    (details, shipping) => {
      const items = cart.flatMap((i) => {
        const product = getProduct(i.id);
        if (!product) return [];
        return [{ ...i, name: product.name, price: effectivePrice(product) }];
      });
      const orderSubtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const order: Order = {
        ...details,
        number: `LUM-${Math.floor(100000 + Math.random() * 899999)}`,
        date: new Date().toISOString(),
        items,
        subtotal: orderSubtotal,
        shipping,
        total: orderSubtotal + shipping,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return order;
    },
    [cart],
  );

  const signIn = useCallback((next: Account) => {
    setAccount(next);
    toast.success("Signed in", { description: `Welcome back, ${next.name}.` });
  }, []);

  const signOut = useCallback(() => {
    setAccount(null);
    toast("Signed out of your LUMÉRA account");
  }, []);

  const updateAccount = useCallback((patch: Partial<Account>) => {
    setAccount((prev) => (prev ? { ...prev, ...patch } : prev));
    toast.success("Account details updated");
  }, []);

  const value: StoreValue = {
    ready,
    cart,
    wishlist,
    orders,
    recentlyViewed,
    account,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted: (id) => wishlist.includes(id),
    removeFromWishlist,
    markViewed,
    placeOrder,
    signIn,
    signOut,
    updateAccount,
    cartCount,
    subtotal,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
