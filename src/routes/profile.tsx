import { createFileRoute } from "@tanstack/react-router";
import { Heart, MapPin, CreditCard, Award, Settings, Receipt } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { pizzas } from "@/lib/data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Vesuvio" }] }),
  component: Profile,
});

const tabs = [
  { id: "orders", label: "Orders", icon: Receipt },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "rewards", label: "Rewards", icon: Award },
  { id: "settings", label: "Settings", icon: Settings },
];

function Profile() {
  const [tab, setTab] = useState("orders");
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        {/* HERO CARD */}
        <div className="rounded-[3rem] gradient-dark text-primary-foreground p-8 lg:p-10 relative overflow-hidden mb-8">
          <div className="absolute -right-20 -top-20 size-72 rounded-full gradient-primary opacity-30 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="size-20 rounded-3xl gradient-primary grid place-items-center font-display italic font-bold text-3xl shadow-elegant">M</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Gold member</p>
                <h1 className="font-display italic text-4xl font-bold mt-1">Marco Rossi</h1>
                <p className="opacity-70 text-sm mt-1">marco@example.com</p>
              </div>
            </div>
            <div className="flex gap-8">
              <Stat label="Orders" value="42" />
              <Stat label="Points" value="1,820" />
              <Stat label="Saved" value="$94" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* SIDE TABS */}
          <aside className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 h-12 rounded-2xl text-sm font-semibold transition ${
                  tab === t.id ? "bg-card border border-border shadow-soft" : "hover:bg-secondary text-muted-foreground"
                }`}
              >
                <t.icon className="size-4" /> {t.label}
              </button>
            ))}
          </aside>

          {/* PANEL */}
          <main className="p-6 lg:p-8 rounded-3xl bg-card border border-border min-h-[400px]">
            {tab === "orders" && (
              <div>
                <h2 className="font-display text-2xl italic font-bold mb-6">Recent orders</h2>
                <div className="space-y-3">
                  {pizzas.slice(0, 3).map((p) => (
                    <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary">
                      <div className="size-14 rounded-2xl overflow-hidden"><img src={p.image} className="w-full h-full object-cover" /></div>
                      <div className="flex-1">
                        <p className="font-bold">{p.name}</p>
                        <p className="text-xs text-muted-foreground">Mar 12 · Delivered</p>
                      </div>
                      <p className="font-bold">${p.price}</p>
                      <button className="h-9 px-4 rounded-full bg-foreground text-background text-xs font-bold">Reorder</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "favorites" && (
              <div>
                <h2 className="font-display text-2xl italic font-bold mb-6">Favorite pizzas</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pizzas.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex gap-3 p-3 rounded-2xl bg-secondary">
                      <div className="size-16 rounded-xl overflow-hidden"><img src={p.image} className="w-full h-full object-cover" /></div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{p.name}</p>
                        <p className="text-xs text-muted-foreground">${p.price}</p>
                      </div>
                      <Heart className="size-4 fill-primary text-primary" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "addresses" && (
              <Empty title="Saved addresses" desc="Add a delivery address to checkout faster." cta="Add address" />
            )}
            {tab === "payments" && (
              <Empty title="Payment methods" desc="Add cards or wallets for one-tap checkout." cta="Add payment" />
            )}
            {tab === "rewards" && (
              <div>
                <h2 className="font-display text-2xl italic font-bold mb-6">Loyalty rewards</h2>
                <div className="rounded-3xl gradient-primary p-8 text-primary-foreground">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">Gold tier · 1,820 pts</p>
                  <div className="h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                    <div className="h-full w-[68%] bg-white rounded-full" />
                  </div>
                  <p className="text-xs mt-3 opacity-80">680 pts to Platinum</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mt-4">
                  {["Free pizza · 500 pts", "Free dessert · 200 pts", "Free delivery · 100 pts"].map((r) => (
                    <div key={r} className="p-4 rounded-2xl bg-secondary text-sm font-semibold">{r}</div>
                  ))}
                </div>
              </div>
            )}
            {tab === "settings" && (
              <Empty title="Settings" desc="Manage notifications, privacy, and account." cta="Open settings" />
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display italic text-3xl font-bold">{value}</p>
      <p className="text-xs uppercase tracking-widest opacity-70">{label}</p>
    </div>
  );
}

function Empty({ title, desc, cta }: { title: string; desc: string; cta: string }) {
  return (
    <div className="text-center py-16">
      <h2 className="font-display text-2xl italic font-bold">{title}</h2>
      <p className="text-muted-foreground mt-2 max-w-xs mx-auto text-sm">{desc}</p>
      <button className="mt-6 h-11 px-6 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-elegant">{cta}</button>
    </div>
  );
}
