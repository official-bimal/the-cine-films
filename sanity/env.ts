// Reads the two values you get from your free Sanity.io project.
// Set these in a .env.local file at the project root — see .env.local.example.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// The site is designed to keep working (using placeholder content from
// lib/data.ts) even if this is empty — this flag just lets components know
// whether it's safe to attempt a real fetch.
export const isSanityConfigured = Boolean(projectId);
