import { CurrentUser } from "@/core/auth/currentUser";

import { UserRole } from "@prisma/client";

import { OperatorDashboard } from "../pages/OperatorDashboard";
import { ReceptionDashboard } from "../pages/ReceptionDashboard";
import { ManagerDashboard } from "../pages/ManagerDashboard";
import { AdminDashboard } from "../pages/AdminDashboard";

export async function RoleDashboardResolver(

    user: CurrentUser

) {

    switch (user.role) {

        case UserRole.OPERATOR:

            return <OperatorDashboard user={user} />;

        case UserRole.MANAGER:

            return <ManagerDashboard user={user} />;

        case UserRole.ADMIN:

            return <AdminDashboard user={user} />;

        case UserRole.CAFE:

            return <ReceptionDashboard user={user} />;

        default:

            return (

                <div className="p-10">

                    Dashboard Not Found

                </div>

            );

    }

}