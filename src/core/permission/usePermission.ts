"use client";

import { UserRole } from "@prisma/client";

import { has } from "./has";
import type { PermissionType } from "./Permissions";

export function usePermission(
    role: UserRole
) {

    return {

        has: (permission: PermissionType) =>
            has(role, permission),

    };

}