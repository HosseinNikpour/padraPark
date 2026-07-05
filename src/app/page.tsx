import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="grid lg:grid-cols-4 gap-5">

      <Card className="p-6">

        <div className="text-4xl font-bold">
          0
        </div>

        <div className="text-gray-500 mt-2">
          فروش امروز
        </div>

      </Card>

      <Card className="p-6">

        <div className="text-4xl font-bold">
          0
        </div>

        <div className="text-gray-500 mt-2">
          تعداد بازی‌ها
        </div>

      </Card>

    </div>
  );
}