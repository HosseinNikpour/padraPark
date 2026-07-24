import { CurrentUser } from "@/core/auth/currentUser";

import { DashboardFacade } from "../services/DashboardFacade";

import { DashboardCard } from "../components/DashboardCard";
import { DashboardGrid } from "../components/DashboardGrid";
import { DashboardHeader } from "../components/DashboardHeader";

interface Props {

    user: CurrentUser;

}

export async function OperatorDashboard({

    user,

}: Props) {

    const facade = new DashboardFacade();

    const dashboard =
        await facade.getGameMasterDashboard(user.id);

    return (

        <div className="max-w-7xl mx-auto p-8">

            <DashboardHeader

                title={`سلام ${user.fullName}`}

                subtitle="به داشبورد گیم مستر خوش آمدید"

            />

            <DashboardGrid>

                <DashboardCard

                    title="چک لیست شروع شیفت"

                    value={
                        dashboard.hasStartChecklist
                            ? "ثبت شده"
                            : "ثبت نشده"
                    }

                    description="امروز"

                    href="/checklists/start"

                />

                <DashboardCard

                    title="خرابی دستگاه‌ها"

                    value={dashboard.openIssues}

                    description="مورد باز"

                    href="/issues"

                />

                <DashboardCard

                    title="وظایف امروز"

                    value={dashboard.todayTasks}

                    description="وظیفه"

                />

                <DashboardCard

                    title="اطلاعیه‌ها"

                    value="به زودی"

                />

            </DashboardGrid>

        </div>

    );

}