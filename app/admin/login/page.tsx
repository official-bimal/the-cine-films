import type { Metadata } from "next";
import Image from "next/image";
import { loginAction } from "@/lib/actions/auth";

export const metadata: Metadata = {
  title: "Sign in — The Cine Films Dashboard",
  robots: { index: false, follow: false },
};

// Never statically prerendered — middleware already redirects a signed-in
// visitor away from this page per-request, which only makes sense dynamically.
export const dynamic = "force-dynamic";

const darkInput =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-offwhite placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const darkLabel = "mb-1.5 block font-mono text-[11px] uppercase tracking-widest2 text-muted";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string; next?: string };
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4">
      {/* Same soft brand glow used on the public hero's placeholder background —
          the one deliberate visual echo of the main site on this otherwise
          plain, functional dashboard (Section 46: the admin doesn't need to
          match the public site, but the front door is worth five minutes). */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[60vh] w-[60vh] rounded-full bg-electric/10 blur-[140px]" />
      </div>

      <div className="relative w-full max-w-[380px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/images/logo.png"
            alt="The Cine Films"
            width={113}
            height={64}
            priority
            className="h-10 w-auto object-contain"
          />
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest2 text-gold">Content Dashboard</p>
          <h1 className="mt-1.5 font-display text-2xl uppercase leading-none text-offwhite">Sign In</h1>
        </div>

        <div className="rounded-2xl border border-line bg-charcoal/80 p-7 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          {searchParams.error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {searchParams.error}
            </div>
          )}

          <form action={loginAction} className="space-y-5">
            <input type="hidden" name="next" value={searchParams.next || "/admin"} />
            <div>
              <label className={darkLabel} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                className={darkInput}
              />
            </div>
            <div>
              <label className={darkLabel} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={darkInput}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-gold px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-widest2 text-ink transition-colors hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-widest2 text-muted/70">
          The Cine Films &middot; Pokhara, Nepal
        </p>
      </div>
    </div>
  );
}
