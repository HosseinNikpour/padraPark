import { averageBy, maxBy } from "@/shared/utils/array";
import { percentDiff } from "@/shared/utils/math";

type Sale = {
    menuItemId: number;
    totalPrice: number;
    menuItem: {
        type: string;
    };
};

type Report = {
    date: Date;
    sales: Sale[];
};

type PerformanceMode = "day" | "week";

export function createPerformanceCalculator(
    reports: Report[],
    selectedDate: Date,
    mode: PerformanceMode = "day"
) {

    let comparableReports: Report[] = [];

    if (mode === "day") {

        const isHoliday =
            selectedDate.getDay() === 4 ||
            selectedDate.getDay() === 5;

        comparableReports = reports.filter(report => {

            if (report.date >= selectedDate)
                return false;

            const holiday =
                report.date.getDay() === 4 ||
                report.date.getDay() === 5;

            return holiday === isHoliday;

        });

    }
    else {

        comparableReports = reports.filter(
            report => report.date < selectedDate
        );

    }

    return (
        menuId: number,
        currentAmount: number
    ) => {

        const previousAmounts = comparableReports
            .map(report =>
                report.sales
                    .filter(sale =>
                        // sale.menuItem.type === "GAME" &&
                        sale.menuItemId === menuId
                    )
                    .reduce(
                        (sum, sale) => sum + sale.totalPrice,
                        0
                    )
            )
            .filter(x => x > 0);

        const average = averageBy(
            previousAmounts,
            x => x
        );

        const best = Math.max(
            currentAmount,

            maxBy(
                previousAmounts,
                x => x
            )
        );

        return {

            average,

            best,

            diff: percentDiff(
                currentAmount,
                average
            ),

        };

    };

}