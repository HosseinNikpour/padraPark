"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface Props {
  value: Date | null;
  onChange(date: Date | null): void;
}

export default function PersianDatePicker({
  value,
  onChange,
}: Props) {
  return (
    <DatePicker
      value={value ?? ""}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      inputClass="border rounded-lg h-11 w-full px-3"
      onChange={(d: any) => {
        if (!d) {
          onChange(null);
          return;
        }

        onChange(d.toDate());
      }}
    />
  );
}