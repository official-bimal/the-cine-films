"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminOrThrow } from "@/lib/auth/guard";
import {
  createProject,
  deleteProject,
  getAllProjectsForAdmin,
  getProjectById,
  isSlugTaken,
  setProjectOrder,
  updateProject,
} from "@/lib/repositories/portfolio";
import { portfolioProjectSchema } from "@/lib/validations/portfolio";
import { slugify } from "@/lib/validations/shared";
import { resolveMediaUrl } from "@/lib/actions/shared";
import { MediaValidationError } from "@/lib/services/media";

function buildInput(formData: FormData, thumbnailUrl: string) {
  const rawSlug = String(formData.get("slug") || "");
  return {
    title: formData.get("title"),
    slug: rawSlug.trim() ? slugify(rawSlug) : slugify(String(formData.get("title") || "")),
    category: formData.get("category"),
    client: formData.get("client"),
    year: formData.get("year"),
    description: formData.get("description"),
    thumbnailUrl,
    externalVideoUrl: formData.get("externalVideoUrl"),
    order: formData.get("order") || 0,
    status: formData.get("status"),
  };
}

export async function createProjectAction(formData: FormData) {
  await requireAdminOrThrow();

  try {
    const thumbnailUrl = await resolveMediaUrl(formData, "thumbnail");
    const videoUrl = await resolveMediaUrl(formData, "video");
    const input = { ...buildInput(formData, thumbnailUrl), videoUrl };

    const parsed = portfolioProjectSchema.safeParse(input);
    if (!parsed.success) {
      redirect(`/admin/portfolio/new?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
    }

    if (await isSlugTaken(parsed.data.slug)) {
      redirect(`/admin/portfolio/new?error=${encodeURIComponent("That slug is already in use.")}`);
    }

    await createProject(parsed.data);
  } catch (err) {
    if (err instanceof MediaValidationError) {
      redirect(`/admin/portfolio/new?error=${encodeURIComponent(err.message)}`);
    }
    throw err;
  }

  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  redirect(`/admin/portfolio?success=${encodeURIComponent("Project created.")}`);
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireAdminOrThrow();

  try {
    const thumbnailUrl = await resolveMediaUrl(formData, "thumbnail");
    const videoUrl = await resolveMediaUrl(formData, "video");
    const input = { ...buildInput(formData, thumbnailUrl), videoUrl };

    const parsed = portfolioProjectSchema.safeParse(input);
    if (!parsed.success) {
      redirect(`/admin/portfolio/${id}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
    }

    if (await isSlugTaken(parsed.data.slug, id)) {
      redirect(`/admin/portfolio/${id}?error=${encodeURIComponent("That slug is already in use.")}`);
    }

    await updateProject(id, parsed.data);
  } catch (err) {
    if (err instanceof MediaValidationError) {
      redirect(`/admin/portfolio/${id}?error=${encodeURIComponent(err.message)}`);
    }
    throw err;
  }

  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  redirect(`/admin/portfolio?success=${encodeURIComponent("Project updated.")}`);
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdminOrThrow();
  const id = String(formData.get("id"));
  await deleteProject(id);
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  redirect(`/admin/portfolio?success=${encodeURIComponent("Project deleted.")}`);
}

export async function moveProjectAction(formData: FormData) {
  await requireAdminOrThrow();
  const id = String(formData.get("id"));
  const direction = String(formData.get("direction"));

  const all = await getAllProjectsForAdmin();
  const index = all.findIndex((p) => p.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= all.length) return;

  const a = all[index];
  const b = all[swapWith];
  await setProjectOrder(a.id, b.order);
  await setProjectOrder(b.id, a.order);

  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}

export async function getProjectForEdit(id: string) {
  return getProjectById(id);
}
