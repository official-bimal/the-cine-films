import "server-only";

// The public site must never hard-crash because the database had a blip —
// this is the direct successor to the old sanityFetch()'s try/catch-and-
// fall-back behavior (Phase 1 audit Section 7), now protecting every public
// read instead of just the Sanity ones. Callers pass a safe default (null or
// []) to return instead of throwing; the error is logged server-side, never
// shown to a visitor.
//
// One retry after a short delay before giving up: a page render fires several
// of these concurrently (Nav/Hero/Footer/TrustBar/Portfolio/Team/Testimonials
// all query independently), and a connection pool under momentary pressure —
// a real, if uncommon, condition for any database under concurrent load, not
// just this one — is worth one more attempt before falling back.
const RETRY_DELAY_MS = 150;

export async function safeQuery<T>(fn: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await fn();
  } catch {
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    try {
      return await fn();
    } catch (secondError) {
      console.error(`[db] ${label} failed twice, using fallback:`, secondError instanceof Error ? secondError.message : secondError);
      return fallback;
    }
  }
}
