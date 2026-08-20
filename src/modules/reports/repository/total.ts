import { prisma } from "@/lib/prisma";
import { groupBy, sumBy } from "@/shared/utils/array";

type WeeklySalesReportItem = {
    name: string;
    qty: number;
    amount: number;
};

type WeeklySalesReport = {
    year: number;
    weekNo: number;

    from: string;
    to: string;

    games: WeeklySalesReportItem[];

    package: {
        qty: number;
        amount: number;
    };

    events: {
        qty: number;
        amount: number;
    };

    cafe: {
        qty: number;
        amount: number;
    };

    total: {
        qty: number;
        amount: number;
    };
};

/* =========================================================
   Jalali Date
========================================================= */

function toJalali(date: Date) {

    const formatter =
        new Intl.DateTimeFormat(
            "en-US-u-ca-persian",
            {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }
        );

    const parts =
        formatter.formatToParts(date);

    const year =
        Number(
            parts.find(
                x => x.type === "year"
            )?.value
        );

    const month =
        Number(
            parts.find(
                x => x.type === "month"
            )?.value
        );

    const day =
        Number(
            parts.find(
                x => x.type === "day"
            )?.value
        );

    return {
        year,
        month,
        day,
    };
}

/* =========================================================
   Saturday of Persian Week
========================================================= */

function getSaturday(date: Date) {

    const result =
        new Date(date);

    result.setHours(
        0,
        0,
        0,
        0
    );

    const day =
        result.getDay();

    /*
        Sunday    = 0
        Monday    = 1
        Tuesday   = 2
        Wednesday = 3
        Thursday  = 4
        Friday    = 5
        Saturday  = 6
    */

    const diff =
        day === 6
            ? 0
            : day + 1;

    result.setDate(
        result.getDate() - diff
    );

    return result;
}

/* =========================================================
   Persian Week Info
========================================================= */

function getPersianWeekInfo(
    saturday: Date
) {

    const jalali =
        toJalali(saturday);

    /*
       پیدا کردن اولین روز سال شمسی
    */

    const firstDayOfYear =
        new Date(saturday);

    firstDayOfYear.setHours(
        0,
        0,
        0,
        0
    );

    while (true) {

        const previous =
            new Date(
                firstDayOfYear
            );

        previous.setDate(
            previous.getDate() - 1
        );

        const previousJalali =
            toJalali(previous);

        if (
            previousJalali.year !==
            jalali.year
        ) {
            break;
        }

        firstDayOfYear.setDate(
            firstDayOfYear.getDate() - 1
        );
    }

    /*
       اولین شنبه سال
    */

    const firstSaturday =
        getSaturday(
            firstDayOfYear
        );

    const diff =
        saturday.getTime() -
        firstSaturday.getTime();

    const weekNo =
        Math.floor(
            diff /
            (
                7 *
                24 *
                60 *
                60 *
                1000
            )
        ) + 1;

    return {
        year: jalali.year,
        weekNo,
    };
}

/* =========================================================
   Format Jalali Date
========================================================= */

function formatJalali(
    date: Date
) {

    const value =
        toJalali(date);

    return `${value.year}/${String(
        value.month
    ).padStart(2, "0")}/${String(
        value.day
    ).padStart(2, "0")}`;
}

/* =========================================================
   Weekly Sales Report
========================================================= */

