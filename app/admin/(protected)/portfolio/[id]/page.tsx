import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/repositories/portfolio";
import { updateProjectAction } from "@/lib/actions/portfolio";
import { pageSubtitle, pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const project = await getProjectById(params.id);
  if (!project) notFound();

  const action = updateProjectAction.bind(null, params.id);

  return (
    <div className="max-w-2xl">
      <h1 className={pageTitle}>Edit Project</h1>
      <p className={pageSubtitle}>{project.title}</p>
      <div className="mt-6">
        <Banner error={searchParams.error} />
      </div>
      <ProjectForm project={project} action={action} />
    </div>
  );
}
