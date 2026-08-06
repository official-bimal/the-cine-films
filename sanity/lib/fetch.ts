import { client } from "./client";
import { isSanityConfigured } from "../env";

// Every call site treats a failed/empty CMS fetch as "no CMS content yet"
// and falls back to the placeholder data in lib/data.ts. This means the
// site never breaks or shows a blank section — before you connect Sanity,
// during setup, or if a fetch ever fails, visitors just see the placeholder
// content instead of an error.
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!isSanityConfigured) return null;

  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    return data ?? null;
  } catch (error) {
    console.warn("[sanity] fetch failed, falling back to placeholder content:", error);
    return null;
  }
}
