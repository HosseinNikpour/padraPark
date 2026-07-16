"use server";

import { prisma } from "@/lib/prisma";

export async function getChecklistGroups() {

    return prisma.checklistGroup.findMany({

        where: {
            isActive: true,
        },

        orderBy: {
            sortOrder: "asc",
        },

    });

}