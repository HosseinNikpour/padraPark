"use server";

import { currentUser } from "@/core/auth/currentUser";
import { ChecklistService } from "../services/ChecklistService";
import { SaveChecklistDto } from "../domain/dto/SaveChecklistDto";

import { can } from "@/core/permission/can";
import { Permission } from "@/core/permission/Permissions";

const service = new ChecklistService();

export async function saveChecklist(
    dto: SaveChecklistDto
) {

    const user = await currentUser();
    await can(Permission.ChecklistCreate);
    return service.save(
        dto,
        user.id
    );

}