import { getWeeklySalesReport } from "@/modules/reports/repository";
import WeeklySalesChart from "@/modules/reports/components/charts/WeeklySalesChart";

export default async function TotalReportPage() {
    const weeklySales = await getWeeklySalesReport();

    return (
        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                گزارش فروش
            </h1>

            <WeeklySalesChart  data={weeklySales}
            />

        </div>
    );
}