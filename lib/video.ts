// Best-effort conversion of a YouTube/Vimeo "watch" link (what someone
// would naturally paste into the CMS) into an embeddable player URL.
export function toEmbedUrl(url: string): string | null {
  const ytId = youtubeId(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}`;
  try {
    const u = new URL(url);
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

// Handles watch?v=, youtu.be/, and /shorts/, /embed/, /live/ links.
function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.split("/")[1] || null;
    if (!u.hostname.endsWith("youtube.com")) return null;
    const path = u.pathname.match(/^\/(shorts|embed|live)\/([A-Za-z0-9_-]+)/);
    return path ? path[2] : u.searchParams.get("v");
  } catch {
    return null;
  }
}

// Shorts are portrait, so they get a portrait player like Instagram reels.
export function isYoutubeShort(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname.endsWith("youtube.com") && u.pathname.startsWith("/shorts/");
  } catch {
    return false;
  }
}

// YouTube's own thumbnail for a link: max resolution first, with a
// guaranteed-to-exist fallback for videos that have no max-res image.
export function youtubeThumbnails(url: string): { max: string; fallback: string } | null {
  const id = youtubeId(url);
  if (!id) return null;
  return {
    max: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    fallback: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

// Instagram reel/post link -> Instagram's embeddable player. Accepts
// /reel/, /reels/, /p/ and /tv/ links, with or without a username prefix.
export function instagramEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith("instagram.com")) return null;
    const match = u.pathname.match(/\/(reels?|p|tv)\/([A-Za-z0-9_-]+)/);
    if (!match) return null;
    const kind = match[1] === "p" ? "p" : "reel";
    return `https://www.instagram.com/${kind}/${match[2]}/embed/`;
  } catch {
    return null;
  }
}
