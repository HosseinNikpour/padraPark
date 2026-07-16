"use server";

import { ChecklistType } from "@prisma/client";

import { ChecklistService } from "../services/ChecklistService";

const service = new ChecklistService();

export async function getChecklist(

    type: ChecklistType

) {

    return service.getQuestions(type);

}