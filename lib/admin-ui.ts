// Shared Tailwind class strings for the admin dashboard. Deliberately not a
// component library (Section 46 of the Phase 1 audit: "avoid building a
// flashy marketing dashboard", Section 40: "do not introduce a large UI
// framework just for the dashboard unless there is a strong reason") — the
// admin has its own plain, functional visual language, built on the same
// Tailwind install as the public site, no new dependency.

export const input =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900";
export const textarea = input + " min-h-[100px]";
export const select = input;
export const label = "block text-sm font-medium text-neutral-700 mb-1";
export const fieldGroup = "mb-5";
export const checkboxRow = "flex items-center gap-2 text-sm text-neutral-700";

export const btnPrimary =
  "inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50";
export const btnSecondary =
  "inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2";
export const btnDanger =
  "inline-flex items-center justify-center rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2";
export const btnGhostSmall =
  "inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none";

export const card = "rounded-lg border border-neutral-200 bg-white shadow-sm";
export const cardPadded = card + " p-6";

export const pageTitle = "text-xl font-semibold text-neutral-900";
export const pageSubtitle = "mt-1 text-sm text-neutral-500";

export const tableWrap = "overflow-hidden rounded-lg border border-neutral-200 bg-white";
export const th = "px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500";
export const td = "px-4 py-3 text-sm text-neutral-800 align-middle";
export const trHover = "border-t border-neutral-100 hover:bg-neutral-50";

export const badgePublished = "inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700";
export const badgeDraft = "inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600";
export const badgeActive = badgePublished;
export const badgeInactive = badgeDraft;
