"use client";

import { useEffect, useState } from "react";

import PersianDatePicker from "@/shared/forms/PersianDatePicker";

import { getDailySummary } from "../../actions";

import SummaryCards from "../cards/SummaryCards";
import SalesByGameChart from "../charts/SalesByGameChart";
import SalesTable from "../tables/SalesTable";

interface Summary {
  downstairs: {
    tickets: number;
    sales: number;
  };

  upstairs: {
    tickets: number;
    sales: number;
  };

  cafe: {
    tickets: number;
    sales: number;
  };

  total: {
    tickets: number;
    sales: number;
  };

  chart: {
    name: string;
    amount: number;
  }[];

  details: {
    name: string;
    qty: number;
    amount: number;
     average:number;
    best:number;
    diff:number;
  }[];
}

export default function DailyReportDashboard() {
  const [date, setDate] = useState(new Date());

  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState<Summary>({
    downstairs: {
      tickets: 0,
      sales: 0,
    },

    upstairs: {
      tickets: 0,
      sales: 0,
    },

    cafe: {
      tickets: 0,
      sales: 0,
    },

    total: {
      tickets: 0,
      sales: 0,
    },

    chart: [],

    details: [],
  });

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

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SalesByGameChart
            data={summary.chart}
          />
        </div>

        <div>
          <SalesTable
            data={summary.details}
          />
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