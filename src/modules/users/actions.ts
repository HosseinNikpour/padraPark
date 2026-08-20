"use server";

import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/core/auth/requireAdmin";
import { requireUser } from "@/core/auth/requireUser";
/* =========================================================
   Types
========================================================= */

type CreateUserInput = {
    username: string;
    password: string;
    fullName: string;
    role: UserRole;
    branchId?: number | null;
};

type ChangePasswordInput = {
    userId: number;
    currentPassword: string;
    newPassword: string;
};

type ResetPasswordInput = {
    userId: number;
    newPassword: string;
};

type UpdateUserInput = {
    userId: number;
    username: string;
    fullName: string;
    role: UserRole;
    branchId?: number | null;
};

/* =========================================================
   Create User
========================================================= */

export async function createUser(
    input: CreateUserInput
) {
 await requireAdmin();
    const username =
        input.username.trim();

    const fullName =
        input.fullName.trim();

    const password =
        input.password.trim();

    if (!username) {
        throw new Error("نام کاربری الزامی است.");
    }

    if (!fullName) {
        throw new Error("نام و نام خانوادگی الزامی است.");
    }

    if (!password) {
        throw new Error("رمز عبور الزامی است.");
    }

    if (password.length < 6) {
        throw new Error(
            "رمز عبور باید حداقل ۶ کاراکتر باشد."
        );
    }

    /* بررسی تکراری نبودن username */

    const existingUser =
        await prisma.user.findUnique({
            where: {
                username,
            },
        });

    if (existingUser) {
        throw new Error(
            "این نام کاربری قبلاً استفاده شده است."
        );
    }

    /* Hash password */

    const passwordHash =
        await bcrypt.hash(
            password,
            12
        );

    /* Create */

    const user =
        await prisma.user.create({
            data: {
                username,
                passwordHash,
                fullName,
                role: input.role,
                branchId:
                    input.branchId ?? null,
            },

            select: {
                id: true,
                username: true,
                fullName: true,
                role: true,
                branchId: true,
                isActive: true,
            },
        });

    revalidatePath("/users");

    return user;
}

/* =========================================================
   Change Own Password
========================================================= */

export async function changePassword(
    input: ChangePasswordInput
) {

      const currentUser = await requireUser();

    // به جای input.userId
    const userId = currentUser.id;

    const currentPassword =
        input.currentPassword.trim();

    const newPassword =
        input.newPassword.trim();

    if (!currentPassword) {
        throw new Error(
            "رمز عبور فعلی را وارد کنید."
        );
    }

    if (!newPassword) {
        throw new Error(
            "رمز عبور جدید را وارد کنید."
        );
    }

    if (newPassword.length < 6) {
        throw new Error(
            "رمز عبور جدید باید حداقل ۶ کاراکتر باشد."
        );
    }

    if (
        currentPassword === newPassword
    ) {
        throw new Error(
            "رمز عبور جدید نباید با رمز قبلی یکسان باشد."
        );
    }

    const user =
        await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

    if (!user) {
        throw new Error(
            "کاربر پیدا نشد."
        );
    }

    const valid =
        await bcrypt.compare(
            currentPassword,
            user.passwordHash
        );

    if (!valid) {
        throw new Error(
            "رمز عبور فعلی اشتباه است."
        );
    }

    const passwordHash =
        await bcrypt.hash(
            newPassword,
            12
        );

    await prisma.user.update({
        where: {
            id: userId,
        },

        data: {
            passwordHash,
        },
    });

    revalidatePath("/profile/password");

    return {
        success: true,
    };
}

/* =========================================================
   Reset Password By Admin
========================================================= */

export async function resetUserPassword(
    input: ResetPasswordInput
) {
 await requireAdmin();
    const newPassword =
        input.newPassword.trim();

    if (!newPassword) {
        throw new Error(
            "رمز عبور جدید را وارد کنید."
        );
    }

    if (newPassword.length < 6) {
        throw new Error(
            "رمز عبور باید حداقل ۶ کاراکتر باشد."
        );
    }

    const user =
        await prisma.user.findUnique({
            where: {
                id: input.userId,
            },
        });

    if (!user) {
        throw new Error(
            "کاربر پیدا نشد."
        );
    }

    const passwordHash =
        await bcrypt.hash(
            newPassword,
            12
        );

    await prisma.user.update({
        where: {
            id: input.userId,
        },

        data: {
            passwordHash,
        },
    });

    revalidatePath("/users");

    return {
        success: true,
    };
}

/* =========================================================
   Get Users
========================================================= */

export async function getUsers() {
 await requireAdmin();
    return prisma.user.findMany({

        orderBy: {
            id: "desc",
        },

        select: {
            id: true,
            username: true,
            fullName: true,
            role: true,
            isActive: true,
            branchId: true,

            branch: {
                select: {
                    id: true,
                    name: true,
                },
            },

            createdAt: true,
            updatedAt: true,
        },
    });
}

/* =========================================================
   Get User
========================================================= */

export async function getUser(
    userId: number
) {
 await requireAdmin();
    return prisma.user.findUnique({

        where: {
            id: userId,
        },

        select: {
            id: true,
            username: true,
            fullName: true,
            role: true,
            isActive: true,
            branchId: true,
        },
    });
}

/* =========================================================
   Update User
========================================================= */

export async function updateUser(
    input: UpdateUserInput
) {
 await requireAdmin();
    const username =
        input.username.trim();

    const fullName =
        input.fullName.trim();

    if (!username) {
        throw new Error(
            "نام کاربری الزامی است."
        );
    }

    if (!fullName) {
        throw new Error(
            "نام و نام خانوادگی الزامی است."
        );
    }

    /* بررسی username تکراری */

    const existingUser =
        await prisma.user.findFirst({

            where: {
                username,

                NOT: {
                    id: input.userId,
                },
            },
        });

    if (existingUser) {
        throw new Error(
            "این نام کاربری قبلاً استفاده شده است."
        );
    }

    const user =
        await prisma.user.update({

            where: {
                id: input.userId,
            },

            data: {
                username,
                fullName,
                role: input.role,
                branchId:
                    input.branchId ?? null,
            },

            select: {
                id: true,
                username: true,
                fullName: true,
                role: true,
                branchId: true,
                isActive: true,
            },
        });

    revalidatePath("/users");

    return user;
}

/* =========================================================
   Toggle Active
========================================================= */

export async function toggleUserActive(
    userId: number
) {
 await requireAdmin();
    const user =
        await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

    if (!user) {
        throw new Error(
            "کاربر پیدا نشد."
        );
    }

    const updatedUser =
        await prisma.user.update({

            where: {
                id: userId,
            },

            data: {
                isActive:
                    !user.isActive,
            },

            select: {
                id: true,
                username: true,
                fullName: true,
                role: true,
                isActive: true,
            },
        });

    revalidatePath("/users");

    return updatedUser;
}