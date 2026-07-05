import { dailyReportRepository } from "./repository";

export async function getDailyReport(
  branchId: number,
  date: Date
) {
  return dailyReportRepository.findByDate(
    branchId,
    date
  );
}