"use client";

import { useEffect, useRef, useState } from "react";
import { btnDanger, btnGhostSmall, input, label as labelClass } from "@/lib/admin-ui";

// Drop-in replacement for the `${name}File` + `${name}Current` pair that
// resolveMediaUrl() reads (lib/actions/shared.ts). Adds what a bare file
// input can't do: clear a file you just picked, and remove the media that's
// already saved. Removing blanks `${name}Current`, so the server stores null,
// and sets `${name}Removed` for actions that would otherwise auto-fill it.
export default function MediaField({
  name,
  label,
  kind,
  currentUrl,
  previewClassName,
  help,
}: {
  name: string;
  label: string;
  kind: "image" | "video";
  currentUrl?: string | null;
  previewClassName?: string;
  help?: React.ReactNode;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [removed, setRemoved] = useState(false);
  const [picked, setPicked] = useState<{ url: string; name: string } | null>(null);

  useEffect(() => () => {
    if (picked) URL.revokeObjectURL(picked.url);
  }, [picked]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPicked(file ? { url: URL.createObjectURL(file), name: file.name } : null);
  }

  function clearPicked() {
    if (fileRef.current) fileRef.current.value = "";
    setPicked(null);
  }

  const previewClass = previewClassName ?? "h-24 w-auto rounded object-cover";

  function preview(src: string) {
    return kind === "image" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className={previewClass} />
    ) : (
      <video src={src} controls muted preload="metadata" className="h-32 w-auto rounded bg-black" />
    );
  }

  return (
    <div>
      <label className={labelClass} htmlFor={`${name}File`}>{label}</label>

      {picked ? (
        <div className="mb-2 flex flex-wrap items-end gap-3">
          {preview(picked.url)}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-neutral-500">New: {picked.name}</span>
            <button type="button" onClick={clearPicked} className={btnGhostSmall}>
              Clear selection
            </button>
          </div>
        </div>
      ) : currentUrl && !removed ? (
        <div className="mb-2 flex flex-wrap items-end gap-3">
          {preview(currentUrl)}
          <div className="flex flex-col gap-1">
            {kind === "video" && <span className="max-w-xs truncate text-xs text-neutral-500">Current: {currentUrl}</span>}
            <button type="button" onClick={() => setRemoved(true)} className={btnDanger}>
              Remove
            </button>
          </div>
        </div>
      ) : currentUrl && removed ? (
        <div className="mb-2 flex items-center gap-3 rounded-md border border-dashed border-red-200 bg-red-50 px-3 py-2">
          <span className="text-xs text-red-600">Current {kind} will be removed when you save.</span>
          <button type="button" onClick={() => setRemoved(false)} className={btnGhostSmall}>
            Undo
          </button>
        </div>
      ) : null}

      <input
        ref={fileRef}
        id={`${name}File`}
        type="file"
        name={`${name}File`}
        accept={kind === "image" ? "image/*" : "video/*"}
        onChange={onChange}
        className={input}
      />
      <input type="hidden" name={`${name}Current`} value={removed ? "" : currentUrl ?? ""} />
      {removed && <input type="hidden" name={`${name}Removed`} value="1" />}
      {help && <p className="mt-1 text-xs text-neutral-400">{help}</p>}
    </div>
  );
}
