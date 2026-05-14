import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CreditCard, Smartphone, Banknote, Check, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Vesuvio" }] }),
  component: Checkout,
});

const addresses = [
  { id: "home", label: "Home", line: "123 Driggs Ave, Brooklyn, NY 11211" },
  { id: "work", label: "Work", line: "350 5th Ave, New York, NY 10118" },
];

const payments = [
  { id: "card", label: "Card", icon: CreditCard, sub: "•••• 4242" },
  { id: "upi", label: "UPI / Apple Pay", icon: Smartphone, sub: "Express" },
  { id: "cod", label: "Cash on delivery", icon: Banknote, sub: "Pay courier" },
];

function Checkout() {
  const [addr, setAddr] = useState("home");
  const [pay, setPay] = useState("card");
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto px-5 py-20 text-center"
          >
            <div className="size-24 rounded-full gradient-primary grid place-items-center mx-auto shadow-glow">
              <Check className="size-12 text-primary-foreground" strokeWidth={3} />
            </div>
            <h1 className="font-display italic text-5xl font-bold mt-8">Order placed!</h1>
            <p className="text-muted-foreground mt-3">Your pizza is heading into the oven. Estimated arrival in 26 minutes.</p>
            <Link to="/track" className="inline-flex items-center gap-2 mt-8 h-14 px-7 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-elegant">
              Track your order
            </Link>
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-10">Checkout</h1>
            <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
              <div className="space-y-6">
                {/* Address */}
                <Section title="Delivery address" icon={MapPin}>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {addresses.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setAddr(a.id)}
                        className={`text-left p-4 rounded-2xl border-2 transition ${
                          addr === a.id ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">{a.label}</p>
                        <p className="text-sm mt-1">{a.line}</p>
                      </button>
                    ))}
                  </div>
                </Section>

                {/* Payment */}
                <Section title="Payment method" icon={CreditCard}>
                  <div className="space-y-2">
                    {payments.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPay(p.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition ${
                          pay === p.id ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <div className="size-11 rounded-xl bg-secondary grid place-items-center"><p.icon className="size-5" /></div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold">{p.label}</p>
                          <p className="text-xs text-muted-foreground">{p.sub}</p>
                        </div>
                        {pay === p.id && <div className="size-5 rounded-full bg-primary grid place-items-center"><Check className="size-3 text-primary-foreground" /></div>}
                      </button>
                    ))}
                  </div>
                </Section>

                {/* Instructions */}
                <Section title="Delivery instructions" icon={Sparkles}>
                  <textarea
                    rows={3}
                    placeholder="Buzz 4B. Leave at the door if no answer."
                    className="w-full p-4 rounded-2xl bg-secondary border border-transparent outline-none focus:border-primary focus:bg-card resize-none text-sm"
                  />
                </Section>
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-24 p-6 rounded-3xl bg-card border border-border space-y-4 shadow-soft">
                <p className="font-display text-2xl italic font-bold">Order summary</p>
                <div className="space-y-2 text-sm py-4 border-y border-border">
                  <Row label="Subtotal" value="$45.00" />
                  <Row label="Delivery" value="Free" highlight />
                  <Row label="Tax" value="$3.60" />
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$48.60</span>
                </div>
                <button
                  onClick={() => setDone(true)}
                  className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-elegant active:scale-95 transition"
                >
                  Place order · $48.60
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!done && <Footer />}
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-3xl bg-card border border-border">
      <div className="flex items-center gap-3 mb-5">
        <div className="size-10 rounded-2xl gradient-primary grid place-items-center text-primary-foreground"><Icon className="size-4" /></div>
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      {children}
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
