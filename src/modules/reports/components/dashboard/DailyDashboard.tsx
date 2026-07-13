"use client";

import { useEffect, useState } from "react";
import DataTable from "@/shared/table/DataTable";
import { Column } from "@/shared/table/types";
import PersianDatePicker from "@/shared/forms/PersianDatePicker";
import ChartCard from "@/shared/dashboard/ChartCard";
import HighchartsBar from "@/shared/charts/HighchartsBar";
import { getDailySummary } from "../../actions";
import type { DailySummary, SalesDetail } from "../../types";
import SummaryCards from "../cards/SummaryCards";


export default function DailyReportDashboard() {
  const [date, setDate] = useState(new Date());

  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState<DailySummary | null>(null);

  useEffect(() => {
    loadData();
  }, [date]);

  async function loadData() {
    setLoading(true);

    try {
      const result = await getDailySummary(date);

      setSummary(result);
    } finally {
      setLoading(false);
    }
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

  if (!summary) {
    return (
      <div className="p-10 text-center">
        در حال بارگذاری...
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-5 shadow">
        <PersianDatePicker
          value={date}
          onChange={(d) => {
            if (d) {
              setDate(d);
            }
          }}
        />
      </div>

      <SummaryCards summary={summary!} />

      <div className="grid grid-cols-12 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-6">
          <ChartCard title="فروش دستگاه‌ها">

            <HighchartsBar
              title=""
              categories={summary.chart.map(x => x.name)}
              data={summary.chart.map(x => x.amount)}
            />

          </ChartCard>
        </div>
        <div className="xl:col-span-6">
          <ChartCard title="فروش دستگاه‌ها">
            <DataTable columns={columns} data={summary.details} title="" />
          </ChartCard>
        </div>
      </div>
      {loading && (
        <div className="text-center text-gray-500">
          در حال بارگذاری...
        </div>
      )}
    </div>
  );
}
