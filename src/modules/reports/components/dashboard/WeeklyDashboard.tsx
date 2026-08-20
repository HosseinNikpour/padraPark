"use client";

import { useEffect, useState } from "react";
import ChartCard from "@/shared/dashboard/ChartCard";
import HighchartsPie from "@/shared/charts/HighchartsPie";
import HighchartsBar from "@/shared/charts/HighchartsBar";
import PersianDatePicker from "@/shared/forms/PersianDatePicker";
import type { WeeklySummary,SalesDetail } from "../../types";

import { getWeeklySummaryAction } from "../../actions";
import { Column } from "@/shared/table/types";
import DataTable from "@/shared/table/DataTable";
import SummaryCards from "../cards/SummaryCards";


export default function WeeklyReportDashboard() {
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  });

  const [summary, setSummary] = useState<WeeklySummary | null>(null);

  useEffect(() => {
    load();
  }, [date]);

  async function load() {
    const result = await getWeeklySummaryAction(date);
    setSummary(result);
  }

const columns: Column<SalesDetail>[] = [

    {
      key: "name",
      title: "دستگاه"
    },

    {
      key: "qty",
      title: "تعداد"
    },

    {
      key: "amount",
      title: "فروش",
      render: (r) =>
        r.amount.toLocaleString("fa-IR")
    },

    {
      key: "average",
      title: "میانگین",
      render: (r) =>
        r.average.toLocaleString("fa-IR")
    },

    {
      key: "best",
      title: "بهترین",
      render: (r) =>
        r.best.toLocaleString("fa-IR")
    },

    {
      key: "diff",
      title: "رشد",
      render: (r) =>

        <span
          className={
            r.diff >= 0
              ? "text-green-600"
              : "text-red-600"
          }
        >

          {r.diff} %

        </span>

    }

  ];

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
        <ChartCard title="سهم فروش دستگاه‌ها">
          <HighchartsPie title="" data={summary.pieChart} />
        </ChartCard>
        <ChartCard title="فروش روزهای هفته">
          <HighchartsBar title="" categories={summary.dailyChart.map(x => x.day)} data={summary.dailyChart.map(x => x.amount)} />
        </ChartCard>

      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="فروش دستگاه‌ها">
          <DataTable columns={columns} data={summary.details} title="" />
        </ChartCard>
      </div>


    </div>
  );
}