import { DashboardService } from "./DashboardService";

export class DashboardFacade {

    private readonly dashboardService = new DashboardService();

    async getOperatorDashboard(userId: number) {

        return this.dashboardService.getGameMasterDashboard(userId);

    }

}