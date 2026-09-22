import Link from "next/link";
import { getAllTestimonialsForAdmin } from "@/lib/repositories/testimonials";
import { deleteTestimonialAction, moveTestimonialAction } from "@/lib/actions/testimonials";
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

export default async function TestimonialsListPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  const testimonials = await getAllTestimonialsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={pageTitle}>Testimonials</h1>
          <p className={pageSubtitle}>Only Published testimonials appear on the live site.</p>
        </div>
        <Link href="/admin/testimonials/new" className={btnPrimary}>
          Add Testimonial
        </Link>
      </div>

      <div className="mt-6">
        <Banner success={searchParams.success} error={searchParams.error} />
      </div>

      {testimonials.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500">No testimonials yet. Add your first one.</p>
      ) : (
        <div className={tableWrap}>
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className={th}>Order</th>
                <th className={th}>Name</th>
                <th className={th}>Company</th>
                <th className={th}>Rating</th>
                <th className={th}>Status</th>
                <th className={th}></th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t, i) => (
                <tr key={t.id} className={trHover}>
                  <td className={td}>
                    <div className="flex gap-1">
                      <form action={moveTestimonialAction}>
                        <input type="hidden" name="id" value={t.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" className={btnGhostSmall} disabled={i === 0}>↑</button>
                      </form>
                      <form action={moveTestimonialAction}>
                        <input type="hidden" name="id" value={t.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" className={btnGhostSmall} disabled={i === testimonials.length - 1}>↓</button>
                      </form>
                    </div>
                  </td>
                  <td className={td}>
                    <Link href={`/admin/testimonials/${t.id}`} className="font-medium text-neutral-900 hover:underline">
                      {t.name}
                    </Link>
                  </td>
                  <td className={td}>{t.company || "—"}</td>
                  <td className={td}>{"★".repeat(t.rating)}</td>
                  <td className={td}>
                    <span className={t.status === "PUBLISHED" ? badgePublished : badgeDraft}>{t.status}</span>
                  </td>
                  <td className={td}>
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/testimonials/${t.id}`} className={btnGhostSmall}>
                        Edit
                      </Link>
                      <form action={deleteTestimonialAction}>
                        <input type="hidden" name="id" value={t.id} />
                        <DeleteButton confirmText={`Delete this testimonial from ${t.name}? This action cannot be undone.`} />
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
