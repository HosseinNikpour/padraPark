"use client";

interface Row {
  name: string;
  qty: number;
  amount: number;
  average: number;
  best: number;
  diff: number;
}

interface Props {
  data: Row[];
}

export default function SalesTable({ data }: Props) {
  return (
    <div className="rounded-xl bg-white shadow overflow-hidden">

      <div className="border-b px-5 py-4">
        <h2 className="text-lg font-bold">
          عملکرد دستگاه‌ها
        </h2>
      </div>

      <table className="w-full text-sm">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-right">
              دستگاه
            </th>

            <th className="p-3 text-center">
              تعداد
            </th>

            <th className="p-3 text-left">
              فروش
            </th>

            <th className="p-3 text-left">
              میانگین
            </th>

            <th className="p-3 text-left">
              بهترین
            </th>

            <th className="p-3 text-center">
              اختلاف
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((row) => (

            <tr
              key={row.name}
              className="border-b hover:bg-slate-50 transition"
            >

              <td className="p-3 font-medium">
                {row.name}
              </td>

              <td className="text-center">
                {row.qty.toLocaleString("fa-IR")}
              </td>

              <td className="text-left">
                {row.amount.toLocaleString("fa-IR")}
              </td>

              <td className="text-left text-gray-500">
                {row.average.toLocaleString("fa-IR")}
              </td>

              <td className="text-left text-blue-600 font-semibold">
                {row.best.toLocaleString("fa-IR")}
              </td>

              <td
                className={`text-center font-bold ${
                  row.diff > 0
                    ? "text-green-600"
                    : row.diff < 0
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {row.diff > 0 && "+"}
                {row.diff}%
              </td>

            </tr>

          ))}

          {data.length === 0 && (
            <tr>

              <td
                colSpan={6}
                className="py-8 text-center text-gray-400"
              >
                اطلاعاتی برای این روز وجود ندارد.
              </td>

            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}