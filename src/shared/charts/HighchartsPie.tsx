"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface PieItem {
  name: string;
  amount: number;
}

interface Props {
  title: string;
  data: PieItem[];
}

export default function HighchartsPie({
  title,
  data,
}: Props) {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      height: 420,
    },

    title: {
      text: title,
    },

    credits: {
      enabled: false,
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
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}