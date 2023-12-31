import { PrismaClient } from "@prisma/client";

declare const globalThis: {
  prisma?: PrismaClient;
};

const client: PrismaClient = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'production') globalThis.prisma = client;

export default client;
