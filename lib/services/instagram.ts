import "server-only";

import { instagramEmbedUrl } from "@/lib/video";
import { saveUpload } from "@/lib/services/media";

// Instagram has no public thumbnail URL like YouTube's i.ytimg.com, and the
// cover image its pages advertise (og:image) is a signed CDN link that
// expires after a few days. So when a project is saved with an Instagram
// link and no thumbnail, grab that cover once and store it with our other
// uploads. Best-effort: any failure (Instagram blocking the request, a
// private post, a timeout) returns null and the card keeps its placeholder.
const CRAWLER_UA = "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

export async function importInstagramThumbnail(link: string | null | undefined): Promise<string | null> {
  if (!link) return null;
  const embed = instagramEmbedUrl(link);
  if (!embed) return null;

  try {
    const pageUrl = embed.replace(/embed\/$/, "");
    const page = await fetch(pageUrl, {
      headers: { "User-Agent": CRAWLER_UA },
      signal: AbortSignal.timeout(5000),
    });
    if (!page.ok) {
      console.warn(`[instagram] ${pageUrl} returned ${page.status}`);
      return null;
    }

    const html = await page.text();
    const match = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
    if (!match) {
      console.warn(`[instagram] no og:image on ${pageUrl}`);
      return null;
    }
    const imageUrl = match[1].replace(/&amp;/g, "&");

    const image = await fetch(imageUrl, { signal: AbortSignal.timeout(5000) });
    const type = image.headers.get("content-type")?.split(";")[0] ?? "";
    if (!image.ok || !type.startsWith("image/")) return null;

    const file = new File([await image.arrayBuffer()], "instagram-thumbnail", { type });
    const asset = await saveUpload(file);
    return asset.url;
  } catch (err) {
    console.warn("[instagram] thumbnail import failed:", err instanceof Error ? err.message : err);
    return null;
  }
}
