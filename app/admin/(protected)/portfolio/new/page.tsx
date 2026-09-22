import { createProjectAction } from "@/lib/actions/portfolio";
import { pageSubtitle, pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="max-w-2xl">
      <h1 className={pageTitle}>New Portfolio Project</h1>
      <p className={pageSubtitle}>New projects start as Draft — publish when ready.</p>
      <div className="mt-6">
        <Banner error={searchParams.error} />
      </div>
      <ProjectForm project={null} action={createProjectAction} />
    </div>
  );
}
