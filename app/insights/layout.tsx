import type { ReactNode } from "react";
import { InsightsFooter, InsightsHeader } from "@/components/insights/InsightsChrome";

// Articles are markdown in the repo; the header/footer read Site Settings from
// the database, so the section is refreshed hourly.
export const revalidate = 3600;

export default function InsightsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <InsightsHeader />
      <main id="main" className="pt-20">{children}</main>
      <InsightsFooter />
    </>
  );
}
