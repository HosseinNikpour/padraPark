"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  data: {
    name: string;
    amount: number;
  }[];
}

export default function WeeklyPieChart({ data }: Props) {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      style: {
        fontFamily: "IRANSansX",
      },
    },

    title: {
      text: "سهم فروش دستگاه‌ها",
    },

    credits: {
      enabled: false,
    },

    tooltip: {
      pointFormat:
        "<b>{point.y:,.0f}</b>",
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },

    series: [
      {
        type: "pie",
        name: "فروش",
        data: data.map((x) => ({
          name: x.name,
          y: x.amount,
        })),
      },
    ],
  };

  return (
    <div className="rounded-xl bg-white shadow p-5">

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />

    </div>
  );
}