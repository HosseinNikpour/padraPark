import { prisma } from "../../lib/prisma";
import { menuRepository } from "./repository";
import { MenuItemType } from "@prisma/client";

export const menuService = {
  async getAll() {
    return menuRepository.getAll();
  },

  async create(data: {
    code?: string;
    title: string;
    type: MenuItemType;
  }) {
    const item = await menuRepository.create(data);

    await prisma.menuItemPrice.create({
      data: {
        menuItemId: item.id,
        price: 0,
        startDate: new Date(),
      },
    });

    return item;
  },
};