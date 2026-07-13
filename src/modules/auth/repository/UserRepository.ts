import { prisma } from "@/lib/prisma";

export class UserRepository {

    async getByUsername(
        username: string,
    ) {

        return prisma.user.findUnique({

            where: {

                username,

            },

        });

    }

    async getById(
        id: number,
    ) {

        return prisma.user.findUnique({

            where: {

                id,

            },

        });

    }

}