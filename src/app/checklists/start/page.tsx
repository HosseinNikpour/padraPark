import Link from "next/link";
import { ChecklistType } from "@prisma/client";

import { currentUser } from "@/core/auth/currentUser";

import { ChecklistService } from "@/modules/checklist/services/ChecklistService";

const service = new ChecklistService();

export default async function Page() {

    const user = await currentUser();

    const groups = await service.getGroups();

    const completed = await service.getTodayCompletedGroups(
        user.id,
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