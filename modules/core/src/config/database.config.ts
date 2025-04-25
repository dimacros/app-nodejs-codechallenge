import { Prisma } from "@prisma/client";
import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  datasourceUrl: "postgresql://postgres:postgres@localhost:5432/yapedb?schema=public",
  log: ['query', 'info', 'warn', 'error'],
}) satisfies Prisma.PrismaClientOptions)