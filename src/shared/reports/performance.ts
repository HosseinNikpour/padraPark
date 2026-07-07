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

export function createPerformanceCalculator(
  reports: Report[],
  selectedDate: Date
) {
  const isHoliday =
    selectedDate.getDay() === 4 ||
    selectedDate.getDay() === 5;

  // فقط گزارش‌های قبل از تاریخ انتخاب شده
  const previousReports = reports.filter(
    (report) => report.date < selectedDate
  );

  // فقط روزهای مشابه (عادی / تعطیل)
  const comparableReports = previousReports.filter((report) => {
    const holiday =
      report.date.getDay() === 4 ||
      report.date.getDay() === 5;

    return holiday === isHoliday;
  });

  return (
    menuId: number,
    currentAmount: number
  ) => {
    //-----------------------------
    // Average
    //-----------------------------

    const previousAmounts = comparableReports
      .map((report) =>
        report.sales
          .filter(
            (sale) =>
              sale.menuItem.type === "GAME" &&
              sale.menuItemId === menuId
          )
          .reduce(
            (sum, sale) => sum + sale.totalPrice,
            0
          )
      )
      // روزهایی که فروش نداشته حذف شوند
      .filter((x) => x > 0);

    const average = averageBy(
      previousAmounts,
      (x) => x
    );

    //-----------------------------
    // Best
    //-----------------------------

    const best = Math.max(
      currentAmount,

      maxBy(
        previousReports.map((report) =>
          report.sales
            .filter(
              (sale) =>
                sale.menuItem.type === "GAME" &&
                sale.menuItemId === menuId
            )
            .reduce(
              (sum, sale) =>
                sum + sale.totalPrice,
              0
            )
        ),
        (x) => x
      )
    );

    //-----------------------------

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