import Link from "next/link";
import { getAllTeamMembersForAdmin } from "@/lib/repositories/team";
import { deleteTeamMemberAction, moveTeamMemberAction } from "@/lib/actions/team";
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

export default async function TeamListPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  const members = await getAllTeamMembersForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={pageTitle}>Team</h1>
          <p className={pageSubtitle}>Only Active members appear on the site.</p>
        </div>
        <Link href="/admin/team/new" className={btnPrimary}>
          Add Team Member
        </Link>
      </div>

      <div className="mt-6">
        <Banner success={searchParams.success} error={searchParams.error} />
      </div>

      {members.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500">No team members yet. Add your first one.</p>
      ) : (
        <div className={tableWrap}>
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className={th}>Order</th>
                <th className={th}>Name</th>
                <th className={th}>Role</th>
                <th className={th}>Status</th>
                <th className={th}></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={m.id} className={trHover}>
                  <td className={td}>
                    <div className="flex gap-1">
                      <form action={moveTeamMemberAction}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" className={btnGhostSmall} disabled={i === 0}>↑</button>
                      </form>
                      <form action={moveTeamMemberAction}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" className={btnGhostSmall} disabled={i === members.length - 1}>↓</button>
                      </form>
                    </div>
                  </td>
                  <td className={td}>
                    <Link href={`/admin/team/${m.id}`} className="font-medium text-neutral-900 hover:underline">
                      {m.name}
                    </Link>
                  </td>
                  <td className={td}>{m.role || "—"}</td>
                  <td className={td}>
                    <span className={m.active ? badgeActive : badgeInactive}>{m.active ? "Active" : "Inactive"}</span>
                  </td>
                  <td className={td}>
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/team/${m.id}`} className={btnGhostSmall}>
                        Edit
                      </Link>
                      <form action={deleteTeamMemberAction}>
                        <input type="hidden" name="id" value={m.id} />
                        <DeleteButton confirmText={`Delete "${m.name}"? This action cannot be undone.`} />
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
