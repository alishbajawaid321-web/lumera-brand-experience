import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X, Moon, Sun } from "lucide-react";
import { SearchOverlay } from "@/components/search-overlay";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const { cartCount, wishlist } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("lumera:theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("lumera:theme", next ? "dark" : "light");
  };

  return (
    <>
      <div className="bg-ink px-4 py-2.5 text-center text-ink-foreground">
        <p className="eyebrow">
          Complimentary shipping on orders over $250 · Extended returns until 30 days
        </p>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur transition-shadow duration-500",
          scrolled && "shadow-[0_1px_24px_-16px_oklch(0_0_0/0.5)]",
        )}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6 lg:grid-cols-3 lg:py-5">
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {NAV.slice(0, 4).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="eyebrow link-underline text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-0 justify-center lg:justify-center">
            <Link
              to="/"
              aria-label="LUMÉRA home"
              className="font-display text-2xl tracking-[0.32em] sm:text-3xl"
            >
              LUMÉRA
            </Link>
          </div>

          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <nav aria-label="Secondary" className="mr-4 hidden items-center gap-7 xl:flex">
              {NAV.slice(4).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="eyebrow link-underline text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center transition-transform hover:scale-110"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              className="hidden h-10 w-10 place-items-center transition-transform hover:scale-110 sm:grid"
            >
              {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="grid h-10 w-10 place-items-center transition-transform hover:scale-110"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative grid h-10 w-10 place-items-center transition-transform hover:scale-110"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
            </Link>
            <Link
              to="/cart"
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative grid h-10 w-10 place-items-center transition-transform hover:scale-110"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/40 transition-opacity duration-500",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-background transition-transform duration-500 ease-out",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-5">
            <span className="font-display text-xl tracking-[0.3em]">LUMÉRA</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center"
              tabIndex={menuOpen ? 0 : -1}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                tabIndex={menuOpen ? 0 : -1}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="border-b border-border py-4 font-display text-2xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid grid-cols-3 gap-2 border-t border-border p-5">
            <Link
              to="/account"
              tabIndex={menuOpen ? 0 : -1}
              className="eyebrow border border-border py-3 text-center"
            >
              Account
            </Link>
            <Link
              to="/wishlist"
              tabIndex={menuOpen ? 0 : -1}
              className="eyebrow border border-border py-3 text-center"
            >
              Wishlist
            </Link>
            <Link
              to="/cart"
              tabIndex={menuOpen ? 0 : -1}
              className="eyebrow border border-border py-3 text-center"
            >
              Bag ({cartCount})
            </Link>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute right-1 top-1 grid h-4 min-w-4 animate-in zoom-in place-items-center rounded-full bg-foreground px-1 text-[10px] leading-none text-background">
      {children}
    </span>
  );
}
