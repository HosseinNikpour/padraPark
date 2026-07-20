import { requireUser } from "@/core/auth/requireUser";

import { RoleDashboardResolver } from "@/modules/dashboard/resolver/RoleDashboardResolver";

export default async function DashboardPage() {

    const user = await requireUser();

    return RoleDashboardResolver(user);

}