export async function getWeeklySalesReport(
    fromDate?: Date,
    toDate?: Date
): Promise<WeeklySalesReport[]> {

    /*
       اگر تاریخ شروع داده شده،
       هفته را از شنبه همان هفته شروع می‌کنیم.
    */

    const startDate =
        fromDate
            ? getSaturday(fromDate)
            : getSaturday(
                new Date(
                    Date.now() -
                    365 *
                    24 *
                    60 *
                    60 *
                    1000
                )
            );

    /*
       تاریخ پایان
    */

    const endDate =
        toDate
            ? (() => {

                const date =
                    new Date(toDate);

                date.setHours(
                    23,
                    59,
                    59,
                    999
                );

                return date;

            })()
            : new Date();

    /*
       دریافت گزارش‌های روزانه
    */

    const reports =
        await prisma.dailyReport.findMany({

            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
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

    /*
       گروه‌بندی گزارش‌ها بر اساس شنبه هر هفته
    */

    const grouped =
        groupBy(
            reports,
            report => {

                const saturday =
                    getSaturday(
                        report.date
                    );

                return saturday
                    .toISOString()
                    .slice(0, 10);
            }
        );

    const result:
        WeeklySalesReport[] = [];

    /*
       پردازش هر هفته
    */

    for (
        const [key, weeklyReports]
        of Object.entries(grouped)
    ) {

        const saturday =
            new Date(key);

        /*
           جمعه همان هفته
        */

        const friday =
            new Date(
                saturday
            );

        friday.setDate(
            friday.getDate() + 6
        );

        friday.setHours(
            23,
            59,
            59,
            999
        );

        /*
           اطلاعات هفته شمسی
        */

        const {
            year,
            weekNo,
        } =
            getPersianWeekInfo(
                saturday
            );

        /*
           تمام فروش‌های هفته
        */

        const sales =
            weeklyReports.flatMap(
                report =>
                    report.sales
            );

        /* =====================================================
           GAME
        ===================================================== */

        const gameSales =
            sales.filter(
                sale =>
                    sale.menuItem.type ===
                    "GAME"
            );

        /* =====================================================
           PAKE
        ===================================================== */

        const packageSales =
            sales.filter(
                sale =>
                    sale.menuItem.type ===
                    "PAKE"
            );

        /* =====================================================
           EVNT
        ===================================================== */

        const eventSales =
            sales.filter(
                sale =>
                    sale.menuItem.type ===
                    "EVNT"
            );

        /* =====================================================
           CAFE
        ===================================================== */

        const cafeSales =
            sales.filter(
                sale =>
                    sale.menuItem.type ===
                    "CAFE"
            );

        /* =====================================================
           Games - Group By MenuItem
        ===================================================== */

        const gameGroups =
            groupBy(
                gameSales,
                sale =>
                    sale.menuItemId
            );

        const games:
            WeeklySalesReportItem[] =
            Object.values(
                gameGroups
            ).map(
                items => {

                    const first =
                        items[0];

                    return {

                        name:
                            first.menuItem.title,

                        qty:
                            sumBy(
                                items,
                                item =>
                                    item.qty
                            ),

                        amount:
                            sumBy(
                                items,
                                item =>
                                    item.totalPrice
                            ),
                    };
                }
            );

        /* =====================================================
           Package
        ===================================================== */

        const packageQty =
            sumBy(
                packageSales,
                item =>
                    item.qty
            );

        const packageAmount =
            sumBy(
                packageSales,
                item =>
                    item.totalPrice
            );

        /* =====================================================
           Events
        ===================================================== */

        const eventQty =
            sumBy(
                eventSales,
                item =>
                    item.qty
            );

        const eventAmount =
            sumBy(
                eventSales,
                item =>
                    item.totalPrice
            );

        /* =====================================================
           Cafe
        ===================================================== */

        const cafeQty =
            sumBy(
                cafeSales,
                item =>
                    item.qty
            );

        const cafeAmount =
            sumBy(
                cafeSales,
                item =>
                    item.totalPrice
            );

        /* =====================================================
           Games Total
        ===================================================== */

        const gameQty =
            sumBy(
                games,
                item =>
                    item.qty
            );

        const gameAmount =
            sumBy(
                games,
                item =>
                    item.amount
            );

        /* =====================================================
           Final Total
        ===================================================== */

        const totalQty =
            gameQty +
            packageQty +
            eventQty +
            cafeQty;

        const totalAmount =
            gameAmount +
            packageAmount +
            eventAmount +
            cafeAmount;

        /* =====================================================
           Result
        ===================================================== */

        result.push({

            year,

            weekNo,

            from:
                formatJalali(
                    saturday
                ),

            to:
                formatJalali(
                    friday
                ),

            games,

            package: {

                qty:
                    packageQty,

                amount:
                    packageAmount,
            },

            events: {

                qty:
                    eventQty,

                amount:
                    eventAmount,
            },

            cafe: {

                qty:
                    cafeQty,

                amount:
                    cafeAmount,
            },

            total: {

                qty:
                    totalQty,

                amount:
                    totalAmount,
            },
        });
    }

    return result;
}