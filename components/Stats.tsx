import { stats as placeholderStats } from "@/lib/data";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import StatsClient from "./StatsClient";

type Settings = {
  stats: { label: string; value: number; suffix: string }[] | null;
};

export default async function Stats() {
  const settings = await sanityFetch<Settings>(SITE_SETTINGS_QUERY);
  const stats =
    settings?.stats && settings.stats.length > 0 ? settings.stats : placeholderStats;

  return <StatsClient stats={stats} />;
}
