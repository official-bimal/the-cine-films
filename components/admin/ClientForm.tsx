import type { Client } from "@prisma/client";
import Link from "next/link";
import { btnPrimary, btnSecondary, cardPadded, checkboxRow, fieldGroup, input, label } from "@/lib/admin-ui";

export default function ClientForm({
  client,
  action,
}: {
  client: Client | null;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className={cardPadded}>
      <div className={fieldGroup}>
        <label className={label} htmlFor="name">Client / Brand Name</label>
        <input id="name" name="name" required defaultValue={client?.name ?? ""} className={input} />
      </div>

      <div className={fieldGroup}>
        <label className={label}>Logo</label>
        {client?.logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={client.logoUrl} alt="" className="mb-2 h-12 w-auto object-contain" />
        )}
        <input type="file" name="logoFile" accept="image/*" className={input} />
        <input type="hidden" name="logoCurrent" value={client?.logoUrl ?? ""} />
        <p className="mt-1 text-xs text-neutral-400">Optional — if empty, the name is shown as text instead.</p>
      </div>

      <div className={fieldGroup}>
        <label className={label} htmlFor="order">Display Order</label>
        <input id="order" name="order" type="number" defaultValue={client?.order ?? 0} className={input + " max-w-[120px]"} />
      </div>

      <label className={checkboxRow}>
        <input type="checkbox" name="active" defaultChecked={client?.active ?? true} />
        Active (shown on the site)
      </label>

      <div className="mt-6 flex gap-3">
        <button type="submit" className={btnPrimary}>
          {client ? "Save Changes" : "Add Client"}
        </button>
        <Link href="/admin/clients" className={btnSecondary}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
