"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ExcelSummary } from "./types";

interface SaveRow {
  code: string;
  title: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export async function saveDailyReport(data: {
  branchId: number;
  date: string;
  rows: SaveRow[];
  summary: ExcelSummary | null;
}) {
  await prisma.$transaction(async (tx) => {
    const report = await tx.dailyReport.upsert({
      where: {
        branchId_date: {
          branchId: data.branchId,
          date: new Date(data.date),
        },
      },

      update: {
        totalSales: data.summary?.totalSales ?? 0,
        totalDiscount: data.summary?.totalDiscount ?? 0,
        cashAmount: data.summary?.cashAmount ?? 0,
        invoiceCount: data.summary?.invoiceCount ?? 0,
      },

      create: {
        branchId: data.branchId,
        date: new Date(data.date),

        totalSales: data.summary?.totalSales ?? 0,
        totalDiscount: data.summary?.totalDiscount ?? 0,
        cashAmount: data.summary?.cashAmount ?? 0,
        invoiceCount: data.summary?.invoiceCount ?? 0,
      },
    });

    await tx.dailySaleItem.deleteMany({
      where: {
        reportId: report.id,
      },
    });

    for (const row of data.rows) {
      if (row.qty <= 0) continue;

      let menuItem = await tx.menuItem.findUnique({
        where: {
          code: row.code,
        },
      });

      if (!menuItem) {
        menuItem = await tx.menuItem.create({
          data: {
            code: row.code,
            title: row.title,
            type: "CAFE",
            isActive: true,
          },
        });
      } else {
        // اگر اسم کالا عوض شده باشد
        if (menuItem.title !== row.title) {
          menuItem = await tx.menuItem.update({
            where: {
              id: menuItem.id,
            },
            data: {
              title: row.title,
            },
          });
        }
      }

      await tx.dailySaleItem.create({
        data: {
          reportId: report.id,
          menuItemId: menuItem.id,
          qty: row.qty,
          unitPrice: row.unitPrice,
          discount: 0,
          totalPrice: row.totalPrice,
        },
      });
    }
  });

  revalidatePath("/daily-report");
}

export async function getDailySales(
    branchId: number,
    date: string
) {
    const selectedDate = new Date(date);

    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    const report = await prisma.dailyReport.findFirst({
        where: {
            branchId,
            date: {
                gte: start,
                lte: end,
            },
        },
        include: {
            sales: {
                include: {
                    menuItem: true,
                },
                orderBy: {
                    id: "asc",
                },
            },
        },
    });

    if (!report) {
        return {
            found: false,
            report: null,
            sales: [],
        };
    }

    return {
        found: true,

        report: {
            id: report.id,
            date: report.date,
            totalSales: report.totalSales,
            totalDiscount: report.totalDiscount,
            cashAmount: report.cashAmount,
            invoiceCount: report.invoiceCount,
        },

        sales: report.sales.map((sale) => ({
            id: sale.id,
            title: sale.menuItem.title,
            code: sale.menuItem.code,
            type: sale.menuItem.type,
            qty: sale.qty,
            unitPrice: sale.unitPrice,
            discount: sale.discount,
            totalPrice: sale.totalPrice,
        })),
    };
}