"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { verifyPassword, hashPassword } from "@/lib/auth/password";
import { SESSION_COOKIE, sessionCookieOptions, signSession } from "@/lib/auth/session";
import { requireAdminOrThrow } from "@/lib/auth/guard";
import { loginSchema } from "@/lib/validations/auth";

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const nextPath = typeof formData.get("next") === "string" ? (formData.get("next") as string) : "/admin";
  const safeNext = nextPath.startsWith("/admin") ? nextPath : "/admin";

  if (!parsed.success) {
    redirect(`/admin/login?error=${encodeURIComponent("Enter a valid email and password.")}&next=${encodeURIComponent(safeNext)}`);
  }

  const { email, password } = parsed.data;
  const admin = await db.adminUser.findUnique({ where: { email } });

  // Deliberately identical error for "no such user" and "wrong password" —
  // distinguishing them lets an attacker enumerate valid admin emails.
  const invalid = () =>
    redirect(`/admin/login?error=${encodeURIComponent("Incorrect email or password.")}&next=${encodeURIComponent(safeNext)}`);

  if (!admin) invalid();
  const valid = await verifyPassword(password, admin!.passwordHash);
  if (!valid) invalid();

  const token = await signSession({ adminId: admin!.id, email: admin!.email });
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions);

  redirect(safeNext);
}

export async function logoutAction() {
  cookies().delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function changePasswordAction(formData: FormData) {
  const admin = await requireAdminOrThrow();

  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  const fail = (message: string) => redirect(`/admin/account?error=${encodeURIComponent(message)}`);

  if (newPassword.length < 8) fail("New password must be at least 8 characters.");
  if (newPassword !== confirmPassword) fail("New password and confirmation don't match.");

  const fresh = await db.adminUser.findUniqueOrThrow({ where: { id: admin.id } });
  const currentValid = await verifyPassword(currentPassword, fresh.passwordHash);
  if (!currentValid) fail("Current password is incorrect.");

  const passwordHash = await hashPassword(newPassword);
  await db.adminUser.update({ where: { id: admin.id }, data: { passwordHash } });

  redirect(`/admin/account?success=${encodeURIComponent("Password updated.")}`);
}
