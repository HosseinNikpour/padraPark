"use client";

import { useEffect, useState } from "react";

import PersianDatePicker from "@/components/shared/PersianDatePicker";

import { getWeeklySummaryAction   } from "../actions";

import SummaryCards from "./SummaryCards";
import WeeklyPieChart from "./WeeklyPieChart";
import WeeklyBarChart from "./WeeklyBarChart";
import SalesTable from "./SalesTable";

export default function WeeklyReportDashboard() {
  const [date, setDate] = useState(new Date());

  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    load();
  }, [date]);

  async function load() {
    const result = await getWeeklySummaryAction (date);
    setSummary(result);
  }

  if (!summary) return null;

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-xl shadow p-5 space-y-4">

        <PersianDatePicker
          value={date}
          onChange={(d) => d && setDate(d)}
        />

        <div className="text-center">

          <div className="text-xl font-bold">
            گزارش هفتگی
          </div>

          <div className="text-gray-500 mt-2">

            {summary.start.toLocaleDateString("fa-IR")} -

            {" "}

            {summary.end.toLocaleDateString("fa-IR")}

          </div>

        </div>

      </div>

      <SummaryCards summary={summary} />

      <div className="grid lg:grid-cols-2 gap-6">

        <WeeklyPieChart
          data={summary.pieChart}
        />

        <WeeklyBarChart
          data={summary.dailyChart}
        />

      </div>

     

    </div>
  );
}