"use client";

import PersianDatePicker from "./PersianDatePicker";

interface Props {
  branchId: number;
  date: Date | null;
  onBranchChange(branchId: number): void;
  onDateChange(date: Date | null): void;
}

export default function ReportHeader({
  branchId,
  date,
  onBranchChange,
  onDateChange,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-5">

      <div>

        <label className="block mb-2 font-medium">
          تاریخ گزارش
        </label>

        <PersianDatePicker
          value={date}
          onChange={onDateChange}
        />

      </div>

      <div>

        <label className="block mb-2 font-medium">
          شعبه
        </label>

        <select
          className="border rounded-lg h-11 w-full px-3"
          value={branchId}
          onChange={(e) =>
            onBranchChange(Number(e.target.value))
          }
        >
          <option value={1}>
            شعبه مرکزی
          </option>

        </select>

      </div>

    </div>
  );
}