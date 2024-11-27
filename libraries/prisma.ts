// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '@prisma/client';
import { isProduction } from '@/utilities/helpers/environment';

// const connectionString = process.env.NEXT_DATABASE_URL;

// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ['info', 'warn', 'error'] });

if (!isProduction()) globalForPrisma.prisma = prisma;

export default prisma;
