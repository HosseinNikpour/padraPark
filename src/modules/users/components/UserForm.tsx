"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UserRole } from "@prisma/client";
import { createUser } from "../actions";

type Branch = {
    id: number;
    name: string;
};

type Props = {
    branches: Branch[];
};

const roleTitles: Record<UserRole, string> = {
    ADMIN: "مدیر سیستم",
    MANAGER: "مدیر",
    OPERATOR: "اپراتور",
    CAFE: "کافه",
    RECEPTION: "رسپشن",
};

export default function UserForm({
    branches,
}: Props) {

    const router = useRouter();

    const [fullName, setFullName] =
        useState("");

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [role, setRole] =
        useState<UserRole>(
            UserRole.RECEPTION
        );

    const [branchId, setBranchId] =
        useState<string>("");

    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        if (!fullName.trim()) {
            alert(
                "نام و نام خانوادگی را وارد کنید."
            );
            return;
        }

        if (!username.trim()) {
            alert(
                "نام کاربری را وارد کنید."
            );
            return;
        }

        if (!password) {
            alert(
                "رمز عبور را وارد کنید."
            );
            return;
        }

        if (password.length < 6) {
            alert(
                "رمز عبور باید حداقل ۶ کاراکتر باشد."
            );
            return;
        }

        try {

            setLoading(true);

            await createUser({
                fullName,
                username,
                password,
                role,
                branchId:
                    branchId
                        ? Number(branchId)
                        : null,
            });

            alert(
                "کاربر با موفقیت ایجاد شد."
            );

            router.push("/users");

            router.refresh();

        } catch (error) {

            console.error(error);

            alert(
                error instanceof Error
                    ? error.message
                    : "خطا در ایجاد کاربر"
            );

        } finally {

            setLoading(false);

        }
    }

    return (

        <form
            onSubmit={handleSubmit}
            className="max-w-2xl space-y-6 rounded-xl border bg-white p-6"
        >

            {/* Full Name */}

            <div>

                <label className="mb-2 block text-sm font-medium">
                    نام و نام خانوادگی
                </label>

                <input
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                        setFullName(e.target.value)
                    }
                    placeholder="مثلاً حسین نیکپور"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />

            </div>

            {/* Username */}

            <div>

                <label className="mb-2 block text-sm font-medium">
                    نام کاربری
                </label>

                <input
                    type="text"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    placeholder="مثلاً hossein"
                    dir="ltr"
                    className="w-full rounded-lg border px-4 py-3 text-left outline-none focus:border-blue-500"
                />

            </div>

            {/* Password */}

            <div>

                <label className="mb-2 block text-sm font-medium">
                    رمز عبور
                </label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    placeholder="حداقل ۶ کاراکتر"
                    dir="ltr"
                    className="w-full rounded-lg border px-4 py-3 text-left outline-none focus:border-blue-500"
                />

            </div>

            {/* Role */}

            <div>

                <label className="mb-2 block text-sm font-medium">
                    نقش
                </label>

                <select
                    value={role}
                    onChange={(e) =>
                        setRole(
                            e.target.value as UserRole
                        )
                    }
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                >

                    {Object.values(UserRole).map(
                        (item) => (

                            <option
                                key={item}
                                value={item}
                            >
                                {roleTitles[item]}
                            </option>

                        )
                    )}

                </select>

            </div>

            {/* Branch */}

            <div>

                <label className="mb-2 block text-sm font-medium">
                    شعبه
                </label>

                <select
                    value={branchId}
                    onChange={(e) =>
                        setBranchId(
                            e.target.value
                        )
                    }
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                >

                    <option value="">
                        بدون شعبه
                    </option>

                    {branches.map(
                        (branch) => (

                            <option
                                key={branch.id}
                                value={branch.id}
                            >
                                {branch.name}
                            </option>

                        )
                    )}

                </select>

            </div>

            {/* Actions */}

            <div className="flex justify-end gap-3">

                <button
                    type="button"
                    onClick={() =>
                        router.push("/users")
                    }
                    className="rounded-lg border px-6 py-3 hover:bg-gray-50"
                >
                    انصراف
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading
                        ? "در حال ایجاد..."
                        : "ایجاد کاربر"}
                </button>

            </div>

        </form>
    );
}