import type { TeamMember } from "@prisma/client";
import Link from "next/link";
import { btnPrimary, btnSecondary, cardPadded, checkboxRow, fieldGroup, input, label } from "@/lib/admin-ui";
import MediaField from "./MediaField";

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
        <MediaField
          name="photo"
          label="Photo"
          kind="image"
          currentUrl={member?.photoUrl}
          previewClassName="h-20 w-20 rounded-lg object-cover"
          help={<>Optional — if empty, initials are shown instead.</>}
        />
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
