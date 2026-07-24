import { ChecklistType } from "@prisma/client";

import { ChecklistService } from "@/modules/checklist/services/ChecklistService";
export interface SaveChecklistDto {

    //userId: number;

    groupId: number;

    type: ChecklistType;

    description?: string;

    attachment?: string;

    answers: {

        questionId: number;

        checked: boolean;

        description?: string;

    }[];

}



// export class DashboardFacade {

//     private readonly checklistService =
//         new ChecklistService();

//     async getOperatorDashboard(
//         userId: number
//     ) {

//         const completed =
//             await this.checklistService.getTodayCompletedGroups(

//                 userId,

//                 ChecklistType.START

//             );

//         return {

//             hasStartChecklist:
//                 completed.length > 0,

//             hasEndChecklist: false,

//             openIssues: 0,

//             todayTasks: 0,

//         };

//     }

// }