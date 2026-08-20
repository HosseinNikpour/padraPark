"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type WeeklyReport = {
    year: number;
    weekNo: number;
    from: string;
    to: string;

    games: {
        name: string;
        qty: number;
        amount: number;
    }[];

    package: {
        qty: number;
        amount: number;
    };

    events: {
        qty: number;
        amount: number;
    };

    cafe: {
        qty: number;
        amount: number;
    };

    total: {
        qty: number;
        amount: number;
    };
};

type Props = {
    data: WeeklyReport[];
};

export default function WeeklySalesChart({
    data,
}: Props) {

    const options: Highcharts.Options = {

        chart: {
            type: "column",
            height: 600,
            style: {
                fontFamily: "Vazirmatn",
            },
        },

        title: {
            text: "روند فروش",
        },

        credits: {
            enabled: false,
        },

        xAxis: {
            categories: data.map(
                (item) =>
                    `هفته ${item.weekNo - 6}`
            ),
            labels: {
                style: {
                    fontSize: "16px",
                },
            },
            title: {
                text: "هفته",
            },
        },

        yAxis: {
            min: 0,

            title: {
                text: "مبلغ فروش (میلیون ریال)",
                style: {
                    fontSize: "20px",
                },
            },

            labels: {
                style: {
                    fontSize: "16px",
                },
                formatter: function () {
                    return Highcharts.numberFormat(
                        Number(this.value) / 1000000,
                        0
                    );
                },
            },
        },

        tooltip: {
            shared: true,

            formatter: function () {

                const index = Number(this.x);

                const week =
                    index !== undefined
                        ? data[index]
                        : undefined;

                let html = "";

                html += `
                    <div style="direction:rtl">
                        <b>
                            ${week?.from ?? ""}
                            -
                            ${week?.to ?? ""}
                        </b>
                        <br/><br/>
                `;

                this.points?.forEach(
                    (point) => {

                        html += `
                            <span style="
                                color:${point.color}
                            ">●</span>
                            ${point.series.name}:
                            <b>
                                ${Highcharts.numberFormat(
                            Number(point.y),
                            0
                        )}
                            </b>
                            <br/>
                        `;
                    }
                );

                if (week) {

                    html += `
                        <br/>
                        <b>
                            مجموع:
                            ${Highcharts.numberFormat(
                        week.total.amount,
                        0
                    )}
                        </b>
                    `;
                }

                html += "</div>";

                return html;
            },
        },

        plotOptions: {

            column: {

                stacking: "normal",

                borderWidth: 0,

                dataLabels: {
                    enabled: false,
                },
            },
        },

        series: [



            {
                type: "column",

                name: "پکیج",
                color: "#34D399",
                data: data.map(
                    (item) =>
                        item.package.amount
                ),
            },

            {
                type: "column",

                name: "ایونت",
                color: "#FB7185",
                data: data.map(
                    (item) =>
                        item.events.amount
                ),
            },

            {
                type: "column",

                name: "کافه",
                color: "#A78BFA",
                data: data.map(
                    (item) =>
                        item.cafe.amount
                ),
            },
            {
                type: "column",

                name: "بازی‌ها",
                color: "#38BDF8",
                data: data.map(
                    (item) =>
                        item.games.reduce(
                            (
                                sum,
                                game
                            ) =>
                                sum +
                                game.amount,
                            0
                        )
                ),
            },
        ],
    };

    return (
        <div className="rounded-xl border bg-white p-4">

            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />

        </div>
    );
}