import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

type Props = {
  title: string;
  children: ReactNode;
};

export default function ChartCard({
  title,
  children,
}: Props) {
  return (
    <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-xl">

      <CardHeader className="border-b">

        <CardTitle className="text-lg font-bold text-slate-800">
          {title}
        </CardTitle>

      </CardHeader>

      <CardContent className="p-6">

        {children}

      </CardContent>

    </Card>
  );
}