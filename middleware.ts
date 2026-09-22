import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";

// Edge-level gate for /admin/*: a fast redirect before any admin page even
// starts rendering. This only checks the session token's signature/expiry
// (no DB round trip — Prisma isn't available on the Edge runtime); the
// authoritative check that the admin account still exists happens in
// app/admin/layout.tsx via requireAdminOrRedirect(). Neither check alone is
// the full story — Section 57 of the Phase 1 audit is explicit that hiding a
// button is not authorization, so every mutating Server Action also calls
// requireAdminOrThrow() itself rather than trusting either of these gates.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    // Already signed in? Skip the login page instead of showing it again.
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = await verifySession(token);
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);
  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
