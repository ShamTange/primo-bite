import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthSubmit } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Vesuvio" }] }),
  component: () => (
    <AuthShell
      title="Forgot password?"
      subtitle="No worries. We'll email you reset instructions."
      back="/login"
      footer={<>Remember it? <Link to="/login" className="text-primary font-bold">Back to sign in</Link></>}
    >
      <form className="space-y-4">
        <AuthInput label="Email" type="email" placeholder="you@example.com" />
        <AuthSubmit>Send reset link</AuthSubmit>
      </form>
    </AuthShell>
  ),
});
