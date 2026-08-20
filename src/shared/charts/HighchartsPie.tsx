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
      backgroundColor: "#1F2533",
      style: {
        fontFamily: "Vazirmatn",
      },
    },
    tooltip: {
      useHTML: true,
      pointFormatter: function () {
        return `
            <b>${this.name}</b><br/>
            مبلغ فروش:
            <b>${Highcharts.numberFormat(this.y as number, 0)}</b>
            ریال
            <br/>
            سهم:
            <b>${Highcharts.numberFormat(this.percentage as number, 1)}%</b>
        `;
      },
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        // showInLegend: true,
        dataLabels: {
          enabled: true,
          distance: 15,
          formatter: function () {

            return `
                    <b>${this.name}</b><br/>
                    ${Highcharts.numberFormat(
              this.percentage!,
              1
            )}%
                `;

          },
          style: {
            fontWeight: "bold",
            textOutline: "none",
          },
        },
      },
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