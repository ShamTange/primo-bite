import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Minus, X, Tag, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { pizzas } from "@/lib/data";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your basket — Vesuvio" }] }),
  component: Cart,
});

function Cart() {
  const [items, setItems] = useState(
    pizzas.slice(0, 2).map((p) => ({ ...p, qty: 1 })),
  );
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 30 ? 0 : 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + delivery + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-2">Your basket</h1>
        <p className="text-muted-foreground mb-10">{items.length} items · Brooklyn, NY</p>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-3xl bg-card border border-border">
                <div className="size-24 rounded-2xl overflow-hidden bg-muted shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <p className="font-bold">{item.name}</p>
                    <button onClick={() => setItems(items.filter((i) => i.id !== item.id))} className="text-muted-foreground hover:text-destructive">
                      <X className="size-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Medium · Sourdough</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
                      <button onClick={() => setItems(items.map((i) => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} className="size-7 grid place-items-center rounded-full hover:bg-card"><Minus className="size-3" /></button>
                      <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                      <button onClick={() => setItems(items.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} className="size-7 grid place-items-center rounded-full hover:bg-card"><Plus className="size-3" /></button>
                    </div>
                    <p className="font-bold">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* COUPON */}
            <div className="p-4 rounded-3xl bg-card border border-border flex items-center gap-3">
              <div className="size-11 rounded-2xl bg-primary/10 grid place-items-center text-primary">
                <Tag className="size-4" />
              </div>
              <input placeholder="Add a promo code" className="flex-1 bg-transparent outline-none text-sm" />
              <button className="h-9 px-4 rounded-full bg-foreground text-background text-xs font-bold">Apply</button>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="lg:sticky lg:top-24 p-6 rounded-3xl bg-card border border-border space-y-4 shadow-soft">
            <p className="font-display text-2xl italic font-bold">Order summary</p>
            <div className="space-y-2 text-sm py-4 border-y border-border">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Delivery fee" value={delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`} highlight={delivery === 0} />
              <Row label="Tax (8%)" value={`$${tax.toFixed(2)}`} />
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-elegant flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition">
              Checkout <ArrowRight className="size-4" />
            </Link>
            <p className="text-[11px] text-muted-foreground text-center">Free delivery on orders above $30 · 30 min guarantee</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "text-success font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}
