import SummaryCard from "./SummaryCard";
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
    <div className="grid gap-5 lg:grid-cols-4">

      <SummaryCard
        title="طبقه پایین"
        tickets={summary.downstairs.tickets}
        sales={summary.downstairs.sales}
      />

      <SummaryCard
        title="طبقه بالا"
        tickets={summary.upstairs.tickets}
        sales={summary.upstairs.sales}
      />

      <SummaryCard
        title="کافه"
        tickets={summary.cafe.tickets}
        sales={summary.cafe.sales}
      />

      <SummaryCard
        title="مجموع"
        tickets={summary.total.tickets}
        sales={summary.total.sales}
      />

    </div>
  );
}