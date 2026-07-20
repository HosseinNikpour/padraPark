import { UserRole } from "@prisma/client";

import type { PermissionType } from "./Permissions";
import { RolePermissions } from "./Role";

export function has(

    role: UserRole,

    permission: PermissionType

): boolean {

    return RolePermissions[role].includes(permission);

}