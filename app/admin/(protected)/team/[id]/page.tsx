import { notFound } from "next/navigation";
import { getTeamMemberById } from "@/lib/repositories/team";
import { updateTeamMemberAction } from "@/lib/actions/team";
import { pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import TeamMemberForm from "@/components/admin/TeamMemberForm";

export default async function EditTeamMemberPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const member = await getTeamMemberById(params.id);
  if (!member) notFound();

  return (
    <div className="max-w-xl">
      <h1 className={pageTitle}>Edit Team Member</h1>
      <div className="mt-6">
        <Banner error={searchParams.error} />
      </div>
      <TeamMemberForm member={member} action={updateTeamMemberAction.bind(null, params.id)} />
    </div>
  );
}
