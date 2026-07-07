"use client";

import { useEffect, useState } from "react";
import HighchartsPie from "@/shared/charts/HighchartsPie";
import HighchartsBar from "@/shared/charts/HighchartsBar";
import PersianDatePicker from "@/shared/forms/PersianDatePicker";
import type { WeeklySummary } from "../../types";
import { getWeeklySummaryAction   } from "../../actions";

import SummaryCards from "../cards/SummaryCards";


export default function WeeklyReportDashboard() {
  const [date, setDate] = useState(new Date());

const [summary, setSummary] = useState<WeeklySummary | null>(null);

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

        <HighchartsPie    title="سهم فروش دستگاه‌ها"    data={summary.pieChart}/>

       <HighchartsBar    title="فروش روزهای هفته"    categories={summary.dailyChart.map(x=>x.day)}    data={summary.dailyChart.map(x=>x.amount)}
/>

      </div>

     

    </div>
  );
}