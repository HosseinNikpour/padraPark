import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export abstract class BaseRepository {

    protected prisma: PrismaClient = prisma;

    protected transaction = this.prisma.$transaction.bind(this.prisma);

    protected now() {

        return new Date();

    }

}