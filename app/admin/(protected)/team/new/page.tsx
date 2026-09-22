import { createTeamMemberAction } from "@/lib/actions/team";
import { pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import TeamMemberForm from "@/components/admin/TeamMemberForm";

export default function NewTeamMemberPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="max-w-xl">
      <h1 className={pageTitle}>Add Team Member</h1>
      <div className="mt-6">
        <Banner error={searchParams.error} />
      </div>
      <TeamMemberForm member={null} action={createTeamMemberAction} />
    </div>
  );
}
