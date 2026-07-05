import { prisma } from "../../lib/prisma";
import { MenuItemType } from "@prisma/client";

export const menuRepository = {
  getAll() {
    return prisma.menuItem.findMany({
      where: {
        deletedAt: null,
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
  },

  create(data: {
    code?: string;
    title: string;
    type: MenuItemType;
  }) {
    return prisma.menuItem.create({
      data,
    });
  },
};