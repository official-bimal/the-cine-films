import "server-only";

import { db } from "@/lib/db";
import { safeQuery } from "./safe";
import type { ClientInput } from "@/lib/validations/client";

export async function getActiveClients() {
  return safeQuery(
    () => db.client.findMany({ where: { active: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    [],
    "getActiveClients"
  );
}

export async function getAllClientsForAdmin() {
  return db.client.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
}

export async function getClientById(id: string) {
  return db.client.findUnique({ where: { id } });
}

export async function createClient(data: ClientInput) {
  return db.client.create({ data });
}

export async function updateClient(id: string, data: ClientInput) {
  return db.client.update({ where: { id }, data });
}

export async function deleteClient(id: string) {
  return db.client.delete({ where: { id } });
}

export async function setClientOrder(id: string, order: number) {
  return db.client.update({ where: { id }, data: { order } });
}

export async function reorderClients(orderedIds: string[]) {
  await db.$transaction(orderedIds.map((id, index) => db.client.update({ where: { id }, data: { order: index } })));
}
