import "server-only";

import { saveUpload } from "@/lib/services/media";

// Every entity form pairs a file input (`${field}File`) with a hidden input
// carrying the current URL (`${field}Current`, empty for a new record). If a
// file was actually chosen, upload it and use the new URL; otherwise keep
// whatever was already there. This is what lets "upload a thumbnail" and
// "leave the existing one" both work through the same plain <form>, no JS
// required.
export async function resolveMediaUrl(formData: FormData, field: string): Promise<string> {
  const file = formData.get(`${field}File`);
  if (file instanceof File && file.size > 0) {
    const asset = await saveUpload(file);
    return asset.url;
  }
  return String(formData.get(`${field}Current`) || "");
}
