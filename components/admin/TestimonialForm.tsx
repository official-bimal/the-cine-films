import type { Testimonial } from "@prisma/client";
import Link from "next/link";
import { btnPrimary, btnSecondary, cardPadded, fieldGroup, input, label, select, textarea } from "@/lib/admin-ui";

export default function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial: Testimonial | null;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className={cardPadded}>
      <div className={fieldGroup}>
        <label className={label} htmlFor="quote">Quote</label>
        <textarea id="quote" name="quote" required defaultValue={testimonial?.quote ?? ""} className={textarea} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className={fieldGroup}>
          <label className={label} htmlFor="name">Client Name</label>
          <input id="name" name="name" required defaultValue={testimonial?.name ?? ""} className={input} />
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="role">Role</label>
          <input id="role" name="role" defaultValue={testimonial?.role ?? ""} className={input} />
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="company">Company</label>
          <input id="company" name="company" defaultValue={testimonial?.company ?? ""} className={input} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className={fieldGroup}>
          <label className={label} htmlFor="rating">Star Rating</label>
          <select id="rating" name="rating" defaultValue={testimonial?.rating ?? 5} className={select}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={testimonial?.status ?? "DRAFT"} className={select}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="order">Display Order</label>
          <input id="order" name="order" type="number" defaultValue={testimonial?.order ?? 0} className={input} />
        </div>
      </div>

      <div className={fieldGroup}>
        <label className={label}>Client Photo</label>
        {testimonial?.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={testimonial.photoUrl} alt="" className="mb-2 h-16 w-16 rounded-full object-cover" />
        )}
        <input type="file" name="photoFile" accept="image/*" className={input} />
        <input type="hidden" name="photoCurrent" value={testimonial?.photoUrl ?? ""} />
        <p className="mt-1 text-xs text-neutral-400">Optional — if empty, initials are shown instead.</p>
      </div>

      <div className="mt-6 flex gap-3">
        <button type="submit" className={btnPrimary}>
          {testimonial ? "Save Changes" : "Add Testimonial"}
        </button>
        <Link href="/admin/testimonials" className={btnSecondary}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
