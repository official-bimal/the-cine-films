import Link from "next/link";
import { getAllProjectsForAdmin } from "@/lib/repositories/portfolio";
import { deleteProjectAction, moveProjectAction } from "@/lib/actions/portfolio";
import {
  badgeDraft,
  badgePublished,
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

export default async function PortfolioListPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  const projects = await getAllProjectsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={pageTitle}>Portfolio</h1>
          <p className={pageSubtitle}>Only Published projects appear on the live site.</p>
        </div>
        <Link href="/admin/portfolio/new" className={btnPrimary}>
          New Project
        </Link>
      </div>

      <div className="mt-6">
        <Banner success={searchParams.success} error={searchParams.error} />
      </div>

      {projects.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500">No portfolio projects yet. Create your first one.</p>
      ) : (
        <div className={tableWrap}>
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className={th}>Order</th>
                <th className={th}>Title</th>
                <th className={th}>Category</th>
                <th className={th}>Client</th>
                <th className={th}>Status</th>
                <th className={th}></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={p.id} className={trHover}>
                  <td className={td}>
                    <div className="flex gap-1">
                      <form action={moveProjectAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" className={btnGhostSmall} disabled={i === 0}>↑</button>
                      </form>
                      <form action={moveProjectAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" className={btnGhostSmall} disabled={i === projects.length - 1}>↓</button>
                      </form>
                    </div>
                  </td>
                  <td className={td}>
                    <Link href={`/admin/portfolio/${p.id}`} className="font-medium text-neutral-900 hover:underline">
                      {p.title}
                    </Link>
                  </td>
                  <td className={td}>{p.category}</td>
                  <td className={td}>{p.client || "—"}</td>
                  <td className={td}>
                    <span className={p.status === "PUBLISHED" ? badgePublished : badgeDraft}>{p.status}</span>
                  </td>
                  <td className={td}>
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/portfolio/${p.id}`} className={btnGhostSmall}>
                        Edit
                      </Link>
                      <form action={deleteProjectAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <DeleteButton confirmText={`Delete "${p.title}"? This action cannot be undone.`} />
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
