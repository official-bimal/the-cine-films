import type { Metadata } from "next";

// Keeps the CMS dashboard out of Google — it's a private admin tool, not a
// page the public should ever land on via search.
export const metadata: Metadata = {
  title: "The Cine Films — Content Dashboard",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
