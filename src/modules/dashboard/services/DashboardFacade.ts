import { ChecklistType } from "@prisma/client";

import { ChecklistService } from "@/modules/checklist/services/ChecklistService";

export class DashboardFacade {

    private readonly checklistService =
        new ChecklistService();

    async getGameMasterDashboard(userId: number) {

        const completed =
            await this.checklistService.getTodayCompletedGroups(
                userId,
                ChecklistType.START
            );

        return {

            hasStartChecklist:
                completed.length > 0,

            hasEndChecklist: false,

            openIssues: 0,

            todayTasks: 0,

        };

    }

    async getReceptionDashboard(userId: number) {

        const completed =
            await this.checklistService.getTodayCompletedGroups(
                userId,
                ChecklistType.START
            );

        return {

            hasDailyChecklist:
                completed.length > 0,

            hasDailyReport: false,

            todayReservations: 0,

        };

    }

}