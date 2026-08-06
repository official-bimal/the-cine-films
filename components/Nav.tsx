import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import NavClient from "./NavClient";

type Settings = { logoUrl: string | null };

export default async function Nav() {
  const settings = await sanityFetch<Settings>(SITE_SETTINGS_QUERY);
  // Falls back to the real logo file shipped in /public/images/logo.png —
  // upload a different one in the CMS (Site Settings → Logo) to override it.
  const logoUrl = settings?.logoUrl || "/images/logo.png";

  return <NavClient logoUrl={logoUrl} />;
}
