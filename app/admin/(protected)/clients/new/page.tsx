import { createClientAction } from "@/lib/actions/clients";
import { pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import ClientForm from "@/components/admin/ClientForm";

export default function NewClientPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="max-w-xl">
      <h1 className={pageTitle}>Add Client</h1>
      <div className="mt-6">
        <Banner error={searchParams.error} />
      </div>
      <ClientForm client={null} action={createClientAction} />
    </div>
  );
}
