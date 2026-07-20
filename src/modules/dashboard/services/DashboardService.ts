import { ChecklistType } from "@prisma/client";

import { ChecklistService } from "@/modules/checklist/services/ChecklistService";

export class DashboardService {

    private checklistService = new ChecklistService();

    async getGameMasterDashboard(

        userId: number

    ) {

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

}