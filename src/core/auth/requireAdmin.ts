import { UserRole } from "@prisma/client";

import { requireUser } from "./requireUser";

export async function requireAdmin() {

    const user = await requireUser();

    if (user.role !== UserRole.ADMIN) {
        throw new Error(
            "دسترسی غیرمجاز"
        );
    }

    return user;
}