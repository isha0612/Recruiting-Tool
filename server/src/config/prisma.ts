import { PrismaClient } from "@prisma/client";

const extendedPrismaClient = new PrismaClient();

declare global {
  var prisma: typeof extendedPrismaClient | undefined;
}

export const prisma = global.prisma != null ? global.prisma : extendedPrismaClient;
global.prisma = prisma;

async function connectDB(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

export default connectDB;