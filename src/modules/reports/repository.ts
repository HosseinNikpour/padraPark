import { prisma } from "@/lib/prisma";

export async function getDailySummaryRepository(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const report = await prisma.dailyReport.findFirst({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    include: {
      sales: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  if (!report) {
    return {
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
    };
  }

  const weekDay = start.getDay();

  const previousReports = await prisma.dailyReport.findMany({
    where: {
      id: {
        not: report.id,
      },
    },
    include: {
      sales: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  const sameWeekDayReports = previousReports.filter(
    (x) => x.date.getDay() === weekDay
  );

  const gameItems = report.sales.filter(
    (x) => x.menuItem.type === "GAME"
  );

  const cafeItems = report.sales.filter(
    (x) => x.menuItem.type === "CAFE"
  );

  const gameTickets = gameItems.reduce(
    (a, b) => a + b.qty,
    0
  );

  const gameSales = gameItems.reduce(
    (a, b) => a + b.totalPrice,
    0
  );

  const cafeTickets = cafeItems.reduce(
    (a, b) => a + b.qty,
    0
  );

  const cafeSales = cafeItems.reduce(
    (a, b) => a + b.totalPrice,
    0
  );

  const chartMap = gameItems.reduce<
    Record<string, number>
  >((acc, item) => {
    acc[item.menuItem.title] =
      (acc[item.menuItem.title] ?? 0) +
      item.totalPrice;

    return acc;
  }, {});

  const chart = Object.entries(chartMap).map(
    ([name, amount]) => ({
      name,
      amount,
    })
  );

  chart.push({
    name: "کافه",
    amount: cafeSales,
  });

  const detailsMap = gameItems.reduce<
    Record<
      string,
      {
        qty: number;
        amount: number;
      }
    >
  >((acc, item) => {
    if (!acc[item.menuItem.title]) {
      acc[item.menuItem.title] = {
        qty: 0,
        amount: 0,
      };
    }

    acc[item.menuItem.title].qty += item.qty;

    acc[item.menuItem.title].amount +=
      item.totalPrice;

    return acc;
  }, {});

  const details = Object.entries(detailsMap).map(
    ([name, value]) => {
      const previous = sameWeekDayReports.flatMap(
        (r) =>
          r.sales.filter(
            (s) =>
              s.menuItem.title === name &&
              s.menuItem.type === "GAME"
          )
      );

      const average =
        previous.length === 0
          ? 0
          : Math.round(
            previous.reduce(
              (a, b) => a + b.totalPrice,
              0
            ) / previous.length
          );

      const best =
        previous.length === 0
          ? value.amount
          : Math.max(
            value.amount,
            ...previous.map(
              (x) => x.totalPrice
            )
          );

      const diff =
        average === 0
          ? 0
          : Math.round(
            ((value.amount - average) /
              average) *
            100
          );

      return {
        name,

        qty: value.qty,

        amount: value.amount,

        average,

        best,

        diff,
      };
    }
  );
  const previousCafe = sameWeekDayReports.flatMap((r) =>
    r.sales.filter((s) => s.menuItem.type === "CAFE")
  );

  const cafeAverage =
    previousCafe.length === 0
      ? 0
      : Math.round(
        previousCafe.reduce(
          (a, b) => a + b.totalPrice,
          0
        ) / previousCafe.length
      );

  const cafeBest =
    previousCafe.length === 0
      ? cafeSales
      : Math.max(
        cafeSales,
        ...previousCafe.map((x) => x.totalPrice)
      );

  const cafeDiff =
    cafeAverage === 0
      ? 0
      : Math.round(
        ((cafeSales - cafeAverage) /
          cafeAverage) *
        100
      );

  details.push({
    name: "کافه",
    qty: cafeTickets,
    amount: cafeSales,
    average: cafeAverage,
    best: cafeBest,
    diff: cafeDiff,
  });

  return {
    downstairs: {
      tickets: gameTickets,
      sales: gameSales,
    },

    upstairs: {
      tickets: 0,
      sales: 0,
    },

    cafe: {
      tickets: cafeTickets,
      sales: cafeSales,
    },

    total: {
      tickets: gameTickets + cafeTickets,
      sales: gameSales + cafeSales,
    },

    chart,

    details,
  };
}
function getWeekRange(date: Date) {
  const d = new Date(date);

  // JS:
  // Sunday=0
  // Monday=1
  // ...
  // Saturday=6

  const diff = d.getDay() === 6 ? 0 : d.getDay() + 1;

  const start = new Date(d);
  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return {
    start,
    end,
  };
}

export async function getWeeklySummary(date: Date) {
  const { start, end } = getWeekRange(date);

  const reports = await prisma.dailyReport.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    include: {
      sales: {
        include: {
          menuItem: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const sales = reports.flatMap((x) => x.sales);

  const gameSales = sales.filter(
    (x) => x.menuItem.type === "GAME"
  );

  const cafeSales = sales.filter(
    (x) => x.menuItem.type === "CAFE"
  );

  const downstairsTickets = gameSales.reduce(
    (a, b) => a + b.qty,
    0
  );

  const downstairsAmount = gameSales.reduce(
    (a, b) => a + b.totalPrice,
    0
  );

  const cafeTickets = cafeSales.reduce(
    (a, b) => a + b.qty,
    0
  );

  const cafeAmount = cafeSales.reduce(
    (a, b) => a + b.totalPrice,
    0
  );

  // ---------------- Pie Chart ----------------

  const pieMap = gameSales.reduce<
    Record<string, number>
  >((acc, item) => {
    acc[item.menuItem.title] =
      (acc[item.menuItem.title] ?? 0) +
      item.totalPrice;

    return acc;
  }, {});

  const pieChart = Object.entries(pieMap).map(
    ([name, amount]) => ({
      name,
      amount,
    })
  );

  // ---------------- Weekly Bar ----------------

  const dailyChart = [
    { day: "شنبه", amount: 0 },
    { day: "یکشنبه", amount: 0 },
    { day: "دوشنبه", amount: 0 },
    { day: "سه شنبه", amount: 0 },
    { day: "چهارشنبه", amount: 0 },
    { day: "پنجشنبه", amount: 0 },
    { day: "جمعه", amount: 0 },
  ];

  const dayMap: Record<number, number> = {
    6: 0, // Saturday
    0: 1, // Sunday
    1: 2, // Monday
    2: 3, // Tuesday
    3: 4, // Wednesday
    4: 5, // Thursday
    5: 6, // Friday
  };

  reports.forEach((report) => {
    const index = dayMap[report.date.getDay()];

    const amount = report.sales.reduce(
      (sum, sale) => sum + sale.totalPrice,
      0
    );

    dailyChart[index].amount += amount;
  });

  // ---------------- Details ----------------

  const detailMap = gameSales.reduce<
    Record<
      string,
      {
        qty: number;
        amount: number;
      }
    >
  >((acc, item) => {
    if (!acc[item.menuItem.title]) {
      acc[item.menuItem.title] = {
        qty: 0,
        amount: 0,
      };
    }

    acc[item.menuItem.title].qty += item.qty;
    acc[item.menuItem.title].amount += item.totalPrice;

    return acc;
  }, {});

  const details = Object.entries(detailMap).map(
    ([name, value]) => ({
      name,
      qty: value.qty,
      amount: value.amount,
    })
  );

  details.push({
    name: "کافه",
    qty: cafeTickets,
    amount: cafeAmount,
  });

  return {
    start,
    end,

    downstairs: {
      tickets: downstairsTickets,
      sales: downstairsAmount,
    },

    upstairs: {
      tickets: 0,
      sales: 0,
    },

    cafe: {
      tickets: cafeTickets,
      sales: cafeAmount,
    },

    total: {
      tickets: downstairsTickets + cafeTickets,
      sales: downstairsAmount + cafeAmount,
    },

    pieChart,

    dailyChart,

    details,
  };
}