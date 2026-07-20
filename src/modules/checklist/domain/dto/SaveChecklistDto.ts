import { ChecklistType } from "@prisma/client";

export interface SaveChecklistDto {

    //userId: number;

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