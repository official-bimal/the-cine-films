import { getCurrentAdmin } from "@/lib/auth/guard";
import { changePasswordAction } from "@/lib/actions/auth";
import { btnPrimary, cardPadded, fieldGroup, input, label, pageSubtitle, pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";

export default async function AdminAccountPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  const admin = await getCurrentAdmin();

  return (
    <div className="max-w-md">
      <h1 className={pageTitle}>Admin Account</h1>
      <p className={pageSubtitle}>Signed in as {admin?.email}.</p>

      <div className="mt-6">
        <Banner success={searchParams.success} error={searchParams.error} />
      </div>

      <form action={changePasswordAction} className={cardPadded}>
        <h2 className="mb-4 text-sm font-semibold text-neutral-900">Change Password</h2>
        <div className={fieldGroup}>
          <label className={label} htmlFor="currentPassword">Current Password</label>
          <input id="currentPassword" name="currentPassword" type="password" required autoComplete="current-password" className={input} />
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="newPassword">New Password</label>
          <input id="newPassword" name="newPassword" type="password" required minLength={8} autoComplete="new-password" className={input} />
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="confirmPassword">Confirm New Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" className={input} />
        </div>
        <button type="submit" className={btnPrimary}>
          Update Password
        </button>
      </form>
    </div>
  );
}
