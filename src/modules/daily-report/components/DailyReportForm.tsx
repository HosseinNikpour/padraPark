"use client";

import { useState } from "react";

import ReportHeader from "./ReportHeader";
import FileUploader from "./FileUploader";
import SalesPreviewTable from "./SalesPreviewTable";

import { parseExcel } from "../excel";
import { saveDailyReport } from "../actions";

import { ExcelSaleRow, ExcelSummary } from "../types";

export default function DailyReportForm() {
  const [branchId, setBranchId] = useState(1);

  const [reportDate, setReportDate] = useState<Date | null>(
    new Date()
  );

  const [file, setFile] = useState<File | null>(null);

  const [rows, setRows] = useState<ExcelSaleRow[]>([]);

  const [summary, setSummary] =
    useState<ExcelSummary | null>(null);

  const [loading, setLoading] = useState(false);

  async function handlePreview() {
    if (!file) {
      alert("فایل اکسل را انتخاب کنید.");
      return;
    }

    try {
      setLoading(true);

      const parsed = await parseExcel(file);

      setRows(parsed.rows);

      setSummary(parsed.summary);

      if (parsed.rows.length === 0) {
        alert("هیچ آیتم فروشی پیدا نشد.");
      }
    } catch (e) {
      console.error(e);
      alert("خطا در خواندن فایل اکسل");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!reportDate) {
      alert("تاریخ را انتخاب کنید.");
      return;
    }

    if (rows.length === 0) {
      alert("اطلاعات فروش وجود ندارد.");
      return;
    }

    try {
      setLoading(true);

      await saveDailyReport({
        branchId,
        date: reportDate.toISOString(),
        rows,
        summary,
      });

      alert("گزارش با موفقیت ثبت شد.");

      setRows([]);
      setSummary(null);
      setFile(null);
    } catch (e) {
      console.error(e);
      alert("خطا در ثبت گزارش");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        گزارش روزانه
      </h1>

      <ReportHeader
        branchId={branchId}
        date={reportDate}
        onBranchChange={setBranchId}
        onDateChange={setReportDate}
      />

      <FileUploader
        onFileSelected={setFile}
      />

      {file && (
        <div className="rounded-lg border bg-white p-4">

          <div className="text-sm text-gray-500">
            فایل انتخاب شده
          </div>

          <div className="font-semibold">
            {file.name}
          </div>

        </div>
      )}

      <button
        type="button"
        onClick={handlePreview}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        پیش نمایش
      </button>

      {summary && (
        <div className="grid grid-cols-4 gap-4">

          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">
              مبلغ فروش
            </div>

            <div className="font-bold">
              {summary.totalSales.toLocaleString()}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">
              تخفیف
            </div>

            <div className="font-bold">
              {summary.totalDiscount.toLocaleString()}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">
              صندوق
            </div>

            <div className="font-bold">
              {summary.cashAmount.toLocaleString()}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">
              تعداد آیتم
            </div>

            <div className="font-bold">
              {summary.invoiceCount}
            </div>
          </div>

        </div>
      )}

      {rows.length > 0 && (
        <>
          <SalesPreviewTable rows={rows} />

          <div className="flex justify-end">

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="rounded-lg bg-green-600 px-8 py-3 text-white"
            >
              ثبت گزارش
            </button>

          </div>
        </>
      )}

    </div>
  );
}