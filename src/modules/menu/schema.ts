import { z } from "zod";
import { MenuItemType } from "@prisma/client";

export const menuSchema = z.object({
  code: z.string().optional(),
  title: z.string().min(2, "نام آیتم الزامی است"),
  type: z.enum(MenuItemType),
   price: z.coerce.number().min(0),
});

export type MenuSchema = z.infer<typeof menuSchema>;