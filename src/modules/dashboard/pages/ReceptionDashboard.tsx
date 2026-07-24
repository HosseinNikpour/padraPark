import { CurrentUser } from "@/core/auth/currentUser";

import { DashboardCard } from "../components/DashboardCard";

export async function ReceptionDashboard({

    user,

}: {

    user: CurrentUser;

}) {

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">

                    سلام {user.fullName}

                </h1>

                <p className="text-gray-500 mt-2">

                    به داشبورد رسپشن خوش آمدید

                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

                <DashboardCard
                    title="چک لیست روزانه"
                    value="ثبت اطلاعات"
                    href="/checklists/start"
                />

                <DashboardCard
                    title="گزارش روزانه"
                    value="ثبت اطلاعات"
                    href="/daily-report"
                />

                <DashboardCard
                    title="رزروهای امروز"
                    value="مشاهده"
                    href="/reservations/today"
                />

            </div>

        </div>

    );

}