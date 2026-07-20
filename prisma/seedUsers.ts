import { PrismaClient,UserRole } from "@prisma/client";
import { hashPassword } from "../src/modules/auth/lib/password";

const prisma = new PrismaClient();

async function main() {
  // const exists = await prisma.user.findUnique({
  //   where: {
  //     username: "admin",
  //   },
  // });

  // if (exists) return;

  // await prisma.user.create({
  //   data: {
  //     username: "admin",
  //     fullName: "Administrator",
  //     passwordHash: await hashPassword("123456"),
  //     role: "ADMIN",
  //   },
  // });
const exists = await prisma.user.findUnique({
    where: {
      username: "gm1",
    },
  });

  if (exists) return;

  await prisma.user.create({
    data: {
      username: "gm1",
      fullName: "گیم مستر 1",
      passwordHash: await hashPassword("123456"),
      role: UserRole.OPERATOR,

    isActive: true,
    },
  });
  console.log("user Created");
}

main()
  .finally(() => prisma.$disconnect());