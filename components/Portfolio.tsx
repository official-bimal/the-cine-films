import { projects as placeholderProjects } from "@/lib/data";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import PortfolioClient from "./PortfolioClient";

type Project = {
  _id: string;
  title: string;
  category: string;
  client: string | null;
  year: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  externalVideoUrl: string | null;
};

export default async function Portfolio() {
  const cms = await sanityFetch<Project[]>(PROJECTS_QUERY);
  const projects: Project[] =
    cms && cms.length > 0
      ? cms
      : placeholderProjects.map((p, i) => ({
          _id: `placeholder-${i}`,
          title: p.title,
          category: p.category,
          client: p.client,
          year: p.year,
          thumbnailUrl: null,
          videoUrl: null,
          externalVideoUrl: null,
        }));

  return <PortfolioClient projects={projects} />;
}
