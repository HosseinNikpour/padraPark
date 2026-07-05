import { prisma } from "@/lib/prisma";

export const dailyReportRepository = {
  findByDate(branchId: number, date: Date) {
    return prisma.dailyReport.findUnique({
      where: {
        branchId_date: {
          branchId,
          date,
        },
      },
      include: {
        sales: {
          include: {
            menuItem: true,
          },
        },
        issues: true,
        incidents: true,
        events: true,
      },
    });
  },

  create(branchId: number, date: Date) {
    return prisma.dailyReport.create({
      data: {
        branchId,
        date,
      },
    });
  },
};