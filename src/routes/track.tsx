import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, MessageSquare, ChefHat, Bike, Home, Check } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Tracking your order — Vesuvio" }] }),
  component: Track,
});

const steps = [
  { icon: Check, label: "Order confirmed", time: "7:42 PM", done: true },
  { icon: ChefHat, label: "In the oven", time: "7:48 PM", done: true },
  { icon: Bike, label: "On the way", time: "8:02 PM", done: true, active: true },
  { icon: Home, label: "Delivered", time: "—", done: false },
];

function Track() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 grid lg:grid-cols-[1fr_400px] gap-8">
        {/* MAP */}
        <div className="relative rounded-[3rem] overflow-hidden h-[480px] lg:h-[640px] bg-secondary border border-border">
          {/* Stylized map placeholder */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="oklch(0.85 0.01 60)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M 100 400 Q 300 200 600 250 T 700 150" stroke="oklch(0.62 0.22 38)" strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray="2 14" />
          </svg>
          <motion.div
            animate={{ x: [0, 200, 380], y: [0, -120, -180] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
            className="absolute bottom-32 left-20"
          >
            <div className="relative">
              <div className="absolute inset-0 size-14 rounded-full gradient-primary opacity-30 blur-xl animate-pulse" />
              <div className="relative size-14 rounded-full gradient-primary grid place-items-center text-primary-foreground shadow-glow">
                <Bike className="size-6" />
              </div>
            </div>
          </motion.div>
          <div className="absolute top-32 right-20 size-12 rounded-full bg-foreground text-background grid place-items-center"><Home className="size-5" /></div>
          <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-3xl p-5 border border-border flex items-center gap-4">
            <div className="size-14 rounded-2xl gradient-primary grid place-items-center text-primary-foreground font-display italic font-bold text-2xl shadow-elegant">
              12
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Arriving in</p>
              <p className="font-bold text-xl">12 minutes</p>
            </div>
            <Link to="/" className="text-xs font-bold text-primary">Live</Link>
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="space-y-4">
          {/* Driver card */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-soft">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Your courier</p>
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full gradient-primary grid place-items-center text-primary-foreground font-bold text-lg">M</div>
              <div className="flex-1">
                <p className="font-bold">Marco Rossi</p>
                <p className="text-xs text-muted-foreground">★ 4.9 · Honda · ABC 123</p>
              </div>
              <button className="size-11 rounded-full bg-secondary grid place-items-center hover:bg-primary hover:text-primary-foreground transition"><Phone className="size-4" /></button>
              <button className="size-11 rounded-full bg-secondary grid place-items-center hover:bg-primary hover:text-primary-foreground transition"><MessageSquare className="size-4" /></button>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-soft">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">Progress</p>
            <ol className="relative space-y-5">
              {steps.map((s, i) => (
                <li key={s.label} className="flex items-start gap-4 relative">
                  {i < steps.length - 1 && (
                    <span className={`absolute left-[19px] top-10 bottom-[-20px] w-px ${s.done ? "bg-primary" : "bg-border"}`} />
                  )}
                  <div className={`size-10 rounded-full grid place-items-center shrink-0 transition ${
                    s.done ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  } ${s.active ? "shadow-glow animate-pulse" : ""}`}>
                    <s.icon className="size-4" />
                  </div>
                  <div className="flex-1 pt-1.5 flex justify-between">
                    <p className={`font-semibold text-sm ${s.done ? "" : "text-muted-foreground"}`}>{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.time}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Items */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-soft">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Order #VS-2841</p>
            <p className="text-sm text-muted-foreground">2 items · $48.60</p>
          </div>
        </div>
      </div>
    </div>
  );
}
