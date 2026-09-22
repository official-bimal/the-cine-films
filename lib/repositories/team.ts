import "server-only";

import { db } from "@/lib/db";
import { safeQuery } from "./safe";
import type { TeamMemberInput } from "@/lib/validations/team";

export async function getActiveTeamMembers() {
  return safeQuery(
    () => db.teamMember.findMany({ where: { active: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    [],
    "getActiveTeamMembers"
  );
}

export async function getAllTeamMembersForAdmin() {
  return db.teamMember.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
}

export async function getTeamMemberById(id: string) {
  return db.teamMember.findUnique({ where: { id } });
}

export async function createTeamMember(data: TeamMemberInput) {
  return db.teamMember.create({ data });
}

export async function updateTeamMember(id: string, data: TeamMemberInput) {
  return db.teamMember.update({ where: { id }, data });
}

export async function deleteTeamMember(id: string) {
  return db.teamMember.delete({ where: { id } });
}

export async function setTeamMemberOrder(id: string, order: number) {
  return db.teamMember.update({ where: { id }, data: { order } });
}

export async function reorderTeamMembers(orderedIds: string[]) {
  await db.$transaction(
    orderedIds.map((id, index) => db.teamMember.update({ where: { id }, data: { order: index } }))
  );
}
