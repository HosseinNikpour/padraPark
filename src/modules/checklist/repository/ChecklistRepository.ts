import { prisma } from "@/lib/prisma";
import { ChecklistType } from "@prisma/client";

export class ChecklistRepository {
    async getQuestions(
        type: ChecklistType,
        groupId: number
    ) {

        return prisma.checklistQuestion.findMany({

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

    async saveResponse(data: {
        userId: number;
        groupId: number;
        type: ChecklistType;
        description?: string;
        attachment?: string;
        answers: {
            questionId: number;
            checked: boolean;
            description?: string;
        }[];
    }) {
        return prisma.checklistResponse.create({
            data: {
                user: {
                    connect: {
                        id: data.userId,
                    },
                },

                group: {
                    connect: {
                        id: data.groupId,
                    },
                },

                type: data.type,

                description: data.description,

                attachment: data.attachment,

                answers: {
                    create: data.answers.map((a) => ({
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

    return prisma.checklistGroup.findMany({

        where:{
            isActive:true
        },

        orderBy:{
            sortOrder:"asc"
        }

    });

}

async getTodayCompletedGroups(
    userId:number,
    type:ChecklistType
){

    const start=new Date();
    start.setHours(0,0,0,0);

    const end=new Date();
    end.setHours(23,59,59,999);

    return prisma.checklistResponse.findMany({

        where:{

            userId,

            type,

            createdAt:{
                gte:start,
                lte:end
            }

        },

        select:{
            groupId:true
        }

    });

}
}