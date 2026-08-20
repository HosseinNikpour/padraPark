"use client";

import { useEffect, useState } from "react";

import PersianDatePicker from "@/shared/forms/PersianDatePicker";
import { getDailySales } from "../actions";
import DailySalesTable from "./DailySalesTable";

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

export default function DailySalesViewer() {

    const [branchId] = useState(1);

    const [date, setDate] =
        useState<Date | null>(new Date());

    const [sales, setSales] =
        useState<Sale[]>([]);

    const [report, setReport] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        if (!date) {
            return;
        }
const selectedDate = date;
        async function load() {

            try {

                setLoading(true);

                const result =
                    await getDailySales(
                        branchId,
                        selectedDate.toISOString()
                    );

                setSales(result.sales);

                setReport(result.report);

            } catch (error) {

                console.error(error);

                setSales([]);

                setReport(null);

            } finally {

                setLoading(false);

            }

        }

        load();

    }, [date, branchId]);

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    فروش روزانه
                </h1>

                <p className="mt-2 text-gray-500">
                    فروش‌های ثبت‌شده برای تاریخ انتخاب‌شده
                </p>

            </div>

            <div className="rounded-lg border bg-white p-4">

                <label className="mb-2 block text-sm text-gray-600">
                    تاریخ
                </label>

                <PersianDatePicker
                    value={date}
                    onChange={(d) => {

                        if (d) {
                            setDate(d);
                        }

                    }}
                />

            </div>

            {loading && (

                <div className="rounded-lg border bg-white p-6 text-center">
                    در حال دریافت اطلاعات...
                </div>

            )}

            {!loading && report && (

                <div className="grid grid-cols-4 gap-4">

                    <div className="rounded-lg border bg-white p-4">

                        <div className="text-sm text-gray-500">
                            فروش
                        </div>

                        <div className="mt-1 text-xl font-bold">
                            {report.totalSales.toLocaleString()}
                        </div>

                    </div>

                    <div className="rounded-lg border bg-white p-4">

                        <div className="text-sm text-gray-500">
                            تخفیف
                        </div>

                        <div className="mt-1 text-xl font-bold">
                            {report.totalDiscount.toLocaleString()}
                        </div>

                    </div>

                    <div className="rounded-lg border bg-white p-4">

                        <div className="text-sm text-gray-500">
                            صندوق
                        </div>

                        <div className="mt-1 text-xl font-bold">
                            {report.cashAmount.toLocaleString()}
                        </div>

                    </div>

                    <div className="rounded-lg border bg-white p-4">

                        <div className="text-sm text-gray-500">
                            تعداد فاکتور
                        </div>

                        <div className="mt-1 text-xl font-bold">
                            {report.invoiceCount.toLocaleString()}
                        </div>

                    </div>

                </div>

            )}

            {!loading && (

                <DailySalesTable
                    sales={sales}
                />

            )}

        </div>

    );
}