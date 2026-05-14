import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({ meta: [{ title: "Verify — Vesuvio" }] }),
  component: VerifyOtp,
});

function VerifyOtp() {
  return (
    <AuthShell
      title="Check your phone."
      subtitle="We sent a 6-digit code to +1 555 ••• 4567."
      back="/signup"
      footer={<>Didn't get it? <button className="text-primary font-bold">Resend</button></>}
    >
      <div className="flex gap-2 justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            maxLength={1}
            inputMode="numeric"
            className="w-12 h-14 text-center text-2xl font-bold rounded-2xl bg-secondary border border-transparent focus:border-primary focus:bg-card outline-none"
          />
        ))}
      </div>
      <Link to="/home" className="block">
        <button className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-elegant active:scale-95 transition">
          Verify & continue
        </button>
      </Link>
    </AuthShell>
  );
}
