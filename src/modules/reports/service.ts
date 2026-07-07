import {
  getSummaryByDay,
  getSummaryByWeek,
} from "./repository";

export async function getDailySummaryService(date: Date) {
  return getSummaryByDay(date);
}

export async function getWeeklySummaryService(date: Date) {
  return getSummaryByWeek(date);
}