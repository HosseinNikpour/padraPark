"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  title: string;
  categories: string[];
  data: number[];
  color?: string;
}

export default function HighchartsBar({
  title,
  categories,
  data,
  color = "#2563eb",
}: Props) {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
      height: 420,
    },

    title: {
      text: title,
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      categories,
    },

    yAxis: {
      title: {
        text: "مبلغ فروش",
      },
    },

    tooltip: {
      valueSuffix: " تومان",
    },

    series: [
      {
        type: "column",
        name: title,
        color,
        data,
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}