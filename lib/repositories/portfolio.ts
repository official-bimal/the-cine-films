import "server-only";

import { db } from "@/lib/db";
import { safeQuery } from "./safe";
import type { PortfolioProjectInput } from "@/lib/validations/portfolio";

// Public rule (Phase 1 audit Section 56): only PUBLISHED rows are ever
// returned from this function — the one the homepage actually calls. Falls
// back to an empty list (not a crash) if the database is unreachable.
export async function getPublishedProjects() {
  return safeQuery(
    () =>
      db.portfolioProject.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      }),
    [],
    "getPublishedProjects"
  );
}

export async function getAllProjectsForAdmin() {
  return db.portfolioProject.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
}

export async function getProjectById(id: string) {
  return db.portfolioProject.findUnique({ where: { id } });
}

export async function isSlugTaken(slug: string, excludeId?: string) {
  const existing = await db.portfolioProject.findUnique({ where: { slug } });
  return Boolean(existing && existing.id !== excludeId);
}

export async function createProject(data: PortfolioProjectInput) {
  return db.portfolioProject.create({ data });
}

export async function updateProject(id: string, data: PortfolioProjectInput) {
  return db.portfolioProject.update({ where: { id }, data });
}

export async function deleteProject(id: string) {
  return db.portfolioProject.delete({ where: { id } });
}

export async function setProjectOrder(id: string, order: number) {
  return db.portfolioProject.update({ where: { id }, data: { order } });
}

export async function reorderProjects(orderedIds: string[]) {
  await db.$transaction(
    orderedIds.map((id, index) => db.portfolioProject.update({ where: { id }, data: { order: index } }))
  );
}
