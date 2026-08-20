import { prisma } from "@/lib/prisma";
import { groupBy, sumBy } from "@/shared/utils/array";
import { getWeekRange } from "@/shared/utils/date";
import { WeeklySummary } from "../types";
import { createPerformanceCalculator } from "@/shared/reports/performance";

export async function getSummaryByWeek(date: Date): Promise<WeeklySummary> {
    const { start, end } = getWeekRange(date);

    const reports = await prisma.dailyReport.findMany({
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
        orderBy: {
            date: "asc",
        },
    });
const previousReports = await prisma.dailyReport.findMany({

    where: {

        date: {

            lt: start,

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
const performance =
    createPerformanceCalculator(
        previousReports,
        start,"week"
    );

    const sales = reports.flatMap((r) => r.sales);

    const gameSales = sales.filter(
        (x) => x.menuItem.type === "GAME"
    );

    const cafeSales = sales.filter(
        (x) => x.menuItem.type === "CAFE"
    );
    const packageSales = sales.filter(
        x => x.menuItem.type === "PAKE"
    );

    const eventSales = sales.filter(
        x => x.menuItem.type === "EVNT"
    );

    const downstairsTickets = sumBy(gameSales, (x) => x.qty);
    const downstairsAmount = sumBy(gameSales, (x) => x.totalPrice);

    const cafeTickets = sumBy(cafeSales, (x) => x.qty);
    const cafeAmount = sumBy(cafeSales, (x) => x.totalPrice);

    const packageTickets = sumBy(packageSales, x => x.qty);
    const packageAmount = sumBy(packageSales, x => x.totalPrice);

    const eventTickets = sumBy(eventSales, x => x.qty);
    const eventAmount = sumBy(eventSales, x => x.totalPrice);
    // ---------------- Pie Chart ----------------

    const groupedGames = groupBy(
        gameSales,
        (x) => x.menuItem.title
    );
    groupedGames["پکیج"] = packageSales;
    
    const pieChart = Object.entries(groupedGames).map(
        ([name, items]) => ({
            name,
            amount: sumBy(items, (x) => x.totalPrice),
        })
    );

    // ---------------- Weekly Bar ----------------

    const dailyChart = [
        { day: "شنبه", amount: 0 },
        { day: "یکشنبه", amount: 0 },
        { day: "دوشنبه", amount: 0 },
        { day: "سه شنبه", amount: 0 },
        { day: "چهارشنبه", amount: 0 },
        { day: "پنجشنبه", amount: 0 },
        { day: "جمعه", amount: 0 },
    ];

    const dayMap: Record<number, number> = {
        6: 0,
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
    };

    reports.forEach((report) => {
        const index = dayMap[report.date.getDay()];

        dailyChart[index].amount += sumBy(
            report.sales,
            (x) => x.totalPrice
        );
    });

    // ---------------- Details ----------------

    const groupedDetails = groupBy(
        gameSales,
        (x) => x.menuItem.title
    );

    const details = Object.entries(groupedDetails).map(
        ([name, items]) => ({
            name,
            qty: sumBy(items, (x) => x.qty),
            amount: sumBy(items, (x) => x.totalPrice),
            average: 0,
            best: 0,
            diff: 0
        })
    );

    details.push({
        name: "پکیج",
        qty: packageTickets,
        amount: packageAmount,
        average: 0,
        best: 0,
        diff: 0
    });
 details.push({
        name: "ایونت ها",
        qty: eventTickets,
        amount: eventAmount,
        average: 0,
        best: 0,
        diff: 0
    });
     details.push({
        name: "کافه",
        qty: cafeTickets,
        amount: cafeAmount,
        average: 0,
        best: 0,
        diff: 0
    });
    return {
        start,
        end,

        downstairs: {
            tickets: downstairsTickets+packageTickets,
            sales: downstairsAmount+packageAmount,
        },

        upstairs: {
            tickets: eventTickets,
            sales: eventAmount,
        },

        cafe: {
            tickets: cafeTickets,
            sales: cafeAmount,
        },

        total: {
            tickets: downstairsTickets + cafeTickets+packageTickets+eventTickets,
            sales: downstairsAmount + cafeAmount+packageAmount+eventAmount,
        },

        pieChart,

        dailyChart,

        details,
    };
}

