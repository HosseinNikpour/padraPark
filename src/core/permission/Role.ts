import { UserRole } from "@prisma/client";

import { Permission } from "./Permissions";
import type { PermissionType } from "./Permissions";

const ALL_PERMISSIONS = Object.values(
    Permission
) as readonly PermissionType[];

export const RolePermissions: Record<
    UserRole,
    readonly PermissionType[]
> = {

    ADMIN: ALL_PERMISSIONS,

    MANAGER: [

        Permission.DashboardView,

        Permission.ChecklistView,
        Permission.ChecklistCreate,

        Permission.DailyReportView,
        Permission.DailyReportCreate,
        Permission.DailyReportEdit,

        Permission.DeviceView,
        Permission.DeviceEdit,

        Permission.BranchView,

        Permission.UserView,

    ],

    OPERATOR: [

        Permission.ChecklistView,
        Permission.ChecklistCreate,

        Permission.DeviceView,

    ],

    CAFE: [

    ],

};