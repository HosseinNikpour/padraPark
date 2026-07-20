import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export abstract class BaseCrudRepository<
    TDelegate extends {
        findUnique: Function;
        findMany: Function;
        create: Function;
        update: Function;
        delete: Function;
    }
>{

    protected prisma: PrismaClient = prisma;

    constructor(

        protected readonly model: TDelegate

    ) {

    }

    findById(id: number) {

        return this.model.findUnique({

            where: {

                id,

            },

        });

    }

    findAll() {

        return this.model.findMany();

    }

    create(data: any) {

        return this.model.create({

            data,

        });

    }

    update(id: number, data: any) {

        return this.model.update({

            where: {

                id,

            },

            data,

        });

    }

    delete(id: number) {

        return this.model.delete({

            where: {

                id,

            },

        });

    }

}