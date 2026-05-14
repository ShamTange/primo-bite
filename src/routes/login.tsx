import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthSubmit } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Vesuvio" }] }),
  component: () => (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to pick up where you left off."
      footer={<>Don't have an account? <Link to="/signup" className="text-primary font-bold">Sign up</Link></>}
    >
      <form className="space-y-4">
        <AuthInput label="Email" type="email" placeholder="you@example.com" />
        <AuthInput label="Password" type="password" placeholder="••••••••" />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs font-semibold text-primary">Forgot password?</Link>
        </div>
        <AuthSubmit>Sign in</AuthSubmit>
        <button type="button" className="w-full h-12 rounded-2xl border border-border bg-card font-semibold hover:bg-secondary transition">
          Continue with Google
        </button>
      </form>
    </AuthShell>
  ),
});
