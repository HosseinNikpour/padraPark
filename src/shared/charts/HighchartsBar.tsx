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
  color = "#3B82F6",
}: Props) {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
      height: 420,
      backgroundColor: "#1F2533",
      style: {
        fontFamily: "Vazirmatn",
      },
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