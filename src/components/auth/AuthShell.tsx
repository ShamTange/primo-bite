import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  back = "/",
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  back?: string;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col p-6 lg:p-12">
        <Link to={back} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground w-fit">
          <ArrowLeft className="size-4" /> Back
        </Link>
        <div className="flex-1 grid place-items-center">
          <div className="w-full max-w-sm space-y-8">
            <div>
              <div className="size-12 rounded-2xl gradient-primary grid place-items-center text-primary-foreground font-display italic font-bold text-xl mb-6 shadow-elegant">
                V
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            </div>
            {children}
            {footer && <div className="text-sm text-center text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative gradient-dark overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-25" />
        <div className="absolute inset-0 grid place-items-center p-16">
          <div className="text-primary-foreground max-w-md">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-4">Vesuvio</p>
            <p className="font-display italic text-5xl font-bold leading-tight">
              "The crust that changed everything."
            </p>
            <p className="mt-8 opacity-70">— Sophia B., food blogger</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthInput({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full h-12 px-4 rounded-2xl bg-secondary border border-transparent focus:border-primary focus:bg-card outline-none transition"
      />
    </label>
  );
}

export function AuthSubmit({ children }: { children: ReactNode }) {
  return (
    <button className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-elegant hover:scale-[1.01] active:scale-95 transition">
      {children}
    </button>
  );
}
