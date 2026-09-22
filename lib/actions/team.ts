"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminOrThrow } from "@/lib/auth/guard";
import {
  createTeamMember,
  deleteTeamMember,
  getAllTeamMembersForAdmin,
  setTeamMemberOrder,
  updateTeamMember,
} from "@/lib/repositories/team";
import { teamMemberSchema } from "@/lib/validations/team";
import { resolveMediaUrl } from "@/lib/actions/shared";
import { MediaValidationError } from "@/lib/services/media";

async function buildInput(formData: FormData) {
  const photoUrl = await resolveMediaUrl(formData, "photo");
  return {
    name: formData.get("name"),
    role: formData.get("role"),
    photoUrl,
    instagram: formData.get("instagram"),
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  };
}

export async function createTeamMemberAction(formData: FormData) {
  await requireAdminOrThrow();
  try {
    const parsed = teamMemberSchema.safeParse(await buildInput(formData));
    if (!parsed.success) {
      redirect(`/admin/team/new?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
    }
    await createTeamMember(parsed.data);
  } catch (err) {
    if (err instanceof MediaValidationError) redirect(`/admin/team/new?error=${encodeURIComponent(err.message)}`);
    throw err;
  }
  revalidatePath("/");
  revalidatePath("/admin/team");
  redirect(`/admin/team?success=${encodeURIComponent("Team member added.")}`);
}

export async function updateTeamMemberAction(id: string, formData: FormData) {
  await requireAdminOrThrow();
  try {
    const parsed = teamMemberSchema.safeParse(await buildInput(formData));
    if (!parsed.success) {
      redirect(`/admin/team/${id}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
    }
    await updateTeamMember(id, parsed.data);
  } catch (err) {
    if (err instanceof MediaValidationError) redirect(`/admin/team/${id}?error=${encodeURIComponent(err.message)}`);
    throw err;
  }
  revalidatePath("/");
  revalidatePath("/admin/team");
  redirect(`/admin/team?success=${encodeURIComponent("Team member updated.")}`);
}

export async function deleteTeamMemberAction(formData: FormData) {
  await requireAdminOrThrow();
  await deleteTeamMember(String(formData.get("id")));
  revalidatePath("/");
  revalidatePath("/admin/team");
  redirect(`/admin/team?success=${encodeURIComponent("Team member deleted.")}`);
}

export async function moveTeamMemberAction(formData: FormData) {
  await requireAdminOrThrow();
  const id = String(formData.get("id"));
  const direction = String(formData.get("direction"));

  const all = await getAllTeamMembersForAdmin();
  const index = all.findIndex((m) => m.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= all.length) return;

  await setTeamMemberOrder(all[index].id, all[swapWith].order);
  await setTeamMemberOrder(all[swapWith].id, all[index].order);

  revalidatePath("/");
  revalidatePath("/admin/team");
}
