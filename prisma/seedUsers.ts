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
      username: "resp1",
    },
  });

  if (exists) return;

  await prisma.user.create({
    data: {
      username: "resp1",
      fullName: "رسپشن 1",
      passwordHash: await hashPassword("123456"),
      role: UserRole.RECEPTION,

    isActive: true,
    },
  });
  console.log("user Created");
}

main()
  .finally(() => prisma.$disconnect());