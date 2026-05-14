import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Plus, Minus, ArrowLeft, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { pizzas } from "@/lib/data";

export const Route = createFileRoute("/pizza/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${pizzas.find((p) => p.id === params.id)?.name ?? "Pizza"} — Vesuvio` }],
  }),
  component: PizzaDetail,
});

const sizes = [
  { id: "s", label: "Small", inches: 9, delta: -3 },
  { id: "m", label: "Medium", inches: 12, delta: 0 },
  { id: "l", label: "Large", inches: 15, delta: 4 },
];

const crusts = ["Sourdough", "Thin", "Stuffed", "Gluten-free"];
const toppings = [
  { name: "Buffalo Mozzarella", price: 2 },
  { name: "Truffle Oil", price: 4 },
  { name: "Prosciutto", price: 3 },
  { name: "Caramelized Onion", price: 1.5 },
  { name: "Roasted Peppers", price: 1.5 },
  { name: "Hot Honey", price: 1 },
];

function PizzaDetail() {
  const { id } = useParams({ from: "/pizza/$id" });
  const pizza = pizzas.find((p) => p.id === id) ?? pizzas[0];
  const [size, setSize] = useState("m");
  const [crust, setCrust] = useState(crusts[0]);
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  const sizeDelta = sizes.find((s) => s.id === size)?.delta ?? 0;
  const extrasTotal = extras.reduce((sum, n) => sum + (toppings.find((t) => t.name === n)?.price ?? 0), 0);
  const total = (pizza.price + sizeDelta + extrasTotal) * qty;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-6">
        <Link to="/home" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to menu
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 grid lg:grid-cols-2 gap-12">
        {/* GALLERY */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="relative rounded-[3rem] overflow-hidden aspect-square bg-muted shadow-elegant">
            <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="size-11 rounded-full glass-strong grid place-items-center hover:text-primary"><Heart className="size-4" /></button>
              <button className="size-11 rounded-full glass-strong grid place-items-center hover:text-primary"><Share2 className="size-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {pizzas.slice(0, 4).map((p) => (
              <div key={p.id} className="aspect-square rounded-2xl overflow-hidden border-2 border-border hover:border-primary transition cursor-pointer">
                <img src={p.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* DETAILS */}
        <div className="space-y-7">
          {pizza.badge && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">{pizza.badge}</span>
          )}
          <div>
            <h1 className="font-display italic text-5xl lg:text-6xl font-bold tracking-tight">{pizza.name}</h1>
            <p className="text-muted-foreground mt-3 text-lg">{pizza.description}</p>
          </div>
          <div className="flex items-center gap-6 py-4 border-y border-border">
            <div className="flex items-center gap-2">
              <Star className="size-4 fill-warning text-warning" />
              <span className="font-bold">{pizza.rating}</span>
              <span className="text-xs text-muted-foreground">({pizza.reviews.toLocaleString()})</span>
            </div>
            <div className="text-xs text-muted-foreground">820 cal · 14g protein · Gluten</div>
          </div>

          {/* SIZE */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Size</p>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`p-4 rounded-2xl border-2 transition ${
                    size === s.id ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"
                  }`}
                >
                  <p className="font-bold">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.inches}"</p>
                  <p className="text-xs font-semibold mt-1">{s.delta >= 0 ? "+" : ""}${s.delta}</p>
                </button>
              ))}
            </div>
          </div>

          {/* CRUST */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Crust</p>
            <div className="flex flex-wrap gap-2">
              {crusts.map((c) => (
                <button
                  key={c}
                  onClick={() => setCrust(c)}
                  className={`h-10 px-4 rounded-full border text-sm font-semibold transition ${
                    crust === c ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-secondary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* TOPPINGS */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Extra toppings</p>
            <div className="grid grid-cols-2 gap-2">
              {toppings.map((t) => {
                const active = extras.includes(t.name);
                return (
                  <button
                    key={t.name}
                    onClick={() => setExtras((e) => (active ? e.filter((n) => n !== t.name) : [...e, t.name]))}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition text-sm ${
                      active ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"
                    }`}
                  >
                    <span className="font-medium">{t.name}</span>
                    <span className="text-xs font-bold">+${t.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="sticky bottom-4 glass-strong rounded-3xl p-5 border border-border shadow-elegant flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-9 grid place-items-center rounded-full hover:bg-card"><Minus className="size-4" /></button>
              <span className="w-6 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="size-9 grid place-items-center rounded-full hover:bg-card"><Plus className="size-4" /></button>
            </div>
            <button
              onClick={() => toast.success(`${pizza.name} added to cart!`)}
              className="flex-1 h-14 rounded-2xl gradient-primary text-primary-foreground font-bold flex items-center justify-between px-6 shadow-elegant active:scale-[0.98] transition"
            >
              <span>Add to cart</span>
              <span className="text-lg">${total.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
