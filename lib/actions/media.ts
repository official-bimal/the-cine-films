"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminOrThrow } from "@/lib/auth/guard";
import { deleteMediaAsset, saveUpload, MediaValidationError } from "@/lib/services/media";

export async function uploadMediaAction(formData: FormData) {
  await requireAdminOrThrow();

  const file = formData.get("file");
  const altText = String(formData.get("altText") || "");

  if (!(file instanceof File) || file.size === 0) {
    redirect(`/admin/media?error=${encodeURIComponent("Choose a file to upload.")}`);
  }

  try {
    await saveUpload(file as File, altText);
  } catch (err) {
    if (err instanceof MediaValidationError) {
      redirect(`/admin/media?error=${encodeURIComponent(err.message)}`);
    }
    throw err;
  }

  revalidatePath("/admin/media");
  redirect(`/admin/media?success=${encodeURIComponent("Uploaded.")}`);
}

export async function deleteMediaAction(formData: FormData) {
  await requireAdminOrThrow();
  const id = String(formData.get("id"));
  await deleteMediaAsset(id);
  revalidatePath("/admin/media");
  redirect(`/admin/media?success=${encodeURIComponent("Asset removed from the library.")}`);
}
