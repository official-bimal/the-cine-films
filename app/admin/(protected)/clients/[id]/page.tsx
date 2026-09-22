import { notFound } from "next/navigation";
import { getClientById } from "@/lib/repositories/clients";
import { updateClientAction } from "@/lib/actions/clients";
import { pageTitle } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";
import ClientForm from "@/components/admin/ClientForm";

export default async function EditClientPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const client = await getClientById(params.id);
  if (!client) notFound();

  return (
    <div className="max-w-xl">
      <h1 className={pageTitle}>Edit Client</h1>
      <div className="mt-6">
        <Banner error={searchParams.error} />
      </div>
      <ClientForm client={client} action={updateClientAction.bind(null, params.id)} />
    </div>
  );
}
