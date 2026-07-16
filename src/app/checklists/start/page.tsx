import Link from "next/link";
import { ChecklistType } from "@prisma/client";

import { ChecklistService } from "@/modules/checklist/services/ChecklistService";
import { auth } from "@/modules/auth/lib/auth";

const service = new ChecklistService();

export default async function Page() {

    const session = await auth();

    if (!session?.user) {
        return null;
    }

    const userId = Number((session.user as any).id);

    const groups = await service.getGroups();

    const completed = await service.getTodayCompletedGroups(
        userId,
        ChecklistType.START
    );

   const completedIds = completed.map(x => x.groupId);

    return (

        <div className="max-w-4xl mx-auto p-8">

            <h1 className="text-2xl font-bold mb-6">

                چک لیست ابتدای شیفت

            </h1>

            <div className="grid gap-4">

                {

                    groups.map(group => {

                        const done = completedIds.includes(group.id);

                        return (

                            <Link
                                key={group.id}
                                href={`/checklists/start/${group.id}`}
                                className={`border rounded-xl p-5 flex justify-between items-center transition
                                    ${
                                        done
                                            ? "bg-green-100 border-green-500"
                                            : "hover:bg-gray-50"
                                    }`}
                            >

                                <span className="font-medium">

                                    {group.title}

                                </span>

                                {

                                    done
                                        ? (
                                            <span className="text-green-700 font-bold">

                                                ✔ ثبت شده

                                            </span>
                                        )
                                        : (
                                            <span className="text-gray-500">

                                                انجام نشده

                                            </span>
                                        )

                                }

                            </Link>

                        );

                    })

                }

            </div>

        </div>

    );

}