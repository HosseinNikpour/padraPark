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
  console.log(data);
  debugger;
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
      useHTML: true,
      pointFormatter: function () {
        return `
            <b>${this.name}</b><br/>
            مبلغ فروش:
            <b>${Highcharts.numberFormat(this.y as number, 0)}</b>
            تومان
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
        showInLegend: true,
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