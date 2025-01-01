import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Failed to connect to the database , restart again");
    process.exit(1);
  }
}

connectToDatabase();

export default prisma;
