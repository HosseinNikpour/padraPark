"use server";

import {
  getDailySummaryService,
  getWeeklySummaryService,
} from "./service";

export async function getDailySummary(date: Date) {
  return getDailySummaryService(date);
}

export async function getWeeklySummaryAction(date: Date) {
  return getWeeklySummaryService(date);
}