import Link from "next/link";

import { requireAdmin } from "@/core/auth/requireAdmin";
import { getUsers } from "@/modules/users/actions";

import UsersTable from "@/modules/users/components/UsersTable";

export default async function UsersPage() {

    await requireAdmin();

    const users = await getUsers();

    return (
        <div className="space-y-6 p-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        مدیریت کاربران
                    </h1>

                    <p className="mt-2 text-gray-500">
                        ایجاد و مدیریت کاربران سیستم
                    </p>

                </div>

                <Link
                    href="/users/new"
                    className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    ایجاد کاربر
                </Link>

            </div>

            <UsersTable
                users={users}
            />

        </div>
    );
}