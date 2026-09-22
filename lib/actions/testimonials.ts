"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminOrThrow } from "@/lib/auth/guard";
import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonialsForAdmin,
  setTestimonialOrder,
  updateTestimonial,
} from "@/lib/repositories/testimonials";
import { testimonialSchema } from "@/lib/validations/testimonial";
import { resolveMediaUrl } from "@/lib/actions/shared";
import { MediaValidationError } from "@/lib/services/media";

async function buildInput(formData: FormData) {
  const photoUrl = await resolveMediaUrl(formData, "photo");
  return {
    quote: formData.get("quote"),
    name: formData.get("name"),
    role: formData.get("role"),
    company: formData.get("company"),
    rating: formData.get("rating") || 5,
    photoUrl,
    order: formData.get("order") || 0,
    status: formData.get("status"),
  };
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdminOrThrow();
  try {
    const parsed = testimonialSchema.safeParse(await buildInput(formData));
    if (!parsed.success) {
      redirect(`/admin/testimonials/new?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
    }
    await createTestimonial(parsed.data);
  } catch (err) {
    if (err instanceof MediaValidationError) redirect(`/admin/testimonials/new?error=${encodeURIComponent(err.message)}`);
    throw err;
  }
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect(`/admin/testimonials?success=${encodeURIComponent("Testimonial added.")}`);
}

export async function updateTestimonialAction(id: string, formData: FormData) {
  await requireAdminOrThrow();
  try {
    const parsed = testimonialSchema.safeParse(await buildInput(formData));
    if (!parsed.success) {
      redirect(`/admin/testimonials/${id}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid input.")}`);
    }
    await updateTestimonial(id, parsed.data);
  } catch (err) {
    if (err instanceof MediaValidationError) redirect(`/admin/testimonials/${id}?error=${encodeURIComponent(err.message)}`);
    throw err;
  }
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect(`/admin/testimonials?success=${encodeURIComponent("Testimonial updated.")}`);
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdminOrThrow();
  await deleteTestimonial(String(formData.get("id")));
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect(`/admin/testimonials?success=${encodeURIComponent("Testimonial deleted.")}`);
}

export async function moveTestimonialAction(formData: FormData) {
  await requireAdminOrThrow();
  const id = String(formData.get("id"));
  const direction = String(formData.get("direction"));

  const all = await getAllTestimonialsForAdmin();
  const index = all.findIndex((t) => t.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= all.length) return;

  await setTestimonialOrder(all[index].id, all[swapWith].order);
  await setTestimonialOrder(all[swapWith].id, all[index].order);

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
