"use server";

import {
  getDailySummaryRepository,
  getWeeklySummary,
} from "./repository";

export async function getDailySummary(date: Date) {
  return getDailySummaryRepository(date);
}

export async function getWeeklySummaryAction(date: Date) {
  return getWeeklySummary(date);
}