"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminOrThrow } from "@/lib/auth/guard";
import {
  createClient,
  deleteClient,
  getAllClientsForAdmin,
  setClientOrder,
  updateClient,
} from "@/lib/repositories/clients";
import { clientSchema } from "@/lib/validations/client";
import { resolveMediaUrl } from "@/lib/actions/shared";
import { MediaValidationError } from "@/lib/services/media";

async function buildInput(formData: FormData) {
  const logoUrl = await resolveMediaUrl(formData, "logo");
  return {
    name: formData.get("name"),
    logoUrl,
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  };
}

export async function createClientAction(formData: FormData) {
  await requireAdminOrThrow();
  try {
    const parsed = clientSchema.safeParse(await buildInput(formData));
    if (!parsed.success) {
      redirect(`/admin/clients/new?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
    }
    await createClient(parsed.data);
  } catch (err) {
    if (err instanceof MediaValidationError) redirect(`/admin/clients/new?error=${encodeURIComponent(err.message)}`);
    throw err;
  }
  revalidatePath("/");
  revalidatePath("/admin/clients");
  redirect(`/admin/clients?success=${encodeURIComponent("Client added.")}`);
}

export async function updateClientAction(id: string, formData: FormData) {
  await requireAdminOrThrow();
  try {
    const parsed = clientSchema.safeParse(await buildInput(formData));
    if (!parsed.success) {
      redirect(`/admin/clients/${id}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
    }
    await updateClient(id, parsed.data);
  } catch (err) {
    if (err instanceof MediaValidationError) redirect(`/admin/clients/${id}?error=${encodeURIComponent(err.message)}`);
    throw err;
  }
  revalidatePath("/");
  revalidatePath("/admin/clients");
  redirect(`/admin/clients?success=${encodeURIComponent("Client updated.")}`);
}

export async function deleteClientAction(formData: FormData) {
  await requireAdminOrThrow();
  await deleteClient(String(formData.get("id")));
  revalidatePath("/");
  revalidatePath("/admin/clients");
  redirect(`/admin/clients?success=${encodeURIComponent("Client deleted.")}`);
}

export async function moveClientAction(formData: FormData) {
  await requireAdminOrThrow();
  const id = String(formData.get("id"));
  const direction = String(formData.get("direction"));

  const all = await getAllClientsForAdmin();
  const index = all.findIndex((c) => c.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= all.length) return;

  await setClientOrder(all[index].id, all[swapWith].order);
  await setClientOrder(all[swapWith].id, all[index].order);

  revalidatePath("/");
  revalidatePath("/admin/clients");
}
