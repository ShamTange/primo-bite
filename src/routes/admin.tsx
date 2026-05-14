import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, ChevronRight, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import { pizzas } from "@/lib/data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Vesuvio" }] }),
  component: Admin,
});

const sales = Array.from({ length: 12 }).map((_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  v: 40 + Math.round(Math.random() * 60 + i * 3),
}));

const top = pizzas.map((p, i) => ({ name: p.name.split(" ")[1] ?? p.name, sold: 320 - i * 40 }));

const orders = [
  { id: "VS-2841", customer: "Marco Rossi", items: 2, total: "$48.60", status: "In oven" },
  { id: "VS-2840", customer: "Sophia Bennett", items: 3, total: "$72.10", status: "Out for delivery" },
  { id: "VS-2839", customer: "Aisha Patel", items: 1, total: "$24.00", status: "Delivered" },
  { id: "VS-2838", customer: "James Liu", items: 4, total: "$96.30", status: "Delivered" },
  { id: "VS-2837", customer: "Emma Wood", items: 2, total: "$41.20", status: "Cancelled" },
];

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin", label: "Orders", icon: ShoppingBag },
  { to: "/admin", label: "Inventory", icon: Package },
  { to: "/admin", label: "Customers", icon: Users },
  { to: "/admin", label: "Settings", icon: Settings },
];

function Admin() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar p-5 gap-1">
        <Link to="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="size-9 rounded-2xl gradient-primary grid place-items-center text-primary-foreground font-display italic font-bold">V</div>
          <div>
            <p className="font-display italic font-bold">Vesuvio</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin</p>
          </div>
        </Link>
        {navItems.map((n, i) => (
          <button key={n.label} className={`flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-semibold transition ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
            <n.icon className="size-4" /> {n.label}
          </button>
        ))}
        <div className="mt-auto p-4 rounded-2xl gradient-dark text-primary-foreground">
          <p className="text-xs uppercase tracking-widest opacity-70">Pro tip</p>
          <p className="text-sm font-bold mt-1">Enable AI auto-pricing to boost margin by 12%.</p>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0 p-6 lg:p-10 space-y-6 overflow-x-hidden">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Dashboard</p>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mt-1">Good evening, Chef.</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-10 px-4 rounded-xl bg-card border border-border text-sm font-semibold">Export</button>
            <button className="h-10 px-4 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant">+ Add item</button>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid md:grid-cols-4 gap-4">
          <Kpi label="Revenue today" value="$3,420" delta="+12.4%" up icon={DollarSign} />
          <Kpi label="Orders" value="128" delta="+8.1%" up icon={ShoppingBag} />
          <Kpi label="Avg ticket" value="$26.70" delta="-2.3%" up={false} icon={Package} />
          <Kpi label="New customers" value="42" delta="+22%" up icon={Users} />
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-6 rounded-3xl bg-card border border-border">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Revenue</p>
                <p className="font-display italic text-2xl font-bold mt-1">$42,820</p>
              </div>
              <div className="flex gap-1 text-xs">
                {["Week", "Month", "Year"].map((t, i) => (
                  <button key={t} className={`h-8 px-3 rounded-full font-semibold ${i === 1 ? "bg-foreground text-background" : "text-muted-foreground"}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="h-64 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sales}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.22 38)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="oklch(0.62 0.22 38)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.9 0.01 60)" strokeDasharray="4 6" vertical={false} />
                  <XAxis dataKey="m" stroke="oklch(0.5 0.02 50)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.5 0.02 50)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.01 60)", fontSize: 12 }} />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.62 0.22 38)" strokeWidth={2.5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Top sellers</p>
            <p className="font-display italic text-2xl font-bold mt-1 mb-4">This week</p>
            <div className="h-64 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={top}>
                  <XAxis dataKey="name" stroke="oklch(0.5 0.02 50)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.01 60)", fontSize: 12 }} />
                  <Bar dataKey="sold" fill="oklch(0.62 0.22 38)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div className="rounded-3xl bg-card border border-border overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Live orders</p>
              <p className="font-display italic text-2xl font-bold mt-1">Order management</p>
            </div>
            <button className="text-xs font-bold text-primary inline-flex items-center gap-1">View all <ChevronRight className="size-3" /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-widest text-muted-foreground bg-secondary">
                <tr>
                  <th className="text-left px-6 py-3 font-bold">Order</th>
                  <th className="text-left px-6 py-3 font-bold">Customer</th>
                  <th className="text-left px-6 py-3 font-bold">Items</th>
                  <th className="text-left px-6 py-3 font-bold">Total</th>
                  <th className="text-left px-6 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-border hover:bg-secondary/40">
                    <td className="px-6 py-4 font-mono text-xs">{o.id}</td>
                    <td className="px-6 py-4 font-semibold">{o.customer}</td>
                    <td className="px-6 py-4 text-muted-foreground">{o.items}</td>
                    <td className="px-6 py-4 font-bold">{o.total}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function Kpi({ label, value, delta, up, icon: Icon }: { label: string; value: string; delta: string; up: boolean; icon: React.ElementType }) {
  return (
    <div className="p-6 rounded-3xl bg-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="size-10 rounded-2xl bg-secondary grid place-items-center"><Icon className="size-4" /></div>
        <span className={`inline-flex items-center gap-1 text-xs font-bold ${up ? "text-success" : "text-destructive"}`}>
          {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />} {delta}
        </span>
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{label}</p>
      <p className="font-display italic text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "In oven": "bg-warning/15 text-warning",
    "Out for delivery": "bg-primary/15 text-primary",
    "Delivered": "bg-success/15 text-success",
    "Cancelled": "bg-destructive/15 text-destructive",
  };
  return <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${map[status]}`}>{status}</span>;
}
