"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { menuSchema } from "./schema";

export async function createMenu(formData: FormData) {
  const data = menuSchema.parse({
    title: formData.get("title"),
    code: formData.get("code"),
    type: formData.get("type"),
    price: formData.get("price"),
  });

  const item = await prisma.menuItem.create({
    data: {
      title: data.title,
      code: data.code || null,
      type: data.type,
    },
  });

  await prisma.menuItemPrice.create({
    data: {
      menuItemId: item.id,
      price: data.price,
      startDate: new Date(),
    },
  });

  revalidatePath("/menu");
}

export async function deleteMenu(id: number) {
  await prisma.menuItem.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidatePath("/menu");
}
export async function updateMenu(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.menuItem.update({
    where: {
      id,
    },
    data: {
      title: formData.get("title") as string,
      code: (formData.get("code") as string) || null,
      type: formData.get("type") as "GAME" | "CAFE",
    },
  });

  revalidatePath("/menu");
}
export async function addPrice(formData: FormData) {
  const menuItemId = Number(formData.get("menuItemId"));
  const price = Number(formData.get("price"));

  await prisma.$transaction(async (tx) => {
    await tx.menuItemPrice.updateMany({
      where: {
        menuItemId,
        endDate: null,
      },
      data: {
        endDate: new Date(),
      },
    });

    await tx.menuItemPrice.create({
      data: {
        menuItemId,
        price,
        startDate: new Date(),
      },
    });
  });

  revalidatePath(`/menu/${menuItemId}`);
}