import type { PortfolioProject } from "@prisma/client";
import { PROJECT_CATEGORIES } from "@/lib/validations/portfolio";
import { btnPrimary, btnSecondary, cardPadded, fieldGroup, input, label, select } from "@/lib/admin-ui";
import Link from "next/link";

export default function ProjectForm({
  project,
  action,
}: {
  project: PortfolioProject | null;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className={cardPadded}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={fieldGroup}>
          <label className={label} htmlFor="title">Title</label>
          <input id="title" name="title" required defaultValue={project?.title ?? ""} className={input} />
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="slug">
            Slug <span className="font-normal text-neutral-400">(auto-generated from title if left blank)</span>
          </label>
          <input id="slug" name="slug" defaultValue={project?.slug ?? ""} className={input} />
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue={project?.category ?? PROJECT_CATEGORIES[0]} className={select}>
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={project?.status ?? "DRAFT"} className={select}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="client">Client</label>
          <input id="client" name="client" defaultValue={project?.client ?? ""} className={input} />
        </div>
        <div className={fieldGroup}>
          <label className={label} htmlFor="year">Year</label>
          <input id="year" name="year" defaultValue={project?.year ?? ""} className={input} />
        </div>
      </div>

      <div className={fieldGroup}>
        <label className={label} htmlFor="description">Description (optional)</label>
        <textarea id="description" name="description" defaultValue={project?.description ?? ""} className={input + " min-h-[80px]"} />
      </div>

      <div className={fieldGroup}>
        <label className={label}>Thumbnail Image</label>
        {project?.thumbnailUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.thumbnailUrl} alt="" className="mb-2 h-24 w-auto rounded object-cover" />
        )}
        <input type="file" name="thumbnailFile" accept="image/*" className={input} />
        <input type="hidden" name="thumbnailCurrent" value={project?.thumbnailUrl ?? ""} />
        <p className="mt-1 text-xs text-neutral-400">Optional — if empty, the YouTube link&apos;s own thumbnail is used.</p>
      </div>

      <div className={fieldGroup}>
        <label className={label}>Video File (optional)</label>
        {project?.videoUrl && <p className="mb-2 text-xs text-neutral-500">Current: {project.videoUrl}</p>}
        <input type="file" name="videoFile" accept="video/*" className={input} />
        <input type="hidden" name="videoCurrent" value={project?.videoUrl ?? ""} />
      </div>

      <div className={fieldGroup}>
        <label className={label} htmlFor="externalVideoUrl">Video Link (YouTube/Vimeo, alternative to an uploaded file)</label>
        <input id="externalVideoUrl" name="externalVideoUrl" defaultValue={project?.externalVideoUrl ?? ""} className={input} />
      </div>

      <div className={fieldGroup}>
        <label className={label} htmlFor="order">Display Order</label>
        <input id="order" name="order" type="number" defaultValue={project?.order ?? 0} className={input + " max-w-[120px]"} />
      </div>

      <div className="mt-6 flex gap-3">
        <button type="submit" className={btnPrimary}>
          {project ? "Save Changes" : "Create Project"}
        </button>
        <Link href="/admin/portfolio" className={btnSecondary}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
