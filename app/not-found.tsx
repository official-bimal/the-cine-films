import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest2 text-gold">Scene Missing</p>
      <h1 className="mt-4 font-display text-7xl uppercase text-offwhite sm:text-8xl">404</h1>
      <p className="mt-4 max-w-sm text-muted">
        This frame didn&apos;t make the final cut. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-gold px-7 py-3 font-mono text-xs uppercase tracking-widest2 text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        Back To Home
      </Link>
    </div>
  );
}
