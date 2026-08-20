"use client";

import { useState } from "react";

import {    toggleUserActive,    resetUserPassword,} from "../actions";

type User = {
    id: number;
    username: string;
    fullName: string;
    role: string;
    isActive: boolean;
    branchId: number | null;

    branch: {
        id: number;
        name: string;
    } | null;

    createdAt: Date;
    updatedAt: Date;
};

type Props = {
    users: User[];
};

const roleTitles: Record<string, string> = {
    ADMIN: "مدیر سیستم",
    MANAGER: "مدیر",
    OPERATOR: "اپراتور",
    CAFE: "کافه",
    RECEPTION: "رسپشن",
};

export default function UsersTable({
    users,
}: Props) {

    const [loadingId, setLoadingId] =
        useState<number | null>(null);

    async function handleToggle(
        userId: number
    ) {

        try {

            setLoadingId(userId);

            await toggleUserActive(userId);

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert(
                error instanceof Error
                    ? error.message
                    : "خطا در تغییر وضعیت کاربر"
            );

        } finally {

            setLoadingId(null);

        }
    }

    async function handleResetPassword(
        userId: number
    ) {

        const password =
            window.prompt(
                "رمز عبور جدید را وارد کنید:"
            );

        if (!password) {
            return;
        }

        if (password.length < 6) {

            alert(
                "رمز عبور باید حداقل ۶ کاراکتر باشد."
            );

            return;
        }

        try {

            setLoadingId(userId);

            await resetUserPassword({
                userId,
                newPassword: password,
            });

            alert(
                "رمز عبور با موفقیت تغییر کرد."
            );

        } catch (error) {

            console.error(error);

            alert(
                error instanceof Error
                    ? error.message
                    : "خطا در تغییر رمز عبور"
            );

        } finally {

            setLoadingId(null);

        }
    }

    return (

        <div className="overflow-hidden rounded-xl border bg-white">

            <table className="w-full text-right">

                <thead className="bg-gray-50">

                    <tr>

                        <th className="px-4 py-3">
                            نام کاربری
                        </th>

                        <th className="px-4 py-3">
                            نام
                        </th>

                        <th className="px-4 py-3">
                            نقش
                        </th>

                        <th className="px-4 py-3">
                            شعبه
                        </th>

                        <th className="px-4 py-3">
                            وضعیت
                        </th>

                        <th className="px-4 py-3">
                            عملیات
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr
                            key={user.id}
                            className="border-t"
                        >

                            <td className="px-4 py-4 font-medium">
                                {user.username}
                            </td>

                            <td className="px-4 py-4">
                                {user.fullName}
                            </td>

                            <td className="px-4 py-4">
                                {roleTitles[user.role] ??
                                    user.role}
                            </td>

                            <td className="px-4 py-4">
                                {user.branch?.name ?? "-"}
                            </td>

                            <td className="px-4 py-4">

                                {user.isActive ? (
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                        فعال
                                    </span>
                                ) : (
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                                        غیرفعال
                                    </span>
                                )}

                            </td>

                            <td className="px-4 py-4">

                                <div className="flex gap-2">

                                    <button
                                        type="button"
                                        disabled={
                                            loadingId === user.id
                                        }
                                        onClick={() =>
                                            handleToggle(
                                                user.id
                                            )
                                        }
                                        className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                                    >
                                        {user.isActive
                                            ? "غیرفعال"
                                            : "فعال"}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={
                                            loadingId === user.id
                                        }
                                        onClick={() =>
                                            handleResetPassword(
                                                user.id
                                            )
                                        }
                                        className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                                    >
                                        ریست پسورد
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {users.length === 0 && (

                <div className="p-8 text-center text-gray-500">
                    هنوز کاربری ثبت نشده است.
                </div>

            )}

        </div>
    );
}