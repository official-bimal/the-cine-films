"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_NAMESPACE = "30min";
const CAL_LINK = "prajwol-subedi-sztcmv/30min";
const CAL_BRAND = "#D4A853";

// Kept in its own file so ContactClient can load it on demand: the Cal.com
// script and its iframe are heavy, and nobody needs them until they scroll here.
export default function CalEmbed() {
  // Theme the embedded calendar to match the site: dark, with the gold accent.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": CAL_BRAND },
          dark: { "cal-brand": CAL_BRAND },
        },
      });
    })();
  }, []);

  return (
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={CAL_LINK}
      style={{ width: "100%" }}
      config={{ layout: "month_view", theme: "dark", useSlotsViewOnSmallScreen: "true" }}
    />
  );
}
