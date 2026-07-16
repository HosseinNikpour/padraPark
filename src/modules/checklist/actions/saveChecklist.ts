"use server";

import { ChecklistType } from "@prisma/client";
import { auth } from "@/modules/auth/lib/auth";
import { ChecklistService } from "../services/ChecklistService";

const service = new ChecklistService();

interface SaveChecklistDto {

    groupId: number;

    type: ChecklistType;

    description?: string;

    attachment?: string;

    answers: {

        questionId: number;

        checked: boolean;

        description?: string;

    }[];

}

export async function saveChecklist(
    dto: SaveChecklistDto
) {

    const session = await auth();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    return service.save(
        dto,
        Number((session.user as any).id)
    );

}