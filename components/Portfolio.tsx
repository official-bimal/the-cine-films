import { getPublishedProjects, setProjectThumbnail } from "@/lib/repositories/portfolio";
import { importInstagramThumbnail } from "@/lib/services/instagram";
import PortfolioClient from "./PortfolioClient";

export default async function Portfolio() {
  const projects = await getPublishedProjects();

  // Backfill covers for Instagram projects saved without a thumbnail. Once
  // one is imported it's stored on the project, so this only does work for
  // projects that still lack one (and retries on the next revalidation if
  // Instagram refused the request).
  await Promise.all(
    projects
      .filter((p) => !p.thumbnailUrl && p.externalVideoUrl)
      .map(async (p) => {
        const url = await importInstagramThumbnail(p.externalVideoUrl);
        if (!url) return;
        p.thumbnailUrl = url;
        await setProjectThumbnail(p.id, url).catch(() => {});
      })
  );

  return (
    <PortfolioClient
      projects={projects.map((p) => ({
        _id: p.id,
        title: p.title,
        category: p.category,
        client: p.client,
        year: p.year,
        thumbnailUrl: p.thumbnailUrl,
        videoUrl: p.videoUrl,
        externalVideoUrl: p.externalVideoUrl,
      }))}
    />
  );
}
