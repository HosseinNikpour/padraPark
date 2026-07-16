import { ChecklistType } from "@prisma/client";
import { ChecklistRepository } from "../repository/ChecklistRepository";

export class ChecklistService {

    private repository = new ChecklistRepository();
    getGroups() {

        return this.repository.getGroups();

    }

    getTodayCompletedGroups(userId: number, type: ChecklistType) {

        return this.repository.getTodayCompletedGroups(userId, type);

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

    save(
        dto: {
            groupId: number;
            type: ChecklistType;
            description?: string;
            attachment?: string;
            answers: {
                questionId: number;
                checked: boolean;
                description?: string;
            }[];
        },
        userId: number
    ) {

        return this.repository.saveResponse({

            ...dto,

            userId,

        });

    }

}