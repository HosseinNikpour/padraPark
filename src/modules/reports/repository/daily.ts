import { prisma } from "@/lib/prisma";
import { sumBy } from "@/shared/utils/array";
import { createPerformanceCalculator } from "@/shared/reports/performance";
import { DailySummary } from "../types";

export async function getSummaryByDay(date: Date): Promise<DailySummary> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const report = await prisma.dailyReport.findFirst({
        where: {
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
            },
        },
    });

    if (!report) {
        return {
            downstairs: {
                tickets: 0,
                sales: 0,
            },

            upstairs: {
                tickets: 0,
                sales: 0,
            },

            cafe: {
                tickets: 0,
                sales: 0,
            },

            total: {
                tickets: 0,
                sales: 0,
            },

            chart: [],

            details: [],
        };
    }

    const previousReports = await prisma.dailyReport.findMany({
        where: {
            id: {
                not: report.id,
            },
        },
        include: {
            sales: {
                include: {
                    menuItem: true,
                },
            },
        },
    });
    const performance =        createPerformanceCalculator(
            previousReports,
            start,
             "day"
        );

    const gameItems = report.sales.filter(
        (x) => x.menuItem.type === "GAME"
    );

    const cafeItems = report.sales.filter(
        (x) => x.menuItem.type === "CAFE"
    );
    const packageItems = report.sales.filter(
        x => x.menuItem.type === "PAKE"
    );

    const eventItems = report.sales.filter(
        x => x.menuItem.type === "EVNT"
    );
    const gameTickets = sumBy(gameItems, x => x.qty);

    const gameSales = sumBy(gameItems, x => x.totalPrice);
    const packageTickets = sumBy(packageItems, x => x.qty);
    const cafeTickets = sumBy(cafeItems, x => x.qty);
    const eventTickets = sumBy(eventItems, x => x.qty);

    const eventSales = sumBy(eventItems, x => x.totalPrice);
    const cafeSales = sumBy(cafeItems, x => x.totalPrice);
    const packageSales = sumBy(packageItems, x => x.totalPrice);
    const gameMenus = await prisma.menuItem.findMany({
        where: {
            type: "GAME",
            isActive: true,
        },
        orderBy: {
            title: "asc",
        },
    });
    const chart = gameMenus.map((menu) => {
        const sales = gameItems.filter(
            (x) => x.menuItemId === menu.id
        );

        return {
            name: menu.title,
            amount: sumBy(sales, (x) => x.totalPrice),
        };
    });

    // chart.push({
    //     name: "کافه",
    //     amount: cafeSales,
    // });

    chart.push({
        name: "پکیج",
        amount: packageSales,
    });

    const details = gameMenus.map((menu) => {

        const current = gameItems.filter(
            x => x.menuItemId === menu.id
        );

        const qty = sumBy(
            current,
            x => x.qty
        );

        const amount = sumBy(
            current,
            x => x.totalPrice
        );

        const stats = performance(
            menu.id,
            amount
        );

        return {

            name: menu.title,

            qty,

            amount,

            ...stats,

        };

    });


    details.push({

        name: "پکیج",

        qty: packageTickets,

        amount: packageSales,

        average: 0,

        best: packageSales,

        diff: 0,

    });
    // details.push({
    //     name: "کافه",
    //     qty: cafeTickets,
    //     amount: cafeSales,
    //     average: 0,
    //     best: cafeSales,
    //     diff: 0,
    // });

    return {
        downstairs: {
            tickets: gameTickets+packageTickets,
            sales: gameSales+packageSales,
        },

        upstairs: {
            tickets: eventTickets,
            sales: eventSales,
        },

        cafe: {
            tickets: cafeTickets,
            sales: cafeSales,
        },

        total: {
            tickets: gameTickets + cafeTickets+packageTickets+eventTickets,
            sales: gameSales + cafeSales+packageSales+eventSales,
        },

        chart,

        details,
    };
}