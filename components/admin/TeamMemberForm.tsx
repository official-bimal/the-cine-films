import type { TeamMember } from "@prisma/client";
import Link from "next/link";
import { btnPrimary, btnSecondary, cardPadded, checkboxRow, fieldGroup, input, label } from "@/lib/admin-ui";

export default function TeamMemberForm({
  member,
  action,
}: {
  member: TeamMember | null;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className={cardPadded}>
      <div className={fieldGroup}>
        <label className={label} htmlFor="name">Full Name</label>
        <input id="name" name="name" required defaultValue={member?.name ?? ""} className={input} />
      </div>
      <div className={fieldGroup}>
        <label className={label} htmlFor="role">Role</label>
        <input id="role" name="role" defaultValue={member?.role ?? ""} className={input} />
      </div>

      <div className={fieldGroup}>
        <label className={label}>Photo</label>
        {member?.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photoUrl} alt="" className="mb-2 h-20 w-20 rounded-lg object-cover" />
        )}
        <input type="file" name="photoFile" accept="image/*" className={input} />
        <input type="hidden" name="photoCurrent" value={member?.photoUrl ?? ""} />
        <p className="mt-1 text-xs text-neutral-400">Optional — if empty, initials are shown instead.</p>
      </div>

      <div className={fieldGroup}>
        <label className={label} htmlFor="instagram">Instagram Link</label>
        <input id="instagram" name="instagram" defaultValue={member?.instagram ?? ""} className={input} />
      </div>

      <div className={fieldGroup}>
        <label className={label} htmlFor="order">Display Order</label>
        <input id="order" name="order" type="number" defaultValue={member?.order ?? 0} className={input + " max-w-[120px]"} />
      </div>

      <label className={checkboxRow}>
        <input type="checkbox" name="active" defaultChecked={member?.active ?? true} />
        Active (shown on the site)
      </label>

      <div className="mt-6 flex gap-3">
        <button type="submit" className={btnPrimary}>
          {member ? "Save Changes" : "Add Team Member"}
        </button>
        <Link href="/admin/team" className={btnSecondary}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
