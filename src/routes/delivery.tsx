import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bike, DollarSign, Clock, MapPin, Phone, CheckCircle2, Navigation } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/delivery")({
  head: () => ({ meta: [{ title: "Courier — Vesuvio" }] }),
  component: Delivery,
});

const earnings = Array.from({ length: 7 }).map((_, i) => ({
  d: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
  v: 80 + Math.round(Math.random() * 100),
}));

const requests = [
  { id: "VS-2841", pickup: "Vesuvio Brooklyn", drop: "123 Driggs Ave", distance: "1.2 mi", payout: "$8.40" },
  { id: "VS-2842", pickup: "Vesuvio Williamsburg", drop: "55 N 9th St", distance: "0.6 mi", payout: "$5.20" },
  { id: "VS-2843", pickup: "Vesuvio Park Slope", drop: "401 7th Ave", distance: "2.4 mi", payout: "$11.80" },
];

function Delivery() {
  const [online, setOnline] = useState(true);
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-strong sticky top-0 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-2xl gradient-primary grid place-items-center text-primary-foreground font-display italic font-bold">V</div>
            <div>
              <p className="font-display italic font-bold">Vesuvio</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground -mt-1">Courier</p>
            </div>
          </Link>
          <button
            onClick={() => setOnline(!online)}
            className={`flex items-center gap-2 h-10 px-4 rounded-full font-bold text-sm transition ${
              online ? "gradient-primary text-primary-foreground shadow-elegant" : "bg-secondary text-foreground"
            }`}
          >
            <span className={`size-2 rounded-full ${online ? "bg-white animate-pulse" : "bg-muted-foreground"}`} />
            {online ? "Online" : "Offline"}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 space-y-6">
        {/* KPIs */}
        <div className="grid md:grid-cols-4 gap-4">
          <Kpi label="Today" value="$74.20" icon={DollarSign} accent />
          <Kpi label="Deliveries" value="9" icon={Bike} />
          <Kpi label="Online time" value="4h 22m" icon={Clock} />
          <Kpi label="Rating" value="4.96 ★" icon={CheckCircle2} />
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
          {/* MAP */}
          <div className="relative rounded-[2.5rem] overflow-hidden h-[420px] bg-secondary border border-border">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="g2" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="oklch(0.85 0.01 60)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#g2)" />
              <path d="M 100 380 L 280 280 L 420 320 L 600 180" stroke="oklch(0.62 0.22 38)" strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray="2 14" />
            </svg>
            {[
              { x: "12%", y: "75%" },
              { x: "35%", y: "55%" },
              { x: "75%", y: "30%" },
            ].map((p, i) => (
              <div key={i} style={{ left: p.x, top: p.y }} className="absolute size-10 rounded-full gradient-primary grid place-items-center text-primary-foreground text-xs font-bold shadow-elegant -translate-x-1/2 -translate-y-1/2">
                {i + 1}
              </div>
            ))}
            <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4 border border-border flex items-center gap-3">
              <Navigation className="size-5 text-primary" />
              <p className="text-sm font-semibold flex-1">Active route · 3 stops</p>
              <button className="h-9 px-4 rounded-full bg-foreground text-background text-xs font-bold">Start</button>
            </div>
          </div>

          {/* EARNINGS */}
          <div className="p-6 rounded-3xl bg-card border border-border">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">This week</p>
            <p className="font-display italic text-3xl font-bold mt-1">$642.80</p>
            <div className="h-44 -ml-4 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earnings}>
                  <XAxis dataKey="d" stroke="oklch(0.5 0.02 50)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.01 60)", fontSize: 12 }} />
                  <Line type="monotone" dataKey="v" stroke="oklch(0.62 0.22 38)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.62 0.22 38)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* REQUESTS */}
        <div>
          <h2 className="font-display italic text-2xl font-bold mb-4">New requests</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {requests.map((r) => (
              <div key={r.id} className="p-5 rounded-3xl bg-card border border-border hover:shadow-elegant transition">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                  <span className="font-display italic font-bold text-xl text-primary">{r.payout}</span>
                </div>
                <div className="space-y-3 text-sm">
                  <Stop label="Pickup" value={r.pickup} />
                  <Stop label="Drop-off" value={r.drop} />
                </div>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" />{r.distance}</span>
                  <button className="h-9 px-4 rounded-full gradient-primary text-primary-foreground text-xs font-bold shadow-elegant">Accept</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, icon: Icon, accent }: { label: string; value: string; icon: React.ElementType; accent?: boolean }) {
  return (
    <div className={`p-5 rounded-3xl border ${accent ? "gradient-primary text-primary-foreground border-transparent shadow-elegant" : "bg-card border-border"}`}>
      <div className="flex items-center justify-between mb-3">
        <Icon className="size-4 opacity-70" />
      </div>
      <p className="text-xs uppercase tracking-widest font-bold opacity-70">{label}</p>
      <p className="font-display italic text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Stop({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <div className="size-2 rounded-full bg-primary mt-1.5" />
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
