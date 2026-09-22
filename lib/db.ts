import { PrismaClient } from "@prisma/client";

// Standard Next.js dev-mode singleton: hot reload re-evaluates this module on
// every edit, which would otherwise open a new Postgres connection pool each
// time and exhaust the database's connection limit.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
