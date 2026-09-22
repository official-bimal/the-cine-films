import { getPublishedProjects } from "@/lib/repositories/portfolio";
import PortfolioClient from "./PortfolioClient";

export default async function Portfolio() {
  const projects = await getPublishedProjects();

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
