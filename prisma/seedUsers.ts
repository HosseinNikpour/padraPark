import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/modules/auth/lib/password";

const prisma = new PrismaClient();

async function main() {
  const exists = await prisma.user.findUnique({
    where: {
      username: "admin",
    },
  });

  if (exists) return;

  await prisma.user.create({
    data: {
      username: "admin",
      fullName: "Administrator",
      passwordHash: await hashPassword("123456"),
      role: "ADMIN",
    },
  });

  console.log("Admin Created");
}

main()
  .finally(() => prisma.$disconnect());