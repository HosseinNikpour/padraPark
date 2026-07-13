import { ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Ticket,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/shared/ui/card";

type Props = {
  title: string;
  sales: number;
  tickets: number;
  icon: ReactNode;
  color?: string;
  diff?: number;
};

export default function StatCard({
  title,
  sales,
  tickets,
  icon,
  color = "bg-blue-500",
  diff,
}: Props) {
  const isPositive = (diff ?? 0) >= 0;

  return (
    <Card className={`group overflow-hidden border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${color}`}>

      <CardContent className="p-6">

        <div className={`flex items-start justify-between `}>

          <div>

            <p className="text-[22px] font-semibold text-white">
              {title}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
              {sales.toLocaleString("fa-IR")}
            </h2>

            <span className="text-xs  text-white">
              ریال
            </span>

          </div>

          {/* <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${color}`}
          >
            {icon}
          </div> */}

        </div>

        <div className="my-5 h-px bg-slate-200" />

        <div className="flex items-center justify-between">

          <div className="text-base flex items-center gap-2 text-[#f3eab1] mx-auto">

            <Ticket size={17} />

            <span className="">

              {tickets.toLocaleString("fa-IR")} تیکت

            </span>

          </div>

          {diff !== undefined && (

            <div
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                isPositive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isPositive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}

              {Math.abs(diff)}%

            </div>

          )}

        </div>

      </CardContent>

    </Card>
  );
}