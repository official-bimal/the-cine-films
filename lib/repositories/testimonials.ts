import "server-only";

import { db } from "@/lib/db";
import { safeQuery } from "./safe";
import type { TestimonialInput } from "@/lib/validations/testimonial";

export async function getPublishedTestimonials() {
  return safeQuery(
    () =>
      db.testimonial.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      }),
    [],
    "getPublishedTestimonials"
  );
}

export async function getAllTestimonialsForAdmin() {
  return db.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
}

export async function getTestimonialById(id: string) {
  return db.testimonial.findUnique({ where: { id } });
}

export async function createTestimonial(data: TestimonialInput) {
  return db.testimonial.create({ data });
}

export async function updateTestimonial(id: string, data: TestimonialInput) {
  return db.testimonial.update({ where: { id }, data });
}

export async function deleteTestimonial(id: string) {
  return db.testimonial.delete({ where: { id } });
}

export async function setTestimonialOrder(id: string, order: number) {
  return db.testimonial.update({ where: { id }, data: { order } });
}

export async function reorderTestimonials(orderedIds: string[]) {
  await db.$transaction(
    orderedIds.map((id, index) => db.testimonial.update({ where: { id }, data: { order: index } }))
  );
}
