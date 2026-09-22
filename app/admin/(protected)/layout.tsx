import type { Metadata } from "next";
import { requireAdminOrRedirect } from "@/lib/auth/guard";
import { logoutAction } from "@/lib/actions/auth";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "The Cine Films — Content Dashboard",
  robots: { index: false, follow: false },
};

// Every /admin page is session-gated and reads live, mutable data — it must
// never be statically prerendered/cached. Declaring this on the layout
// cascades to every route under it, so no individual admin page needs to
// repeat it.
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdminOrRedirect();

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      <AdminNav adminEmail={admin.email} logoutAction={logoutAction} />
      <main className="flex-1 overflow-y-auto px-8 py-8">{children}</main>
    </div>
  );
}
