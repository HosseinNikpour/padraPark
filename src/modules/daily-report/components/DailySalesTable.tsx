"use client";

type Sale = {
    id: number;
    title: string;
    code: string | null;
    type: string;
    qty: number;
    unitPrice: number;
    discount: number;
    totalPrice: number;
};

type Props = {
    sales: Sale[];
};

export default function DailySalesTable({
    sales,
}: Props) {

    if (sales.length === 0) {
        return (
            <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
                برای این روز فروشی ثبت نشده است.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border bg-white">

            <table className="w-full text-right">

                <thead className="bg-gray-50">

                    <tr>

                        <th className="px-4 py-3">
                            #
                        </th>

                        <th className="px-4 py-3">
                            عنوان
                        </th>

                        <th className="px-4 py-3">
                            نوع
                        </th>

                        <th className="px-4 py-3">
                            تعداد
                        </th>

                        <th className="px-4 py-3">
                            قیمت واحد
                        </th>

                        <th className="px-4 py-3">
                            تخفیف
                        </th>

                        <th className="px-4 py-3">
                            مبلغ
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {sales.map((sale, index) => (

                        <tr
                            key={sale.id}
                            className="border-t"
                        >

                            <td className="px-4 py-3">
                                {index + 1}
                            </td>

                            <td className="px-4 py-3 font-medium">
                                {sale.title}
                            </td>

                            <td className="px-4 py-3">
                                {sale.type}
                            </td>

                            <td className="px-4 py-3">
                                {sale.qty.toLocaleString()}
                            </td>

                            <td className="px-4 py-3">
                                {sale.unitPrice.toLocaleString()}
                            </td>

                            <td className="px-4 py-3">
                                {sale.discount.toLocaleString()}
                            </td>

                            <td className="px-4 py-3 font-bold">
                                {sale.totalPrice.toLocaleString()}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}