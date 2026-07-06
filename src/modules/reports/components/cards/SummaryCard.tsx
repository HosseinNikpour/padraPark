interface Props {
  title: string;
  tickets: number;
  sales: number;
}

export default function SummaryCard({
  title,
  tickets,
  sales,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h3 className="mb-5 text-lg font-bold">
        {title}
      </h3>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>تعداد تیکت</span>

          <span className="font-bold">
            {tickets.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>مبلغ فروش</span>

          <span className="font-bold">
            {sales.toLocaleString()}
          </span>
        </div>

      </div>

    </div>
  );
}