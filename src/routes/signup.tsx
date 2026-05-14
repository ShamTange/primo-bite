import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthSubmit } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Vesuvio" }] }),
  component: () => (
    <AuthShell
      title="Hungry already?"
      subtitle="Create your account in 30 seconds."
      footer={<>Already a member? <Link to="/login" className="text-primary font-bold">Sign in</Link></>}
    >
      <form className="space-y-4">
        <AuthInput label="Full name" placeholder="Marco Rossi" />
        <AuthInput label="Email" type="email" placeholder="you@example.com" />
        <AuthInput label="Phone" type="tel" placeholder="+1 555 123 4567" />
        <AuthInput label="Password" type="password" placeholder="••••••••" />
        <Link to="/verify-otp" className="block">
          <AuthSubmit>Create account</AuthSubmit>
        </Link>
        <p className="text-[11px] text-muted-foreground text-center">
          By signing up you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  ),
});
