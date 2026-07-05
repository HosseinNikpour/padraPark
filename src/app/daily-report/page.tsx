import DailyReportForm from "@/modules/daily-report/components/DailyReportForm";

export default function Page() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        گزارش روزانه
      </h1>

      <DailyReportForm />

    </div>
  );
}