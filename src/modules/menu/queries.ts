import { prisma } from "@/lib/prisma";

export async function getMenuItems(search?: string) {
  return prisma.menuItem.findMany({
    where: {
      deletedAt: null,

      ...(search && {
        title: {
          contains: search,
        },
      }),
    },

    include: {
      prices: {
        orderBy: {
          startDate: "desc",
        },
        take: 1,
      },
    },

    orderBy: {
      title: "asc",
    },
  });
}