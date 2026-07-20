import { ChecklistType } from "@prisma/client";

import { BaseRepository } from "@/core/base/BaseRepository";
import { SaveChecklistDto } from "../domain/dto/SaveChecklistDto";

export class ChecklistRepository extends BaseRepository {

    async getQuestions(
        type: ChecklistType,
        groupId: number
    ) {

        return this.db.checklistQuestion.findMany({

            where: {
                type,
                groupId,
                isActive: true,
            },

            orderBy: {
                sortOrder: "asc",
            },

        });

    }

    async saveResponse(
        dto: SaveChecklistDto,
        userId: number
    ) {

        return this.db.checklistResponse.create({

            data: {

                user: {
                    connect: {
                        id: userId,
                    },
                },

                group: {
                    connect: {
                        id: dto.groupId,
                    },
                },

                type: dto.type,

                description: dto.description,

                attachment: dto.attachment,

                answers: {

                    create: dto.answers.map(a => ({

                        question: {
                            connect: {
                                id: a.questionId,
                            },
                        },

                        checked: a.checked,

                        description: a.description,

                    })),

                },

            },

        });

    }

    async getGroups() {

        return this.db.checklistGroup.findMany({

            where: {
                isActive: true,
            },

            orderBy: {
                sortOrder: "asc",
            },

        });

    }

    async getTodayCompletedGroups(
        userId: number,
        type: ChecklistType
    ) {

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        return this.db.checklistResponse.findMany({

            where: {

                userId,

                type,

                createdAt: {

                    gte: start,

                    lte: end,

                },

            },

            select: {

                groupId: true,

            },

        });

    }

}