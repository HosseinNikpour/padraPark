import Link from "next/link";

import { requireAdmin } from "@/core/auth/requireAdmin";
import { prisma } from "@/lib/prisma";

import UserForm from "@/modules/users/components/UserForm";

export default async function CreateUserPage() {

    await requireAdmin();

    const branches =
        await prisma.branch.findMany({
            where: {
                // فعلاً همه شعب
            },
            orderBy: {
                name: "asc",
            },
            select: {
                id: true,
                name: true,
            },
        });

    return (
        <div className="space-y-6 p-6">

            <div className="flex items-center gap-4">

                <Link
                    href="/users"
                    className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                >
                    بازگشت
                </Link>

                <div>
                    <h1 className="text-3xl font-bold">
                        ایجاد کاربر
                    </h1>

                    <p className="mt-2 text-gray-500">
                        ایجاد کاربر جدید برای استفاده از سیستم
                    </p>
                </div>

            </div>

            <UserForm
                branches={branches}
            />

        </div>
    );
}