import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import type { Pizza } from "@/lib/data";

export function PizzaCard({ pizza, index = 0 }: { pizza: Pizza; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link
        to="/pizza/$id"
        params={{ id: pizza.id }}
        className="block bg-card rounded-[2rem] p-3 border border-border hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
      >
        <div className="relative rounded-[1.6rem] overflow-hidden aspect-square bg-muted">
          <img
            src={pizza.image}
            alt={pizza.name}
            loading="lazy"
            width={800}
            height={800}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {pizza.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass-strong text-[10px] font-bold uppercase tracking-wider">
              {pizza.badge}
            </span>
          )}
          <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full glass-strong text-xs font-bold flex items-center gap-1">
            <Star className="size-3 fill-warning text-warning" />
            {pizza.rating}
          </div>
        </div>
        <div className="px-3 pt-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-display italic font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
              {pizza.name}
            </h3>
            <span className="font-bold text-lg shrink-0">${pizza.price}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-5">{pizza.tagline}</p>
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full h-11 rounded-2xl bg-secondary font-semibold text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          >
            <Plus className="size-4" />
            Add to basket
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
