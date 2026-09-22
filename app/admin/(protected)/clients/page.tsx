import Link from "next/link";
import { getAllClientsForAdmin } from "@/lib/repositories/clients";
import { deleteClientAction, moveClientAction } from "@/lib/actions/clients";
import {
  badgeActive,
  badgeInactive,
  btnGhostSmall,
  btnPrimary,
  pageSubtitle,
  pageTitle,
  tableWrap,
  td,
  th,
  trHover,
} from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function ClientsListPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  const clients = await getAllClientsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={pageTitle}>Clients / Brand Logos</h1>
          <p className={pageSubtitle}>The scrolling marquee near the top of the site.</p>
        </div>
        <Link href="/admin/clients/new" className={btnPrimary}>
          Add Client
        </Link>
      </div>

      <div className="mt-6">
        <Banner success={searchParams.success} error={searchParams.error} />
      </div>

      {clients.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500">No clients yet. Add your first one.</p>
      ) : (
        <div className={tableWrap}>
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className={th}>Order</th>
                <th className={th}>Name</th>
                <th className={th}>Status</th>
                <th className={th}></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => (
                <tr key={c.id} className={trHover}>
                  <td className={td}>
                    <div className="flex gap-1">
                      <form action={moveClientAction}>
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" className={btnGhostSmall} disabled={i === 0}>↑</button>
                      </form>
                      <form action={moveClientAction}>
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" className={btnGhostSmall} disabled={i === clients.length - 1}>↓</button>
                      </form>
                    </div>
                  </td>
                  <td className={td}>
                    <Link href={`/admin/clients/${c.id}`} className="font-medium text-neutral-900 hover:underline">
                      {c.name}
                    </Link>
                  </td>
                  <td className={td}>
                    <span className={c.active ? badgeActive : badgeInactive}>{c.active ? "Active" : "Inactive"}</span>
                  </td>
                  <td className={td}>
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/clients/${c.id}`} className={btnGhostSmall}>
                        Edit
                      </Link>
                      <form action={deleteClientAction}>
                        <input type="hidden" name="id" value={c.id} />
                        <DeleteButton confirmText={`Delete "${c.name}"? This action cannot be undone.`} />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
