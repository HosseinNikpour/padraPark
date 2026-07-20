import { ChecklistType } from "@prisma/client";

import { BaseCrudService } from "@/core/base/BaseCrudService";

import { ChecklistRepository } from "../repository/ChecklistRepository";
import { SaveChecklistDto } from "../domain/dto/SaveChecklistDto";

export class ChecklistService extends BaseCrudService<ChecklistRepository> {

    constructor() {
        super(new ChecklistRepository());
    }

    getQuestions(
        type: ChecklistType,
        groupId: number
    ) {
        return this.repository.getQuestions(
            type,
            groupId
        );
    }

    getGroups() {
        return this.repository.getGroups();
    }

    getTodayCompletedGroups(
        userId: number,
        type: ChecklistType
    ) {
        return this.repository.getTodayCompletedGroups(
            userId,
            type
        );
    }

    save(
        dto: SaveChecklistDto,
        userId: number
    ) {
        return this.repository.saveResponse(
            dto,
            userId
        );
    }

}