// Best-effort conversion of a YouTube/Vimeo "watch" link (what someone
// would naturally paste into the CMS) into an embeddable player URL.
export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    if (u.hostname === "youtu.be") return u.pathname.replace("/", "") || null;
    return null;
  } catch {
    return null;
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
