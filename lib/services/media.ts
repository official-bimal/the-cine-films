import "server-only";

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";

// ---------------------------------------------------------------------------
// Storage provider abstraction. Phase 1 audit (Section 23) required the
// frontend/admin never couple directly to a specific storage vendor — this
// module is the only place that touches the filesystem. Swapping to S3/R2/
// Vercel Blob later means rewriting `write()` below, nothing else in the app.
// ---------------------------------------------------------------------------

interface StorageProvider {
  write(filename: string, bytes: Buffer): Promise<{ url: string }>;
}

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

class LocalFilesystemStorage implements StorageProvider {
  async write(filename: string, bytes: Buffer) {
    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(path.join(UPLOAD_DIR, filename), bytes);
    return { url: `/uploads/${filename}` };
  }
}

const storage: StorageProvider = new LocalFilesystemStorage();

// ---------------------------------------------------------------------------
// Upload validation + persistence
// ---------------------------------------------------------------------------

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const ALLOWED_VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const MAX_IMAGE_BYTES = 15 * 1024 * 1024; // 15MB
const MAX_VIDEO_BYTES = 500 * 1024 * 1024; // 500MB

export class MediaValidationError extends Error {}

function extensionFor(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/quicktime": "mov",
  };
  return map[mimeType] ?? "bin";
}

export async function saveUpload(file: File, altText?: string) {
  const isImage = ALLOWED_IMAGE_TYPES.has(file.type);
  const isVideo = ALLOWED_VIDEO_TYPES.has(file.type);

  if (!isImage && !isVideo) {
    throw new MediaValidationError(`Unsupported file type: ${file.type || "unknown"}.`);
  }
  const maxBytes = isImage ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
  if (file.size > maxBytes) {
    throw new MediaValidationError(
      `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB (max ${maxBytes / 1024 / 1024}MB).`
    );
  }
  if (file.size === 0) {
    throw new MediaValidationError("File is empty.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const bytes = Buffer.from(arrayBuffer);

  // Content-addressed filename: re-uploading the same bytes reuses the same
  // URL, and every filename is unique-per-content, so the immutable 1-year
  // cache header in next.config.mjs is always safe (Section 15/23 of the audit
  // flagged the OLD "must rename on change" convention as a manual footgun).
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 16);
  const filename = `${hash}.${extensionFor(file.type)}`;

  const { url } = await storage.write(filename, bytes);

  const asset = await db.mediaAsset.create({
    data: {
      url,
      filename,
      mimeType: file.type,
      size: file.size,
      altText: altText || null,
    },
  });

  return asset;
}

export async function listMediaAssets() {
  return db.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteMediaAsset(id: string) {
  // Deletes the database record only — leaves the file on disk. Any entity
  // still referencing the URL keeps working; an admin who deletes an asset
  // still in use should be warned by the UI, not have it silently break.
  await db.mediaAsset.delete({ where: { id } });
}
