"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  data: {
    day: string;
    amount: number;
  }[];
}

export default function WeeklyBarChart({
  data,
}: Props) {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
      style: {
        fontFamily: "IRANSansX",
      },
    },

    title: {
      text: "فروش روزهای هفته",
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      categories: data.map((x) => x.day),
    },

    yAxis: {
      title: {
        text: "مبلغ فروش",
      },
    },

    tooltip: {
      pointFormat:
        "<b>{point.y:,.0f}</b>",
    },

    legend: {
      enabled: false,
    },

    series: [
      {
        type: "column",
        data: data.map((x) => x.amount),
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