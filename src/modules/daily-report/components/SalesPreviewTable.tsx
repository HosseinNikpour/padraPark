"use client";

import { ExcelSaleRow } from "../types";

interface Props {
  rows: ExcelSaleRow[];
}

export default function SalesPreviewTable({ rows }: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">

      <div className="px-5 py-4 border-b font-bold text-lg">
        پیش نمایش فروش
      </div>

      <table className="w-full text-sm">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-right">کد</th>

            <th className="p-3 text-right">نام کالا</th>

            <th className="p-3">تعداد</th>

            <th className="p-3">قیمت</th>

            <th className="p-3">مبلغ</th>

          </tr>

        </thead>

        <tbody>

          {rows.map((row, index) => (

            <tr
              key={index}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-3">{row.code}</td>

              <td className="p-3">{row.title}</td>

              <td className="p-3 text-center">
                {row.qty}
              </td>

              <td className="p-3 text-center">
                {row.unitPrice.toLocaleString()}
              </td>

              <td className="p-3 text-center font-bold">
                {row.totalPrice.toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}