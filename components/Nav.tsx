import { getSiteSettings } from "@/lib/repositories/site-settings";
import NavClient from "./NavClient";

export default async function Nav() {
  const settings = await getSiteSettings();
  // Falls back to the real logo file shipped in /public/images/logo.png —
  // upload a different one in the dashboard (Site Settings → Logo) to override it.
  const logoUrl = settings?.logoUrl || "/images/logo.png";

  return <NavClient logoUrl={logoUrl} />;
}
