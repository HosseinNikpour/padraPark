"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  data: {
    name: string;
    amount: number;
  }[];
}

export default function SalesByGameChart({ data }: Props) {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
      borderRadius: 8,
    },

    title: {
      text: "فروش دستگاه‌ها",
      style: {
        fontSize: "18px",
      },
    },

    credits: {
      enabled: false,
    },

    legend: {
      enabled: false,
    },

    xAxis: {
      categories: data.map((x) => x.name),
      crosshair: true,
    },

    yAxis: {
      title: {
        text: "مبلغ فروش",
      },
    },

    tooltip: {
      pointFormatter: function () {
        return (
          "<b>" +
          Number(this.y).toLocaleString("fa-IR") +
          " تومان</b>"
        );
      },
    },

    plotOptions: {
      column: {
        borderRadius: 6,
        dataLabels: {
          enabled: true,
          formatter() {
            return Number(this.y).toLocaleString("fa-IR");
          },
        },
      },
    },

    series: [
      {
        type: "column",
        data: data.map((x) => x.amount),
      },
    ],
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />

    </div>
  );
}