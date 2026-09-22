import { listMediaAssets } from "@/lib/services/media";
import { uploadMediaAction, deleteMediaAction } from "@/lib/actions/media";
import { btnPrimary, cardPadded, fieldGroup, input, label, pageSubtitle, pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import DeleteButton from "@/components/admin/DeleteButton";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default async function MediaLibraryPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  const assets = await listMediaAssets();

  return (
    <div>
      <h1 className={pageTitle}>Media Library</h1>
      <p className={pageSubtitle}>
        Every uploaded image and video, browsable in one place — copy a URL to reuse it in Portfolio, Clients, Team,
        or Testimonials instead of re-uploading.
      </p>

      <div className="mt-6">
        <Banner success={searchParams.success} error={searchParams.error} />
      </div>

      <form action={uploadMediaAction} className={`${cardPadded} mb-8 flex flex-wrap items-end gap-4`}>
        <div className={fieldGroup + " mb-0 flex-1 min-w-[240px]"}>
          <label className={label} htmlFor="file">Upload File</label>
          <input id="file" name="file" type="file" required accept="image/*,video/*" className={input} />
        </div>
        <div className={fieldGroup + " mb-0 flex-1 min-w-[200px]"}>
          <label className={label} htmlFor="altText">Alt text (optional)</label>
          <input id="altText" name="altText" className={input} />
        </div>
        <button type="submit" className={btnPrimary}>
          Upload
        </button>
      </form>

      {assets.length === 0 ? (
        <p className="text-sm text-neutral-500">No media uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {assets.map((asset) => (
            <div key={asset.id} className="rounded-lg border border-neutral-200 bg-white p-2">
              <div className="relative aspect-square overflow-hidden rounded bg-neutral-100">
                {asset.mimeType.startsWith("video/") ? (
                  <video src={asset.url} className="h-full w-full object-cover" muted />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset.url} alt={asset.altText ?? ""} className="h-full w-full object-cover" />
                )}
              </div>
              <p className="mt-2 truncate text-xs text-neutral-600" title={asset.url}>{asset.url}</p>
              <p className="text-[11px] text-neutral-400">{formatBytes(asset.size)}</p>
              <form action={deleteMediaAction} className="mt-2">
                <input type="hidden" name="id" value={asset.id} />
                <DeleteButton
                  label="Remove"
                  confirmText="Remove this asset from the library? Anything still using its URL keeps working, but you won't be able to pick it from the library again."
                />
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
