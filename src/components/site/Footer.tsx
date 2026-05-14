import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-9 rounded-2xl gradient-primary grid place-items-center text-primary-foreground font-display italic font-bold">
              V
            </div>
            <span className="font-display italic font-bold text-xl">Vesuvio</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hand-stretched dough, 48-hour fermentation, and stone-fired perfection
            delivered to your door in 30 minutes or less.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="size-10 grid place-items-center rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-5">Company</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Our Story</a></li>
            <li><a href="#" className="hover:text-foreground">Sustainability</a></li>
            <li><Link to="/admin" className="hover:text-foreground">For Restaurants</Link></li>
            <li><Link to="/delivery" className="hover:text-foreground">Drive with us</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-5">Support</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Help Center</a></li>
            <li><a href="#" className="hover:text-foreground">Allergens</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 text-xs text-muted-foreground flex flex-col md:flex-row gap-2 justify-between">
          <p>© 2026 Vesuvio Pizza Co. All rights reserved.</p>
          <p>Crafted with fire in Brooklyn, NY.</p>
        </div>
      </div>
    </footer>
  );
}
