import { auth } from "@/modules/auth/lib/auth";
import type { User } from "@prisma/client";

export type CurrentUser = Pick<
    User,
    "id" |
    "username" |
    "fullName" |
    "role" |
    "branchId"
>;

export async function currentUser(): Promise<CurrentUser> {

    const session = await auth();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    return {
        id: Number((session.user as any).id),
        username: (session.user as any).username,
        fullName: (session.user as any).fullName,
        role: (session.user as any).role,
        branchId: (session.user as any).branchId ?? null,
    };

}