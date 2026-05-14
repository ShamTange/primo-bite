import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles, Clock, Award, Apple, Play } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PizzaCard } from "@/components/site/PizzaCard";
import { pizzas, reviews, offers, categories } from "@/lib/data";
import heroPizza from "@/assets/hero-pizza.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vesuvio — Premium Artisan Pizza, Delivered" },
      { name: "description", content: "Hand-stretched, stone-fired Neapolitan pizza delivered in 30 minutes. Premium ingredients, modern experience." },
      { property: "og:title", content: "Vesuvio — Premium Artisan Pizza, Delivered" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative px-5 lg:px-8 pt-10 lg:pt-16 pb-24 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary font-bold text-[11px] uppercase tracking-widest">
              <Sparkles className="size-3.5" /> New: Black Truffle Series
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95]">
              The Art of <br />
              <em className="text-gradient">the Crust.</em>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Hand-stretched dough, 48-hour fermentation, and stone-fired perfection delivered to your door in 30 minutes.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/home"
                className="group inline-flex items-center gap-2 h-14 px-7 rounded-2xl gradient-primary text-primary-foreground font-bold text-base shadow-elegant hover:scale-[1.02] active:scale-95 transition"
              >
                Order Now
                <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/home"
                className="inline-flex items-center gap-2 h-14 px-7 rounded-2xl bg-card border border-border font-bold text-base hover:bg-secondary transition"
              >
                Explore Menu
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-6">
              {[
                { icon: Clock, label: "30 min", sub: "Delivery" },
                { icon: Star, label: "4.9", sub: "10k+ reviews" },
                { icon: Award, label: "#1", sub: "Local pick" },
              ].map((s) => (
                <div key={s.sub} className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-secondary grid place-items-center">
                    <s.icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-10 gradient-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-elegant rotate-2 hover:rotate-0 transition-transform duration-700">
              <img src={heroPizza} alt="Featured pizza" width={1200} height={1200} className="w-full h-full object-cover" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-4 lg:-left-10 glass-strong p-5 rounded-3xl shadow-elegant border border-border max-w-[260px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-11 rounded-full bg-success/15 grid place-items-center text-success font-bold">4.9</div>
                <div>
                  <p className="font-bold text-sm">Top Rated</p>
                  <p className="text-xs text-muted-foreground">2k+ local reviews</p>
                </div>
              </div>
              <p className="text-sm font-medium italic">"Best sourdough crust in the city, period."</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass-strong p-4 rounded-2xl shadow-soft border border-border"
            >
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">Live · 24 min</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-border bg-surface py-8">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center gap-8 lg:gap-12 overflow-x-auto no-scrollbar">
          {categories.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-3 group shrink-0"
            >
              <div className="size-16 lg:size-20 rounded-2xl bg-card border border-border grid place-items-center text-3xl group-hover:gradient-primary group-hover:scale-110 transition shadow-soft">
                {c.emoji}
              </div>
              <span className="text-sm font-semibold">{c.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Chef's specials</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">Crafted to obsess over.</h2>
          </div>
          <Link to="/home" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold hover:text-primary">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pizzas.map((p, i) => (
            <PizzaCard key={p.id} pizza={p} index={i} />
          ))}
        </div>
      </section>

      {/* OFFERS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-5">
          {offers.map((o, i) => (
            <motion.div
              key={o.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden p-8 rounded-3xl gradient-primary text-primary-foreground"
            >
              <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/10 blur-2xl" />
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">{o.subtitle}</p>
              <p className="font-display italic text-4xl font-bold mb-4">{o.title}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-bold">
                CODE: {o.code}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Loved by locals</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold">A taste people remember.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border hover:shadow-elegant transition"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="size-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="font-display italic text-xl leading-snug mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full gradient-primary grid place-items-center text-primary-foreground font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-[3rem] gradient-dark text-background p-10 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="absolute -right-20 -top-20 size-80 rounded-full gradient-primary opacity-30 blur-3xl" />
          <div className="relative space-y-6 text-primary-foreground">
            <span className="inline-block px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest">Mobile app</span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold leading-tight">
              Order faster. <em className="text-gradient">Eat better.</em>
            </h2>
            <p className="opacity-70 max-w-md">
              One-tap reordering, live tracking, and rewards on every slice. Available on iOS and Android.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-3 h-14 px-6 rounded-2xl bg-white text-foreground font-semibold hover:scale-[1.02] active:scale-95 transition">
                <Apple className="size-5" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] opacity-70">Download on</p>
                  <p className="font-bold">App Store</p>
                </div>
              </button>
              <button className="inline-flex items-center gap-3 h-14 px-6 rounded-2xl bg-white text-foreground font-semibold hover:scale-[1.02] active:scale-95 transition">
                <Play className="size-5" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] opacity-70">Get it on</p>
                  <p className="font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>
          <div className="relative h-72 lg:h-96">
            <div className="absolute inset-0 rounded-3xl overflow-hidden rotate-6 shadow-glow">
              <img src={heroPizza} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
