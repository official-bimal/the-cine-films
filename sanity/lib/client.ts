import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  // "published" content only, no drafts, no auth token needed to read —
  // fine for a public marketing site.
  useCdn: true,
});
