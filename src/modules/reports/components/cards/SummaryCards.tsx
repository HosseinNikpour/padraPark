import {
  Ticket,
  Coffee,
  Building2,
  Wallet,
  Trophy,
  MoonStar,
} from "lucide-react";

import StatCard from "@/shared/dashboard/StatCard";

import type { SummaryCardData } from "../../types";

interface Props {
  summary: {
    downstairs: SummaryCardData;
    upstairs: SummaryCardData;
    cafe: SummaryCardData;
    total: SummaryCardData;
  };
}

export default function SummaryCards({
  summary,
}: Props) {
  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">

      <StatCard
    title="بازی‌های حرکتی"
    sales={summary.downstairs.sales}
    tickets={summary.downstairs.tickets}
    icon={<Ticket size={28} />}
    color="bg-sky-500"
/>

<StatCard
    title="اتاق‌های ایونت"
    sales={summary.upstairs.sales}
    tickets={summary.upstairs.tickets}
    icon={<Building2 size={28} />}
    color="bg-violet-500"
/>

<StatCard
    title="جام و لیگ"
    sales={summary.upstairs.sales}
    tickets={summary.upstairs.tickets}
    icon={<Trophy size={28} />}
    color="bg-amber-500"
/>

<StatCard
    title="کافه"
    sales={summary.cafe.sales}
    tickets={summary.cafe.tickets}
    icon={<Coffee size={28} />}
    color="bg-orange-500"
/>

<StatCard
    title="شب‌های پادرا"
    sales={0}
    tickets={0}
    icon={<MoonStar size={28} />}
    color="bg-indigo-500"
/>

<StatCard
    title="فروش کل"
    sales={summary.total.sales}
    tickets={summary.total.tickets}
    icon={<Wallet size={28} />}
    color="bg-emerald-500"
/>

    </div>
  );
}