import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Search, MapPin, Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const links = [
  { to: "/home", label: "Menu" },
  { to: "/track", label: "Track" },
  { to: "/profile", label: "Rewards" },
  { to: "/admin", label: "Business" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full glass-strong border-b border-border/60"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-9 rounded-2xl gradient-primary grid place-items-center text-primary-foreground font-display italic font-bold text-lg shadow-elegant">
              V
            </div>
            <span className="font-display italic font-bold text-xl tracking-tight">
              Vesuvio
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`transition-colors hover:text-primary ${
                  path === l.to ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 h-10 rounded-full bg-secondary text-xs font-semibold">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            <MapPin className="size-3.5" />
            24 min delivery
          </div>
          <button className="size-10 grid place-items-center rounded-full hover:bg-secondary transition">
            <Search className="size-4" />
          </button>
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 h-10 px-4 rounded-full gradient-primary text-primary-foreground font-semibold text-sm shadow-elegant hover:opacity-95 active:scale-95 transition"
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="size-5 grid place-items-center text-[10px] rounded-full bg-background/20">
              2
            </span>
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden size-10 grid place-items-center rounded-full hover:bg-secondary"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-xl hover:bg-secondary text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
