import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, MapPin, TrendingUp, Sparkles, Clock, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PizzaCard } from "@/components/site/PizzaCard";
import { pizzas, categories, offers } from "@/lib/data";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Discover — Vesuvio" }] }),
  component: Home,
});

const restaurants = [
  { name: "Vesuvio Brooklyn", time: "18 min", rating: 4.9, distance: "0.6 mi" },
  { name: "Vesuvio Williamsburg", time: "24 min", rating: 4.8, distance: "1.2 mi" },
  { name: "Vesuvio Park Slope", time: "32 min", rating: 4.7, distance: "2.4 mi" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pt-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5"><MapPin className="size-3" /> Brooklyn, NY</p>
            <h1 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mt-2">
              Good evening, <em className="text-gradient">Marco</em>.
            </h1>
            <p className="text-muted-foreground mt-1">What are we firing up tonight?</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            placeholder="Search pizzas, restaurants, ingredients…"
            className="w-full h-16 pl-14 pr-4 rounded-3xl bg-card border border-border shadow-soft text-base outline-none focus:border-primary transition"
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((c, i) => (
            <button
              key={c.id}
              className={`shrink-0 inline-flex items-center gap-2 h-12 px-5 rounded-full text-sm font-semibold border transition ${
                i === 0
                  ? "gradient-primary text-primary-foreground border-transparent shadow-elegant"
                  : "bg-card border-border hover:bg-secondary"
              }`}
            >
              <span>{c.emoji}</span>
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 mb-12">
        <div className="grid md:grid-cols-3 gap-4">
          {offers.map((o, i) => (
            <motion.div
              key={o.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden p-6 rounded-3xl gradient-primary text-primary-foreground"
            >
              <Sparkles className="absolute right-4 top-4 size-5 opacity-50" />
              <p className="text-xs font-bold uppercase opacity-80">{o.subtitle}</p>
              <p className="font-display italic text-3xl font-bold mt-1">{o.title}</p>
              <p className="text-xs mt-3 opacity-90">CODE: {o.code}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Featured</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold">Tonight's hot picks</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pizzas.map((p, i) => <PizzaCard key={p.id} pizza={p} index={i} />)}
        </div>
      </section>

      {/* NEARBY */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Nearby</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold">Restaurants around you</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {restaurants.map((r) => (
            <Link
              key={r.name}
              to="/home"
              className="group p-6 rounded-3xl bg-card border border-border hover:shadow-elegant transition flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-lg">{r.name}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock className="size-3" />{r.time}</span>
                  <span>{r.distance}</span>
                  <span>★ {r.rating}</span>
                </p>
              </div>
              <ChevronRight className="size-5 text-muted-foreground group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      </section>

      {/* AI RECOMMENDED */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-16">
        <div className="rounded-[3rem] gradient-dark p-8 lg:p-12 text-primary-foreground relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 size-80 rounded-full gradient-primary opacity-30 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-glow mb-3 flex items-center gap-2">
                <Sparkles className="size-3.5" /> AI · Personalized for you
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight">
                Based on your last 5 orders, you'd love the <em className="text-gradient">Truffle King.</em>
              </h2>
              <Link to="/pizza/$id" params={{ id: "truffle-king" }} className="inline-flex items-center gap-2 mt-6 h-12 px-6 rounded-2xl bg-white text-foreground font-bold hover:scale-[1.02] active:scale-95 transition">
                Try it tonight <TrendingUp className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
