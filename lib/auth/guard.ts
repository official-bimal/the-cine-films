import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";

// Verifies the session token only (no DB round trip) — use where you just
// need to know "is someone logged in", e.g. redirecting a logged-in visitor
// away from /admin/login.
export async function getSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

// Verifies the session AND that the admin account still exists (it may have
// been deleted after the token was issued) — the check every protected page
// and every mutating server action must use before touching the database.
export async function getCurrentAdmin() {
  const session = await getSession();
  if (!session) return null;

  const admin = await db.adminUser.findUnique({ where: { id: session.adminId } });
  if (!admin) return null;

  return admin;
}

// For Server Components / layouts: redirects unauthenticated visitors to
// login instead of rendering anything.
export async function requireAdminOrRedirect() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

// For Server Actions: mutations can't silently redirect a fetch() call, so
// this throws instead — every action's catch block should surface this as
// "please sign in again" and the client redirects on that error.
export async function requireAdminOrThrow() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHENTICATED");
  return admin;
}
