import { currentUser } from "@/core/auth/currentUser";

//import { ForbiddenException } from "@/core/exceptions/ForbiddenException";

import type { PermissionType } from "./Permissions";
import { has } from "./has";

export async function can(

    permission: PermissionType

): Promise<void> {

    const user = await currentUser();

    if (!has(user.role, permission)) {

        throw new Error("Forbidden");

    }

}